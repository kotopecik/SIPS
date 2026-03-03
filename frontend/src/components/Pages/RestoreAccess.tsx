import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./RestoreAccessPage.module.scss";
import { BackArrow } from "@/components/BackArrow/BackArrow";

type Step = "email" | "code" | "reset" | "done";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function useQueryEmail() {
  const { search } = useLocation();
  return useMemo(() => {
    const params = new URLSearchParams(search);
    return (params.get("email") || "").trim();
  }, [search]);
}

export default function RestoreAccess() {
  const navigate = useNavigate();
  const queryEmail = useQueryEmail();

  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // email
  const [email, setEmail] = useState(queryEmail); // если пришёл из /restore?email=...
  const emailLocked = !!queryEmail; // если true — почту не просим вводить

  // code
  const CODE_LEN = 6;
  const [code, setCode] = useState<string[]>(Array(CODE_LEN).fill(""));
  const codeRefs = useRef<Array<HTMLInputElement | null>>([]);
  const codeValue = useMemo(() => code.join(""), [code]);

  // resend timer
  const RESEND_SECONDS = 30;
  const [resendLeft, setResendLeft] = useState(0);

  // reset
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [pass1Touched, setPass1Touched] = useState(false);
  const [pass2Touched, setPass2Touched] = useState(false);

  const goBack = () => {
    if (step === "email") return navigate(-1);
    if (step === "code") return setStep("email");
    if (step === "reset") return setStep("code");
    if (step === "done") return navigate("/authorization");
  };

  const startResendTimer = () => {
    setResendLeft(RESEND_SECONDS);
  };

  // таймер уменьшается раз в секунду
  useEffect(() => {
    if (step !== "code") return;
    if (resendLeft <= 0) return;

    const id = window.setInterval(() => {
      setResendLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [step, resendLeft]);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const emailToUse = (email || "").trim();

    if (!emailToUse) {
      setErr("Введите email");
      return;
    }
    if (!isValidEmail(emailToUse)) {
      setErr("Введите корректный email");
      return;
    }

    setIsLoading(true);

    // Заглушка: "код отправлен"
    setTimeout(() => {
      setIsLoading(false);
      setEmail(emailToUse);
      setStep("code");
      setCode(Array(CODE_LEN).fill(""));
      startResendTimer();
      setTimeout(() => codeRefs.current[0]?.focus(), 0);
    }, 450);
  };

  const resendCode = async () => {
    setErr(null);
    if (resendLeft > 0) return;

    setIsLoading(true);

    // Заглушка: "код переотправлен"
    setTimeout(() => {
      setIsLoading(false);
      setCode(Array(CODE_LEN).fill(""));
      startResendTimer();
      setTimeout(() => codeRefs.current[0]?.focus(), 0);
    }, 450);
  };

  const onCodeChange = (idx: number, v: string) => {
    setErr(null);

    const digit = v.replace(/\D/g, "").slice(-1);

    setCode((prev) => {
      const next = [...prev];
      next[idx] = digit;
      return next;
    });

    if (digit && idx < CODE_LEN - 1) {
      codeRefs.current[idx + 1]?.focus();
    }
  };

  const onCodeKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (code[idx]) {
        setCode((prev) => {
          const next = [...prev];
          next[idx] = "";
          return next;
        });
      } else if (idx > 0) {
        codeRefs.current[idx - 1]?.focus();
        setCode((prev) => {
          const next = [...prev];
          next[idx - 1] = "";
          return next;
        });
      }
    }
  };

  const onCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LEN);
    if (!txt) return;

    e.preventDefault();

    const next = txt.split("");
    while (next.length < CODE_LEN) next.push("");

    setCode(next);
    const lastIndex = Math.min(txt.length, CODE_LEN) - 1;
    setTimeout(() => codeRefs.current[lastIndex]?.focus(), 0);
  };

  // авто переход на reset после ввода 6 цифр
  useEffect(() => {
    if (step !== "code") return;
    const filled = code.every((x) => x !== "");
    if (filled) {
      setTimeout(() => setStep("reset"), 200);
    }
  }, [step, code]);

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const p1 = pass1.trim();
    const p2 = pass2.trim();

    // подсказка появляется только если пользователь реально что-то вводил (и меньше 8)
    if (p1.length > 0 && p1.length < 8) {
      setErr("Пароль должен быть не короче 8 символов");
      return;
    }
    if (p1.length === 0) {
      setErr("Введите новый пароль");
      return;
    }
    if (p1 !== p2) {
      setErr("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    // Заглушка: "пароль изменён"
    setTimeout(() => {
      setIsLoading(false);
      setStep("done");
      setTimeout(() => navigate("/authorization"), 600);
    }, 550);
  };

  const resendText =
    resendLeft > 0 ? `Отправить код повторно через 00:${String(resendLeft).padStart(2, "0")}` : "Отправить код повторно";

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <button
          type="button"
          onClick={goBack}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <BackArrow />
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.tabs}>
          <Link className={styles.tab} to="/authorization">
            Авторизация
          </Link>
          <Link className={styles.tab} to="/registration">
            Регистрация
          </Link>
        </div>

        {step === "email" && (
          <>
            <h1 className={styles.title}>Проверьте почту</h1>
            <p className={styles.subtitle}>
              Мы отправим вам на почту код для подтверждения учетной записи
            </p>

            <form onSubmit={sendCode} className={styles.form}>
              {!emailLocked && (
                <label className={styles.label}>
                  Email
                  <input
                    className={styles.input}
                    placeholder="example@mail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </label>
              )}

              {emailLocked && (
                <div className={styles.infoLine}>
                  Код будет отправлен на: <b>{email}</b>
                </div>
              )}

              {err && <div className={styles.error}>{err}</div>}

              <button
                type="submit"
                className={styles.primaryBtnWide}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Отправляем..." : "Выслать код"}
              </button>
            </form>
          </>
        )}

        {step === "code" && (
          <>
            <h1 className={styles.title}>Проверьте почту</h1>
            <p className={styles.subtitle}>
              Мы отправили вам на почту код для подтверждения вашей учетной записи
            </p>

            <div className={styles.codeRow}>
              {code.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => (codeRefs.current[idx] = el)}
                  className={styles.codeBox}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={val}
                  onChange={(e) => onCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => onCodeKeyDown(idx, e)}
                  onPaste={onCodePaste}
                />
              ))}
            </div>

            {err && <div className={styles.error}>{err}</div>}

            <button
              type="button"
              className={styles.primaryBtnWide}
              onClick={resendCode}
              disabled={isLoading || resendLeft > 0}
              aria-busy={isLoading}
              title={resendLeft > 0 ? "Подождите перед повторной отправкой" : ""}
            >
              {isLoading ? "Отправляем..." : resendText}
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <h1 className={styles.title}>Восстановление пароля</h1>
            <p className={styles.subtitle}>
              Для завершения смены пароля введите новую комбинацию, которая будет использоваться для входа в ваш аккаунт
            </p>

            <form onSubmit={resetPassword} className={styles.form}>
              <label className={styles.label}>
                Введите новый пароль
                <div className={styles.passRow}>
                  <input
                    className={styles.inputWide}
                    type={show1 ? "text" : "password"}
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    onBlur={() => setPass1Touched(true)}
                    autoFocus
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShow1((v) => !v)}
                    aria-label="Показать пароль"
                  >
                    👁
                  </button>
                </div>

                {/* подсказка только если пользователь реально вводил и ввёл мало */}
                {pass1Touched && pass1.length > 0 && pass1.length < 8 && (
                  <div className={styles.hint}>Минимум 8 символов</div>
                )}
              </label>

              <label className={styles.label}>
                Повторите новый пароль
                <div className={styles.passRow}>
                  <input
                    className={styles.inputWide}
                    type={show2 ? "text" : "password"}
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    onBlur={() => setPass2Touched(true)}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShow2((v) => !v)}
                    aria-label="Показать пароль"
                  >
                    👁
                  </button>
                </div>

                {pass2Touched && pass2.length > 0 && pass1.trim() !== pass2.trim() && (
                  <div className={styles.hint}>Пароли должны совпадать</div>
                )}
              </label>

              {err && <div className={styles.error}>{err}</div>}

              <button
                type="submit"
                className={styles.primaryBtnWide}
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Сохраняем..." : "Изменить пароль"}
              </button>
            </form>
          </>
        )}

        {step === "done" && (
          <>
            <h1 className={styles.title}>Готово</h1>
            <p className={styles.subtitle}>
              Пароль успешно изменён. Сейчас мы вернем вас на страницу входа.
            </p>

            <button
              type="button"
              className={styles.primaryBtnWide}
              onClick={() => navigate("/authorization")}
            >
              Перейти ко входу
            </button>
          </>
        )}
      </div>
    </div>
  );
}
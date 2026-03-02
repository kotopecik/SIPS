import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RestoreAccessPage.module.scss";
import { BackArrow } from "@/components/BackArrow/BackArrow";
import api from "@/http";

type Step = 1 | 2;

export default function RestoreAccess() {
  const [step, setStep] = useState<Step>(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const navigate = useNavigate();

  // 1) отправка кода на email
  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!email) {
      setErr("Введи email");
      return;
    }

    try {
      // ⚠️ ВАЖНО: эндпоинт может отличаться
      // Если бэк у вас другой — скажи, я подставлю правильный URL
      await api.post("/vAUTH/password/reset/request", { email });

      setOk("Код отправлен на почту");
      setStep(2);
    } catch {
      setErr("Не удалось отправить код. Проверь email.");
    }
  };

  // 2) подтверждение кода и смена пароля
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!code || code.length !== 6) {
      setErr("Введи 6-значный код");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErr("Пароль должен быть минимум 6 символов");
      return;
    }

    try {
      // ⚠️ ВАЖНО: эндпоинт может отличаться
      await api.post("/vAUTH/password/reset/confirm", {
        email,
        code,
        new_password: newPassword,
      });

      setOk("Пароль изменён. Теперь войдите.");
      setTimeout(() => navigate("/authorization"), 700);
    } catch {
      setErr("Не удалось изменить пароль. Проверь код.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.back}>
        <BackArrow />
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

        <h1 className={styles.title}>Восстановление доступа</h1>
        <p className={styles.subtitle}>
          {step === 1
            ? "Введите email — мы отправим код на почту"
            : "Введите код и новый пароль"}
        </p>

        {step === 1 ? (
          <form onSubmit={sendCode} className={styles.form}>
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                placeholder="example@mail.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </label>

            {err && <div className={styles.error}>{err}</div>}
            {ok && <div className={styles.ok}>{ok}</div>}

            <button type="submit" className={styles.primaryBtn}>
              Отправить код
            </button>

            <div className={styles.links}>
              <span>Вспомнили пароль?</span>
              <Link to="/authorization">Войти</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={resetPassword} className={styles.form}>
            <label className={styles.label}>
              Код из письма (6 цифр)
              <input
                className={styles.input}
                placeholder="123456"
                value={code}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </label>

            <label className={styles.label}>
              Новый пароль
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              />
            </label>

            {err && <div className={styles.error}>{err}</div>}
            {ok && <div className={styles.ok}>{ok}</div>}

            <button type="submit" className={styles.primaryBtn}>
              Изменить пароль
            </button>

            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setStep(1)}
            >
              Назад
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
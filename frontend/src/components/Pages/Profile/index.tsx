import { useEffect, useMemo, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logoutUser } from "@/store/user/user-actions";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutModal } from "@/components/ConfirmLogoutModal/ConfirmLogoutModal";

type Tab = "profile" | "downloads";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((s) => s.user.user);
  const email = useMemo(() => user?.email || "—", [user?.email]);

  const [tab, setTab] = useState<Tab>("profile");

  // фото — заглушка (локально в UI)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // модалка выхода
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fullName = useMemo(() => {
    const ln = user?.last_name?.trim();
    const fn = user?.first_name?.trim();
    const mn = user?.middle_name?.trim();
    const parts = [ln, fn, mn].filter(Boolean);
    return parts.length ? parts.join(" ") : "Фамилия Имя";
  }, [user?.last_name, user?.first_name, user?.middle_name]);

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    e.target.value = "";
  };

  const onDeletePhoto = () => setPhotoUrl(null);

  const onLogout = async () => {
    await dispatch(logoutUser());
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <h1 className={styles.pageTitle}>Личный кабинет</h1>

        <button
          type="button"
          className={styles.exitBtn}
          onClick={() => setConfirmOpen(true)}
        >
          Выход
        </button>
      </div>

      <div className={styles.layout}>
        {/* ЛЕВАЯ КАРТОЧКА */}
        <div className={styles.leftCard}>
          <div className={styles.avatarRow}>
            <div className={styles.avatar}>
              {photoUrl ? (
                <img className={styles.avatarImg} src={photoUrl} alt="avatar" />
              ) : (
                <div className={styles.avatarEmpty}>Фото</div>
              )}
            </div>

            <div className={styles.avatarBtns}>
              <label className={styles.btnBlue}>
                Добавить фото
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickPhoto}
                  style={{ display: "none" }}
                />
              </label>

              <button
                className={styles.btnWhite}
                onClick={onDeletePhoto}
                type="button"
                disabled={!photoUrl}
              >
                Удалить фото
              </button>
            </div>
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userName}>{fullName}</div>

            <div className={styles.meta}>
              <div className={styles.metaRow}>
                <span>Email</span>
                <b>{email}</b>
              </div>

              <div className={styles.metaRow}>
                <span>Организация</span>
                <b>{user?.organization || "—"}</b>
              </div>
            </div>

            {/* вариант выхода №1 как в макете (в меню) */}
            
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className={styles.right}>
          <div className={styles.tabs}>
            <button
              className={tab === "profile" ? styles.tabActive : styles.tab}
              onClick={() => setTab("profile")}
              type="button"
            >
              Личный кабинет
            </button>

            <button
              className={tab === "downloads" ? styles.tabActive : styles.tab}
              onClick={() => setTab("downloads")}
              type="button"
            >
              История скачиваний
            </button>
          </div>

          <div className={styles.panel}>
            {tab === "profile" ? (
              <ProfileForm />
            ) : (
              <DownloadsHistory />
            )}
          </div>
        </div>
      </div>

      <ConfirmLogoutModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onLogout}
      />
    </div>
  );
}

function ProfileForm() {
  const user = useAppSelector((s) => s.user.user);

  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    last_name: user?.last_name || "",
    first_name: user?.first_name || "",
    middle_name: user?.middle_name || "",
    organization: user?.organization || "",
    email: user?.email || "",
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  // подсказки показываем не сразу, а после попытки сохранить
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    setForm((p) => ({
      ...p,
      last_name: user?.last_name || "",
      first_name: user?.first_name || "",
      middle_name: user?.middle_name || "",
      organization: user?.organization || "",
      email: user?.email || "",
    }));
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const passwordHint =
    submitAttempted &&
    form.new_password.trim().length > 0 &&
    form.new_password.trim().length < 8
      ? "Минимум 8 символов"
      : null;

  const password2Hint =
    submitAttempted &&
    form.new_password2.trim().length > 0 &&
    form.new_password.trim() !== form.new_password2.trim()
      ? "Пароли должны совпадать"
      : null;

  const onSave = () => {
    setSubmitAttempted(true);

    // заглушка: если пароль начали менять — проверим минимально красиво
    if (form.new_password.trim().length > 0) {
      if (form.new_password.trim().length < 8) return;
      if (form.new_password.trim() !== form.new_password2.trim()) return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className={styles.form}>
      <div className={styles.sectionTitle}>Данные пользователя</div>

      <div className={styles.grid2}>
        <Field label="Фамилия" name="last_name" value={form.last_name} onChange={onChange} saved={saved} />
        <Field label="Имя" name="first_name" value={form.first_name} onChange={onChange} saved={saved} />
        <Field label="Отчество" name="middle_name" value={form.middle_name} onChange={onChange} saved={saved} />
        <Field label="Организация" name="organization" value={form.organization} onChange={onChange} saved={saved} />
        <Field label="Email" name="email" value={form.email} onChange={onChange} saved={saved} type="email" />
      </div>

      <div className={styles.divider} />

      <div className={styles.sectionTitle}>Смена пароля</div>

      <div className={styles.grid1}>
        <Field label="Старый пароль" name="old_password" value={form.old_password} onChange={onChange} saved={saved} type="password" />
        <FieldWithHint
          label="Новый пароль"
          name="new_password"
          value={form.new_password}
          onChange={onChange}
          saved={saved}
          type="password"
          hint={passwordHint}
        />
        <FieldWithHint
          label="Повторите новый пароль"
          name="new_password2"
          value={form.new_password2}
          onChange={onChange}
          saved={saved}
          type="password"
          hint={password2Hint}
        />
      </div>

      <button type="button" className={styles.saveBtn} onClick={onSave}>
        Сохранить изменения
      </button>

      {saved && <div className={styles.savedToast}>Сохранено</div>}
    </div>
  );
}

function DownloadsHistory() {
  const rows = [
    { date: "14.04.25", time: "06:07:00", satellite: "Suomi NPP", composite: "vlst" },
    { date: "14.04.25", time: "06:07:00", satellite: "Suomi NPP", composite: "aot550" },
    { date: "15.04.25", time: "05:58:00", satellite: "NOAA-20", composite: "vindvi" },
  ];

  return (
    <div className={styles.history}>
      <div className={styles.sectionTitle}>История скачиваний</div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Спутник</th>
              <th>Композит</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.satellite}</td>
                <td>
                  <span className={styles.badge}>{r.composite}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.historyBtns}>
        <button type="button" className={styles.btnBlueWide}>
          Скачать всё
        </button>
        <button type="button" className={styles.btnWhiteWide}>
          Очистить
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  saved,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saved: boolean;
  type?: string;
}) {
  return (
    <label className={styles.field}>
      <div className={styles.label}>{label}</div>
      <input
        className={`${styles.input} ${saved ? styles.inputSaved : ""}`}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </label>
  );
}

function FieldWithHint(props: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saved: boolean;
  type?: string;
  hint: string | null;
}) {
  const { label, name, value, onChange, saved, type = "text", hint } = props;

  return (
    <label className={styles.field}>
      <div className={styles.label}>{label}</div>
      <input
        className={`${styles.input} ${saved ? styles.inputSaved : ""}`}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
      {hint && <div className={styles.hint}>{hint}</div>}
    </label>
  );
}
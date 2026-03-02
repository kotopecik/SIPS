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
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPhotoUrl(url);

    // чтобы можно было выбрать тот же файл снова
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
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Личный кабинет</h1>
        <button className={styles.exitBtn} onClick={() => setConfirmOpen(true)}>
          Выход
        </button>
      </div>

      <div className={styles.layout}>
        {/* Левая карточка */}
        <div className={styles.card}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>
              {photoUrl ? (
                <img className={styles.avatarImg} src={photoUrl} alt="avatar" />
              ) : (
                <div className={styles.avatarEmpty}>Фото</div>
              )}
            </div>

            <div className={styles.avatarBtns}>
              <label className={styles.blueBtn}>
                Добавить фото
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickPhoto}
                  style={{ display: "none" }}
                />
              </label>

              <button
                className={styles.whiteBtn}
                onClick={onDeletePhoto}
                type="button"
                disabled={!photoUrl}
              >
                Удалить фото
              </button>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.name}>
              {user?.last_name || "Фамилия"} {user?.first_name || "Имя"}{" "}
              {user?.middle_name || ""}
            </div>

            <div className={styles.meta}>
              <div>
                <span>Email:</span> {email}
              </div>
              <div>
                <span>Организация:</span> {user?.organization || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть */}
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
            {tab === "profile" ? <ProfileForm /> : <DownloadsHistory />}
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

  const onSave = () => {
    // пока без бэка — делаем “сохранено” через зелёную подсветку полей
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className={styles.form}>
      <div className={styles.formTitle}>Данные пользователя</div>

      <div className={styles.formGrid}>
        <Field label="Фамилия" name="last_name" value={form.last_name} onChange={onChange} saved={saved} />
        <Field label="Имя" name="first_name" value={form.first_name} onChange={onChange} saved={saved} />
        <Field label="Отчество" name="middle_name" value={form.middle_name} onChange={onChange} saved={saved} />
        <Field label="Организация" name="organization" value={form.organization} onChange={onChange} saved={saved} />
        <Field label="Email" name="email" value={form.email} onChange={onChange} saved={saved} />

        <div className={styles.divider} />

        <Field
          label="Старый пароль"
          name="old_password"
          value={form.old_password}
          onChange={onChange}
          saved={saved}
          type="password"
        />
        <Field
          label="Новый пароль"
          name="new_password"
          value={form.new_password}
          onChange={onChange}
          saved={saved}
          type="password"
        />
        <Field
          label="Повторите новый пароль"
          name="new_password2"
          value={form.new_password2}
          onChange={onChange}
          saved={saved}
          type="password"
        />
      </div>

      <button type="button" className={styles.saveBtn} onClick={onSave}>
        Сохранить изменения
      </button>
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
      <div className={styles.formTitle}>История скачиваний</div>

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
        <button type="button" className={styles.blueBtn2}>
          Скачать всё
        </button>
        <button type="button" className={styles.whiteBtn2}>
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
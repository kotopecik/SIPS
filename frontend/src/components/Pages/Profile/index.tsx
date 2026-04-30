import { useState, useEffect } from "react";
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

  const [tab, setTab] = useState<Tab>("profile");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Загружаем фото
  useEffect(() => {
    const saved = localStorage.getItem("userPhoto");
    if (saved) setPhotoUrl(saved);
  }, []);

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    localStorage.setItem("userPhoto", url);
    e.target.value = "";
  };

  const onDeletePhoto = () => {
    setPhotoUrl(null);
    localStorage.removeItem("userPhoto");
  };

  const onLogout = async () => {
    await dispatch(logoutUser());
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* Левая колонка — Аватар */}
        <div className={styles.left}>
          <div className={styles.avatarBig}>
            {photoUrl ? (
              <img src={photoUrl} alt="avatar" />
            ) : (
              <div className={styles.avatarPlaceholder}>👤</div>
            )}
          </div>

          <label className={styles.uploadBtn}>
            Загрузить фото
            <input type="file" accept="image/*" onChange={onPickPhoto} hidden />
          </label>

          <button 
            className={styles.deleteBtn} 
            onClick={onDeletePhoto} 
            disabled={!photoUrl}
          >
            удалить
          </button>
        </div>

        {/* Центральная часть */}
        <div className={styles.center}>
          <div className={styles.panel}>
            {tab === "profile" ? <ProfileForm user={user} /> : <DownloadsHistory />}
          </div>
        </div>

        {/* Боковое меню */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Личный кабинет</div>
          
          <div 
            className={tab === "profile" ? styles.sidebarItemActive : styles.sidebarItem}
            onClick={() => setTab("profile")}
          >
            Личный кабинет
          </div>
          
          <div 
            className={tab === "downloads" ? styles.sidebarItemActive : styles.sidebarItem}
            onClick={() => setTab("downloads")}
          >
            История скачиваний
          </div>
          
          <div 
            className={styles.sidebarItem}
            onClick={() => setConfirmOpen(true)}
          >
            Выход из аккаунта
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

/* ==================== Форма ==================== */
function ProfileForm({ user }: { user: any }) {
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
  const [saved, setSaved] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className={styles.form}>
      <div className={styles.section}>Данные пользователя</div>
      <div className={styles.grid}>
        <Field label="Фамилия" name="last_name" value={form.last_name} onChange={onChange} />
        <Field label="Имя" name="first_name" value={form.first_name} onChange={onChange} />
        <Field label="Отчество" name="middle_name" value={form.middle_name} onChange={onChange} />
        <Field label="Организация" name="organization" value={form.organization} onChange={onChange} />
        <Field label="Email" name="email" value={form.email} onChange={onChange} type="email" />
      </div>

      <div className={styles.section}>Смена пароля</div>
      <div className={styles.grid}>
        <Field label="Введите старый пароль" name="old_password" value={form.old_password} onChange={onChange} type="password" />
        <Field label="Введите новый пароль" name="new_password" value={form.new_password} onChange={onChange} type="password" />
        <Field label="Подтвердите новый пароль" name="new_password2" value={form.new_password2} onChange={onChange} type="password" />
      </div>

      <button className={styles.saveBtn} onClick={onSave}>Сохранить</button>
      {saved && <div className={styles.saved}>Сохранено ✓</div>}
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldLabel}>{label}</div>
      <input 
        className={styles.input} 
        name={name} 
        value={value} 
        onChange={onChange} 
        type={type} 
      />
    </div>
  );
}

function DownloadsHistory() {
  return (
    <div className={styles.history}>
      <div className={styles.historyHeader}>
        <div>Дата</div>
        <div>Данные</div>
      </div>
      <div className={styles.historyList}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.historyRow}>
            <div>19.11.2025</div>
            <div>Standart map | Suomi NPP | vist | 14.04.25 - 23.04.25</div>
          </div>
        ))}
      </div>
    </div>
  );
}
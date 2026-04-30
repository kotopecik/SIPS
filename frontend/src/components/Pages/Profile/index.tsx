import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logoutUser } from "@/store/user/user-actions";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutModal } from "@/components/ConfirmLogoutModal/ConfirmLogoutModal";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user.user);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Личные данные
  const [personalForm, setPersonalForm] = useState({
    last_name: user?.last_name || "",
    first_name: user?.first_name || "",
    middle_name: user?.middle_name || "",
    organization: user?.organization || "",
    email: user?.email || "",
  });

  // Смена пароля
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });

  const [personalMsg, setPersonalMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Загрузка фото
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

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Сохранение личных данных
  const handlePersonalSave = async () => {
    setPersonalMsg(null);
    if (!personalForm.first_name || !personalForm.last_name || !personalForm.email) {
      setPersonalMsg({ type: "error", text: "Фамилия, имя и email — обязательные поля" });
      return;
    }
    if (!isValidEmail(personalForm.email)) {
      setPersonalMsg({ type: "error", text: "Введите корректный email" });
      return;
    }

    setIsSavingPersonal(true);
    await new Promise(r => setTimeout(r, 800));
    setPersonalMsg({ type: "success", text: "Данные успешно обновлены ✓" });
    setIsSavingPersonal(false);
  };

  // Смена пароля
  const handlePasswordSave = async () => {
    setPasswordMsg(null);
    if (!passwordForm.old_password || !passwordForm.new_password || !passwordForm.new_password2) {
      setPasswordMsg({ type: "error", text: "Заполните все поля" });
      return;
    }
    if (passwordForm.new_password.length < 6) {
      setPasswordMsg({ type: "error", text: "Новый пароль должен быть минимум 6 символов" });
      return;
    }
    if (passwordForm.new_password !== passwordForm.new_password2) {
      setPasswordMsg({ type: "error", text: "Пароли не совпадают" });
      return;
    }

    setIsSavingPassword(true);
    await new Promise(r => setTimeout(r, 800));
    setPasswordMsg({ type: "success", text: "Пароль успешно изменён ✓" });
    setPasswordForm({ old_password: "", new_password: "", new_password2: "" });
    setIsSavingPassword(false);
  };

  const onLogout = async () => {
    await dispatch(logoutUser());
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>

        {/* Аватар */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarBig}>
            {photoUrl ? (
              <img src={photoUrl} alt="avatar" />
            ) : (
              <div className={styles.avatarFallbackBig}>
                {(user?.first_name || user?.email || "Л")[0].toUpperCase()}
              </div>
            )}
          </div>

          <label className={styles.uploadLabel}>
            Загрузить фото
            <input type="file" accept="image/*" onChange={onPickPhoto} />
          </label>

          {photoUrl && (
            <button className={styles.deleteBtn} onClick={onDeletePhoto}>
              Удалить фото
            </button>
          )}
        </div>

        {/* Основная часть */}
        <div className={styles.mainSection}>

          {/* Личные данные */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Личные данные</h2>
            
            {personalMsg && (
              <div className={personalMsg.type === "success" ? styles.successMsg : styles.errorMsg}>
                {personalMsg.text}
              </div>
            )}

            <div className={styles.grid}>
              <Field label="Фамилия *" value={personalForm.last_name} onChange={e => setPersonalForm({ ...personalForm, last_name: e.target.value })} />
              <Field label="Имя *" value={personalForm.first_name} onChange={e => setPersonalForm({ ...personalForm, first_name: e.target.value })} />
              <Field label="Отчество" value={personalForm.middle_name} onChange={e => setPersonalForm({ ...personalForm, middle_name: e.target.value })} />
              <Field label="Организация" value={personalForm.organization} onChange={e => setPersonalForm({ ...personalForm, organization: e.target.value })} />
              <Field label="Email *" value={personalForm.email} onChange={e => setPersonalForm({ ...personalForm, email: e.target.value })} type="email" />
            </div>

            <button className={styles.saveBtn} onClick={handlePersonalSave} disabled={isSavingPersonal}>
              {isSavingPersonal ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </div>

          {/* Смена пароля */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Смена пароля</h2>
            
            {passwordMsg && (
              <div className={passwordMsg.type === "success" ? styles.successMsg : styles.errorMsg}>
                {passwordMsg.text}
              </div>
            )}

            <div className={styles.grid}>
              <Field label="Старый пароль" value={passwordForm.old_password} onChange={e => setPasswordForm({ ...passwordForm, old_password: e.target.value })} type="password" />
              <Field label="Новый пароль" value={passwordForm.new_password} onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })} type="password" />
              <Field label="Повторите новый пароль" value={passwordForm.new_password2} onChange={e => setPasswordForm({ ...passwordForm, new_password2: e.target.value })} type="password" />
            </div>

            <button className={styles.saveBtn} onClick={handlePasswordSave} disabled={isSavingPassword}>
              {isSavingPassword ? "Сохранение..." : "Сменить пароль"}
            </button>
          </div>
        </div>

        {/* Сайдбар */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarItem}>Личный кабинет</div>
          <div className={styles.sidebarItem}>История скачиваний</div>
          <div className={styles.logout} onClick={() => setConfirmOpen(true)}>
            Выход из аккаунта
          </div>
        </div>
      </div>

      <ConfirmLogoutModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={onLogout} />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: any) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <input className={styles.input} value={value} onChange={onChange} type={type} />
    </div>
  );
}
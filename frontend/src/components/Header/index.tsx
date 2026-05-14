import { useMemo, useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { headerLinksAuth, headerLinksNotAuth } from "@/data/links";
import { useAppSelector, useAppDispatch } from "@/hooks/hook";
import { logoutUser } from "@/store/user/user-actions";
import ivtLogo from "@/assets/ivt-logo.svg";
import { ConfirmLogoutModal } from "@/components/ConfirmLogoutModal/ConfirmLogoutModal";

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuth = useAppSelector((s) => s.user.isAuth);
  const user = useAppSelector((s) => s.user.user);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const loadPhoto = () => {
      const saved = localStorage.getItem("userPhoto");
      setPhotoUrl(saved);
    };

    loadPhoto();

    window.addEventListener("storage", loadPhoto);
    const interval = setInterval(loadPhoto, 400);

    return () => {
      window.removeEventListener("storage", loadPhoto);
      clearInterval(interval);
    };
  }, []);

  const links = isAuth ? headerLinksAuth : headerLinksNotAuth;

  const avatarLetter = useMemo(() => {
    if (!user) return "Л";

    const name = user.first_name?.trim() || user.email?.trim() || "";

    return name ? name[0].toUpperCase() : "Л";
  }, [user]);

  const goToProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  const openLogoutModal = () => {
    setMenuOpen(false);
    setConfirmOpen(true);
  };

  const handleConfirmLogout = async () => {
    setConfirmOpen(false);
    localStorage.removeItem("userPhoto");
    await dispatch(logoutUser());
    navigate("/");
  };

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/authorization");
  };

  return (
    <>
      <header className={styles.root}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <img src={ivtLogo} alt="ИВТ" />
          </Link>

          <div className={styles.projectTitle}>
            <div className={styles.projectShort}>SIPS</div>
            <div className={styles.projectRu}>
              Система обработки спутниковых изображений
            </div>
            <div className={styles.projectEn}>
              Satellite Image Processing System
            </div>
          </div>

          <nav className={styles.nav}>
            {links.map((link) => {
              const active = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={active ? styles.navLinkActive : styles.navLink}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>

          <div className={styles.avatarWrapper}>
            <button
              className={styles.avatarBtn}
              onClick={() => setMenuOpen((value) => !value)}
              type="button"
              aria-label="Профиль"
            >
              {photoUrl ? (
                <img src={photoUrl} alt="avatar" className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarFallback}>{avatarLetter}</div>
              )}
            </button>

            {menuOpen && (
              <div className={styles.dropdown}>
                {isAuth ? (
                  <>
                    <div className={styles.dropdownItem} onClick={goToProfile}>
                      Личный кабинет
                    </div>

                    <div className={styles.dropdownItem} onClick={openLogoutModal}>
                      Выход
                    </div>
                  </>
                ) : (
                  <div className={styles.dropdownItem} onClick={goToLogin}>
                    Войти
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <ConfirmLogoutModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;
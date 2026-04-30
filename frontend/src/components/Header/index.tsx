import { useMemo } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { headerLinksAuth, headerLinksNotAuth } from "@/data/links";
import { useAppSelector } from "@/hooks/hook";
import ivtLogo from "@/assets/ivt-logo.svg";   // ← правильный путь

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuth = useAppSelector((s) => s.user.isAuth);
  const user = useAppSelector((s) => s.user.user);

  const links = isAuth ? headerLinksAuth : headerLinksNotAuth;

  const avatarLetter = useMemo(() => {
    if (!user) return "Л";
    const name = user.first_name?.trim() || user.email?.trim() || "";
    return name ? name[0].toUpperCase() : "Л";
  }, [user]);

  const onAvatarClick = () => {
    if (isAuth) navigate("/profile");
    else navigate("/authorization");
  };

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        {/* Логотип ИВТ */}
        <Link to="/" className={styles.logo}>
          <img src={ivtLogo} alt="ИВТ" />
        </Link>

        <nav className={styles.nav}>
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.id}
                to={link.to}
                className={active ? styles.navLinkActive : styles.navLink}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <button type="button" className={styles.avatarBtn} onClick={onAvatarClick}>
          <div className={styles.avatarFallback}>{avatarLetter}</div>
        </button>
      </div>
    </header>
  );
};

export default Header;
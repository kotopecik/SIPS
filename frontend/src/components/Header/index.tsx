import { useMemo } from "react";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { headerLinksAuth, headerLinksNotAuth } from "@/data/links";
import { useAppSelector } from "@/hooks/hook";

const Header = () => {
  const location = useLocation();
  const isAuthModalOpen =
  location.pathname === "/authorization" ||
  location.pathname === "/registration" ||
  location.pathname === "/restore";
  const navigate = useNavigate();
  const closeAuthModal = () => {
    navigate("/", { replace: true });
  };

  const isAuth = useAppSelector((s) => s.user.isAuth);
  const user = useAppSelector((s) => s.user.user);

  const links = isAuth ? headerLinksAuth : headerLinksNotAuth;

  const avatarLetter = useMemo(() => {
    const name = (user?.first_name || user?.email || "U").trim();
    return (name[0] || "U").toUpperCase();
  }, [user?.first_name, user?.email]);

  const avatarUrl: string | null = null;

const onAvatarClick = () => {
  if (isAuth) navigate("/profile");
  else navigate("/authorization");
};

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          SIPS
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
          {avatarUrl ? (
            <img className={styles.avatarImg} src={avatarUrl} alt="avatar" />
          ) : (
            <div className={styles.avatarFallback}>{avatarLetter}</div>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
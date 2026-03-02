import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { mainLinksAuth, mainLinksNotAuth, profileLinksAuth, profileLinksNotAuth } from "@/data/links";
import { MdOutlineMenu } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { ILink } from "@/interfaces/Ilink";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logoutUser } from "@/store/user/user-actions";
import { ConfirmLogoutModal } from "@/components/ConfirmLogoutModal/ConfirmLogoutModal";

const Header = () => {
  const headRef = useRef<HTMLHeadElement | null>(null);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isAuth: boolean = useAppSelector((state) => state.user.isAuth);

  const profileLinks: ILink[] = isAuth ? profileLinksAuth : profileLinksNotAuth;
  const mainLinks: ILink[] = isAuth ? mainLinksAuth : mainLinksNotAuth;

  const dispatch = useAppDispatch();

  // Настоящий logout (только после подтверждения)
  const onConfirmLogout = async () => {
    await dispatch(logoutUser());
    setConfirmOpen(false);
    setOpenMenu(false);
    setOpenProfile(false);
  };

  const toggleProfileMenu = () => {
    setOpenProfile(!isOpenProfile);
    if (isOpenMenu) setOpenMenu(false);
  };

  const toggleMainMenu = () => {
    setOpenMenu(!isOpenMenu);
    if (isOpenProfile) setOpenProfile(false);
  };

  // Закрытие при клике вне header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headRef.current && !headRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
        setOpenProfile(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header ref={headRef as any} className={styles.root}>
        <IoPeopleCircleOutline
          className={styles.icons__profile}
          onClick={toggleProfileMenu}
        />

        <Link to="/" className={styles.logo}>
          SIPS
        </Link>

        <MdOutlineMenu
          className={styles.icons__open}
          onClick={toggleMainMenu}
        />

        {/* БУРГЕР МЕНЮ */}
        {isOpenMenu && (
          <ul className={`${styles.navbar__menu} ${styles.active}`}>
            {mainLinks.map((link) =>
              link.title === "Выход" ? (
                <button
                  key={link.id}
                  onClick={() => setConfirmOpen(true)}
                  className={styles.exitbtn}
                >
                  Выход
                </button>
              ) : (
                <Link key={link.id} to={link.to}>
                  <li className={styles.navbar__item}>{link.title}</li>
                </Link>
              )
            )}
          </ul>
        )}

        {/* ПРОФИЛЬ МЕНЮ */}
        {isOpenProfile && (
          <ul className={`${styles.navbar__profile} ${styles.active}`}>
            {profileLinks.map((link) =>
              link.title === "Выход" ? (
                <button
                  key={link.id}
                  onClick={() => setConfirmOpen(true)}
                  className={styles.exitbtn}
                >
                  Выход
                </button>
              ) : (
                <Link key={link.id} to={link.to}>
                  <li className={styles.navbar__item}>{link.title}</li>
                </Link>
              )
            )}
          </ul>
        )}
      </header>

      {/* МОДАЛКА ПОДТВЕРЖДЕНИЯ */}
      <ConfirmLogoutModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirmLogout}
      />
    </>
  );
};

export default Header;
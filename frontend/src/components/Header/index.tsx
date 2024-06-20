import { useState, useEffect, useRef} from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import {mainLinksAuth, mainLinksNotAuth, profileLinksAuth, profileLinksNotAuth} from "@/data/links";
import { MdOutlineMenu } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { ILink } from "@/interfaces/Ilink";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { logout } from "@/store/user/user-slice";

const Header = () => {
  const headRef= useRef();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const isAuth : boolean = useAppSelector(state => state.user).isAuth

  const profileLinks : ILink[] = isAuth ? profileLinksAuth : profileLinksNotAuth
  const mainLinks : ILink[] = isAuth ? mainLinksAuth : mainLinksNotAuth
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  const closeProfileMenu = () => {
    setOpenProfile(!isOpenProfile);
    if (isOpenMenu) {
      setOpenMenu(false);
    }
  };
  const closeMainMenu = () => {
    setOpenMenu(!isOpenMenu);
    if (isOpenProfile) {
      setOpenProfile(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.composedPath().includes(headRef.current)) {
        setOpenMenu(false);
        setOpenProfile(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside); 
  }, []);

  return (

        <header ref={headRef} className={styles.root}>

          <IoPeopleCircleOutline className={styles.icons__profile} onClick={closeProfileMenu} />
          <Link to="/" className={styles.logo}>SIPS</Link>
          <MdOutlineMenu className={styles.icons__open} onClick={closeMainMenu} />

          {isOpenMenu && <ul className={`${styles.navbar__menu} ${styles.active}`}>
            {mainLinks.map((link) => (
                link.id === 2 ? <button onClick={handleLogout} className={styles.exitbtn}>Выход</button> : 
                <Link to={link.to}>
                  <li key={link.id} className={styles.navbar__item}>
                    {link.title}
                  </li>
                </Link>

            ))}
          </ul>}

          {isOpenProfile && <ul className={`${styles.navbar__profile} ${styles.active}`}>
            {profileLinks.map((link) => (
               <Link to={link.to}>
                 <li key={link.id} className={styles.navbar__item}>
                   {link.title}
                 </li>
               </Link>
            ))}
          </ul>}


        </header>

  );
};

export default Header;

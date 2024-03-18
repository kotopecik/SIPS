import { useState, useEffect, useRef} from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import {mainLinks, profileLinks} from "@/data/links";
import { MdOutlineMenu } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";

const Header = () => {
  const headRef= useRef();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenProfile, setOpenProfile] = useState(false);
  const dragging:boolean = useAppSelector(state => state.map).dragging

  const dispatch = useAppDispatch()

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
                <li key={link.id} className={styles.navbar__item}>
                  <Link to={link.to}>{link.title}</Link>
                </li>
            ))}
          </ul>}

          {isOpenProfile && <ul className={`${styles.navbar__profile} ${styles.active}`}>
            {profileLinks.map((link) => (
                <li key={link.id} className={styles.navbar__item}>
                  <Link to={link.to}>{link.title}</Link>
                </li>
            ))}
          </ul>}


        </header>

  );
};

export default Header;

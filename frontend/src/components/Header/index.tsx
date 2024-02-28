import { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { links } from "@/components/Header/links";
import { MdOutlineMenu } from "react-icons/md";
import { IoPeopleCircleOutline } from "react-icons/io5";
import {useAppDispatch, useAppSelector} from "@/hooks/hook";
import {disableMapDragging, enableMapDragging} from "@/store/map/map-slice";

const Header = () => {
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

  const onMouseDown = () => {
      dispatch(disableMapDragging())
      console.log(dragging)
  }

    const onMouseUp = () => {
        dispatch(enableMapDragging())
        console.log(dragging)
    }

  return (

        <header
            className={styles.root}

        >
          <IoPeopleCircleOutline
              className={styles.icons__profile}
              onClick={closeProfileMenu}
              onMouseUp={onMouseUp} onMouseDown={onMouseDown}
          />
          <Link to="/" className={styles.logo}>
            SIPS
          </Link>
          <MdOutlineMenu
              className={styles.icons__open}
              onClick={closeMainMenu}

          />
          <ul className={`${styles.navbar__menu} ${isOpenMenu ? styles.active : ""}`}>
            {links.mainLinks.map((link) => (
                <li key={link.id} className={styles.navbar__item}>
                  <Link to={link.to}>{link.title}</Link>
                </li>
            ))}
          </ul>
          <ul className={`${styles.navbar__profile} ${isOpenProfile ? styles.active : ""}`}>
            {links.profileLinks.map((link) => (
                <li key={link.id} className={styles.navbar__item}>
                  <Link to={link.to}>{link.title}</Link>
                </li>
            ))}
          </ul>

        </header>

  );
};

export default Header;

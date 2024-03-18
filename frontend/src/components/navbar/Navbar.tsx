//import { MdOutlineMenu } from "react-icons/md";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (

      <nav className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            SIPS
          </Link>
          {/*  <MdOutlineMenu
          className={styles.icons__open}
          onClick={() => setOpen(!isOpen)}
        /> */}
          <ul className={styles.navbar} /* ${isOpen ? styles.active : ""} */>
            <li className={styles.navbar__item}>
              <Link to="/">Перейти к карте</Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="!#">Профиль</Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="!#">Главная</Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="/authorization">Выйти</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;

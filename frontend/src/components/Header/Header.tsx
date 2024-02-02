import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import {links} from "@/components/Header/links";

const Header = () => {

  return (
    <header className={styles.root}>
      <Link to="/" className={styles.logo}>
        SIPS
      </Link>
      <ul className={styles.navbar} >
        {links.map((link) => (
            <li key={link.id} className={styles.navbar__item}>
              <Link to={link.to}>{link.title}</Link>
            </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;

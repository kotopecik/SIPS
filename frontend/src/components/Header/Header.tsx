import { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import {links} from "@/components/Header/links";
import { MdOutlineMenu } from "react-icons/md";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <header className={styles.root}>
      <Link to="/" className={styles.logo}>
        SIPS
      </Link>
      <MdOutlineMenu
        className={styles.icons__open}
        onClick={() => setOpen(!isOpen)}
      />
      <ul className={`${styles.navbar} ${isOpen ? styles.active : ""}`}>
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

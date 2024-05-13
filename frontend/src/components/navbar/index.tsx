import styles from "./Navbar.module.scss";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "@/data/links";
const AboutNavbar = () => {
  const activeLink = `${styles.navbar__link} ${styles['navbar__link--active']}`;
  const normalLink = `${styles.navbar__link}`;
  return (
    <nav className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          SIPS
        </Link>
        <ul className={styles.navbar}>
          {navbarLinks.map((link) => (
            <li
              key={link.id}
              className={styles.navbar__item} 
            >
              <NavLink to={link.to} className={({isActive}) => isActive ? activeLink : normalLink}>{link.title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AboutNavbar;

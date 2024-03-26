import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom';
import { mainProfileLinks } from "@/data/links";
const ProfileNavbar = () => {
  return (<nav className={styles.header}>
    <div className={styles.container}>
      <Link to="/" className={styles.logo}>
        SIPS
      </Link>
      <ul className={styles.navbar}>
        {mainProfileLinks.map((link) => (
          <li key={link.id} className={styles.navbar__item}>
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>);
};

export default ProfileNavbar;

//import { MdOutlineMenu } from "react-icons/md";
import { guideLinks } from "@/data/links";
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

        <ul className={styles.navbar}>
          {guideLinks.map((link) => (
            <li key={link.id} className={styles.navbar__item}>
              <Link to={link.to}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import styles from "./Page.module.scss";
import { Link } from "react-router-dom";
import {BackArrow} from "@/components/BackArrow/BackArrow";


const Authorization = () => {
  return (
    <div className={styles.root}>
      <BackArrow />
      <form className={styles.wrapper}>
        <h1>Авторизация</h1>
        <div className={styles.wrapper__input}>
          <input placeholder="Email" />
        </div>
        <div className={styles.wrapper__input}>
          <input type="password" placeholder="Пароль" />
        </div>

        <Link to="/">
          <button type="submit" className={styles.wrapper__btn}>
            Войти
          </button>
        </Link>
        <div className={styles.wrapper__reg}>
          <p>
            У вас нет аккауна?{" "}
            <Link to="/registration">Зарегистрироваться</Link>
          </p>
          <p>
            Забыли пароль? <Link to="/restoreaccess">Восстановить доступ</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Authorization;

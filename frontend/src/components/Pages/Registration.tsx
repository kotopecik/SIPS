import { Link } from "react-router-dom";
import styles from "./Page.module.scss";
import {BackArrow} from "@/components/BackArrow/BackArrow";



const Registration = () => {
  return (
    <div className={styles.root}>
      <BackArrow />
      <form className={styles.wrapper}>
        <h1>Регистрация</h1>
        <div className={styles.wrapper__input}>
          <input placeholder="Имя" />
        </div>

        <div className={styles.wrapper__input}>
          <input type="text" placeholder="Отчество" />
        </div>
        <div className={styles.wrapper__input}>
          <input type="text" placeholder="Название организации" />
        </div>
        <div className={styles.wrapper__input}>
          <input type="text" placeholder="Email" />
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
            У вас есть аккаунт? <Link to="/authorization">Авторизоваться</Link>
          </p>
          <p>
            Забыли пароль? <Link to="/restoreaccess">Восстановить доступ</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;

import { Link } from "react-router-dom";
import styles from "./Page.module.scss";
import { BackArrow } from "@/components/BackArrow/BackArrow";
import axios from "axios";


const Registration = () => {
  const handleClick = (e) => {
    let data = axios.post(`http://84.237.93.16:8080/api/vAUTH/registration/`, {
      username: "dea11111111111den12312djke12",
      password: "13H111111o1241rotu!12",
      email: "perc25111111111112eptionarmy12@icloud.com",
      first_name: "Ste2pan",
      last_name: "Isa3ev",
      middle_name: "An3dreevich",
      organization: "VK11INGU"
    })
    console.log(data)

  }
  return (
    <div className={styles.root}>
      <BackArrow />
      <form onSubmit={(e) => {
        handleClick(e)
        e.preventDefault()
      }} className={styles.wrapper}>
        <h1>Регистрация</h1>
        <div className={styles.wrapper__input}>
          <input placeholder="Имя" />
        </div>
        <div className={styles.wrapper__input}>
          <input placeholder="Фамилия" />
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
          <button  type="submit" className={styles.wrapper__btn}>
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

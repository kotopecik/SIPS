import styles from "./Page.module.scss";
import { Link } from "react-router-dom";
import {BackArrow} from "@/components/BackArrow/BackArrow";
import { useState, ChangeEvent } from "react";
import { useAppDispatch } from "@/hooks/hook";
import { loginUser } from "@/store/user/user-actions";
import { IUser } from "@/interfaces/IUser";





const Authorization = () => {

  const [user, setUser] = useState<IUser> (
    {
      username: '', 
      password: '', 
      email:'', 
      first_name:'', 
      last_name:'', 
      middle_name:'', 
      organization:''
    }
  )


  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
    });
};

const dispatch = useAppDispatch();

const onSubmit = (e) => {
  dispatch(loginUser(user))

  console.log(user)
  e.preventDefault()
}

  return (
    <div className={styles.root}>
      <BackArrow />
      <form onSubmit={(e) => {
        onSubmit(e)
        
      }}className={styles.wrapper}>
        <h1>Авторизация</h1>

        <div className={styles.wrapper__input}>
          <input 
          placeholder="Email" 
          type="text"
          name="email"
          onChange={handleChange}
          />
        </div>
        <div className={styles.wrapper__input}>
          <input 
          type="password" 
          placeholder="Пароль" 
          name="password"
          onChange={handleChange}
          />
        </div>


          <button type="submit" className={styles.wrapper__btn}>
            Войти
          </button>

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

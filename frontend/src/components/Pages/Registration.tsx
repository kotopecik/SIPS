import { Link, useNavigate } from "react-router-dom";
import styles from "./Page.module.scss";
import { BackArrow } from "@/components/BackArrow/BackArrow";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { IUser } from "@/interfaces/IUser";
import { useAppDispatch } from "@/hooks/hook";
import { loginUser, registerUser } from "@/store/user/user-actions";


const Registration = () => {
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

  const [isReg, setIsReg] = useState<boolean> (false);

  const dispatch = useAppDispatch();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
    });
};

  const handleClick = (e) => {
    user.username = user.first_name + user.last_name;
    dispatch(registerUser(user))
    e.preventDefault()
    setIsReg(true);
  }


  return (
    <div className={styles.root}>
      <BackArrow />
      {!isReg ? <form onSubmit={(e) => {
        handleClick(e)
        
      }} className={styles.wrapper}>

        <h1>Регистрация</h1>

        <div className={styles.wrapper__input}>
          <input 
            
            placeholder="Имя" 
            name = 'first_name'
            type="text" 
            value={user.first_name} 
            onChange={handleChange}
            />
            
        </div>
        <div className={styles.wrapper__input}>
          <input 
          placeholder="Фамилия"
           name = 'last_name'
           type="text" 
            value={user.last_name} 
            onChange={handleChange}
           />
        </div>
        <div className={styles.wrapper__input}>
          <input 
          type="text" 
          placeholder="Отчество" 
          name = 'middle_name' 
            value={user.middle_name} 
            onChange={handleChange}
          />
        </div>
        <div className={styles.wrapper__input}>
          <input 
          type="text" 
          placeholder="Название организации" 
          name = 'organization'
            value={user.organization} 
            onChange={handleChange}
          />
        </div>
        <div className={styles.wrapper__input}>
          <input 
          type="text" 
          placeholder="Email" 
          name = 'email'
          value={user.email} 
          onChange={handleChange}
          />
        </div>
        <div className={styles.wrapper__input}>
          <input 
          type="password" 
          placeholder="Пароль" 
          name = 'password'
          value={user.password} 
          onChange={handleChange}
          />
        </div>

          <button  type="submit" className={styles.wrapper__btn}>
            Войти
          </button>
        <div className={styles.wrapper__reg}>
          <p>
            У вас есть аккаунт? <Link to="/authorization">Авторизоваться</Link>
          </p>
          <p>
            Забыли пароль? <Link to="/restoreaccess">Восстановить доступ</Link>
          </p>
        </div>
      </form> 
      : 
      <div className={styles.wrapper}>
        <h1>Регистрация прошла успешно</h1>
        <Link to="/authorization">
          <button className={styles.wrapper__btn}>
            Перейти к авторизации
          </button>
        </Link>
      </div>
      
      }
      
    </div>
  );
};

export default Registration;

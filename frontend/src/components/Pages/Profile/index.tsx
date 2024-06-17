import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { checkAuth, logoutUser } from "@/store/user/user-actions";
import { NumericLiteral } from "typescript";



const Profile = () => {

  const dispatch = useAppDispatch();


  useEffect(() => {
    if (localStorage.getItem('token')){
        dispatch(checkAuth())
    }
  }, [])


  const access : string = useAppSelector(state => state.user).access

  const length : number = access.length



  const [userInfo, setUserInfo] = useState({
    email: "нет информации",
    firstName: "нет информации",
    middleName: "нет информации",
    lastName: "нет информации",
    organizationName: "нет информации",
  });
  return (
      <div className={styles.root}>
        <div className={styles.block}>
          <div className={styles.inf}>

            <div>
              <p className={styles.text}>Ф.И.О</p>
              <p className={styles.legends}>
                {access ? access.substring(length - 30, length) : ' no access' +
                  " " +
                  userInfo.firstName +
                  " " +
                  userInfo.middleName}
              </p>
              <hr className={styles.hr} />
            </div>

            <div>
              <p className={styles.text}>Название организации</p>
              <p className={styles.legends}>{userInfo.organizationName}</p>
              <hr className={styles.hr} />
            </div>

            <div>
              <p className={styles.text}>Email</p>
              <p className={styles.legends}>{userInfo.email}</p>
              <hr className={styles.hr} />
            </div>

          </div>
          <Link to="/restoreaccess">
            <button className={styles.button}>Изменить пароль</button>
          </Link>
          <Link to="!#">
            <button className={styles.button}>Администрирование</button>
          </Link>

        </div>
      </div>
  );
};

export default Profile;

import styles from "./Page.module.scss";
import {BackArrow} from "@/components/BackArrow/BackArrow";
import {Link} from "react-router-dom";


const RestoreAccess = () => {
    return(
        <div className={styles.root}>
            <BackArrow />
            <form className={styles.wrapper}>
                <h1>Восстановление Доступа</h1>
                <div className={styles.wrapper__input}>
                    <input placeholder="Email" />
                </div>

                <Link to="/">
                    <button type="submit" className={styles.wrapper__btn}>
                        Войти
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default RestoreAccess
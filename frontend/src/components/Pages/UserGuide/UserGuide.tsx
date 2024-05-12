import styles from "./UserGuide.module.scss";
import map from "../../../assets/png/screenshots/map.png";
import map1 from "../../../assets/png/screenshots/map2.png";
import sett from "../../../assets/png/screenshots/sett.png";
import sett1 from "../../../assets/png/screenshots/set.png";
import sett2 from '../../../assets/png/screenshots/sett3.png'
import sett3 from '../../../assets/png/screenshots/sett4.png'
import sett4 from '../../../assets/png/screenshots/sett5.png'
import calend1 from "../../../assets/png/screenshots/calend1.png";
import calend from "../../../assets/png/screenshots/calend.png";
import { useState } from "react";
import Navbar from "@/components/navbar";

const UserGuide = () => {
  const [toggleState, setToggleState] = useState(1);
  return (
      <div className={styles.root}>
        <div className={styles.block}>
          <div className={styles.container}>
            <ul className={styles.modules}>
              <li
                className={styles.modules__item}
                onClick={() => setToggleState(1)}
              >
                Модуль «Карта»
              </li>
              <li
                className={styles.modules__item}
                onClick={() => setToggleState(2)}
              >
                Модуль «Настройки»
              </li>
              <li
                className={styles.modules__item}
                onClick={() => setToggleState(3)}
              >
                Модуль «Календарь»
              </li>
              <li
                className={styles.modules__item}
                onClick={() => setToggleState(4)}
              >
                Модуль «Каталог»
              </li>
            </ul>
          </div>
          <div
            className={`${styles.map} ${
              toggleState === 1 ? styles.active : ""
            }`}
          >
            <img className={styles.map__img1} src={map} alt="доп. информация" />
            <div className={`${toggleState === 1 ? styles.text : ""}`}>
              
                1. Модуль, который показывает координаты курсора мыши на карте,
                относительно положения карты, в формате - градусы,минуты,
                секунды.
             
              
                2. Модуль для измерения расстояния "Линейка". Для его активации
                необходимо нажать на иконку с изображением линейки, после чего
                вместо линейки появится крестик - значит модуль активен. При
                первом клике по карте появится начальная точка, от неё начнётся
                отсчёт, далее необходимо поставить следующую точку, в
                необходимом месте.
              
              <img className={styles.map__img2} src={map1} alt="доп. информация" />
              
                3. Кнопки с иконками "+" и "-" предназначены для изменения
                масштаба карты. Кнопка "+" увеличивает масштаб, кнопка "-"
                уменьшает. Также масштабом можно усправлять с помощью колёсика
                мыши.
              
            </div>
          </div>
          <div
            className={`${styles.settings} ${
              toggleState === 2 ? styles.active : ""
            }`}
           >
            <div className={styles.text}>
              
                На Главной станице веб-приложения, в правом, верхнем углу,
                находится кнопка с иконкой шестерёнки:
              
              <img className={styles.settings__img3} src={sett} alt="настройки" />
              
                При нажатии на неё раскроется меню с набором дополнительных
                инструментов:
              
              <img className={styles.settings__img4} src={sett1} alt="настройки" />
              
                Пользователь может менять стиль подстилающей карты, для этого
                необходимо нажать на Radio button с соответствующим названием
                стиля: "StandartMap", "ESRI map", "Monochrome map".
              <br/><br/>
                Переключатель "Границы регионов" активирует слой, который отображает, на карте, границы регионов РФ.
              <img className={styles.settings__img5} src={sett2} alt="настройки" /><br/>
              Переключатель "Заповедники" активирует слой, отображающий полигоны заповедников.
              <img className={styles.settings__img5} src={sett3} alt="настройки" /> <br/>
              Переключатель "Населёные пукнты активирует слой, отображающий населённые пункты.
              <img className={styles.settings__img5} src={sett4} alt="настройки" />
            </div>
          </div>
          <div
            className={`${styles.settings} ${
              toggleState === 3 ? styles.active : ""
            }`}
           >
            <div className={styles.text}>
              
                На Главной станице веб-приложения, в правом, верхнем углу,
                находится кнопка с иконкой календаря:
              
              <img className={styles.settings__img3} src={calend} alt="календарь" />
              При нажатии на неё раскроется небольшое окно: 
              <img className={styles.settings__img4} src={calend1} alt="календарь" />
            </div>
          </div>
          <div
            className={`${styles.settings} ${
              toggleState === 4 ? styles.active : ""
            }`}
          >
            <ul className={styles.text}>
              <li>
                ...
              </li>
              
            </ul>
          </div>
        </div>
      </div>
  );
};

export default UserGuide;

import styles from "./UserGuide.module.scss";
import map from "../../../assets/png/screenshots/map.png";
import map1 from "../../../assets/png/screenshots/map1.png";
import sett from "../../../assets/png/screenshots/sett.png";
import sett1 from "../../../assets/png/screenshots/sett1.png";
import calend1 from "../../../assets/png/screenshots/calend1.png";
import calend from "../../../assets/png/screenshots/calend.png";
import { useState } from "react";
import Navbar from "@/components/navbar/GuideNavbar";

const UserGuide = () => {
  const [toggleState, setToggleState] = useState(1);
  return (
    <>
      <Navbar />
      <div className={styles.root}>
        <div className={styles.block}>
          <div
            className={`${styles.map} ${
              toggleState === 1 ? styles.active : ""
            }`}
          >
            <img className={styles.img} src={map} alt="доп. информация" />
            <ul className={`${toggleState === 1 ? styles.text : ""}`}>
              <li>
                1. Модуль, который показывает координаты курсора мыши на карте,
                относительно положения карты, в формате - градусы,минуты,
                секунды.
              </li>
              <li>
                2. Модуль для измерения расстояния "Линейка". Для его активации
                необходимо нажать на иконку с изображением линейки, после чего
                вместо линейки появится крестик - значит модуль активен. При
                первом клике по карте появится начальная точка, от неё начнётся
                отсчёт, далее необходимо поставить следующую точку, в
                необходимом месте.
              </li>
              <img className={styles.img} src={map1} alt="доп. информация" />
              <li>
                3. Кнопки с иконками "+" и "-" предназначены для изменения
                масштаба карты. Кнопка "+" увеличивает масштаб, кнопка "-"
                уменьшает. Также масштабом можно усправлять с помощью колёсика
                мыши.
              </li>
            </ul>
          </div>
          <div
            className={`${styles.settings} ${
              toggleState === 2 ? styles.active : ""
            }`}
          >
            <ul className={styles.text}>
              <li>
                На Главной станице веб-приложения, в правом, верхнем углу,
                находится кнопка с иконкой шестерёнки:
              </li>
              <img className={styles.img} src={sett} alt="настройки" />
              <li>
                При нажатии на неё раскроется меню с набором дополнительных
                инструментов:
              </li>
              <img className={styles.img} src={sett1} alt="настройки" />
              <li>
                Пользователь может менять стиль подстилающей карты, для этого
                необходимо нажать на Radio button с соответствующим названием
                стиля: "StandartMap", "ESRI map", "Monochrome map".
              </li>
            </ul>
          </div>
          <div
            className={`${styles.settings} ${
              toggleState === 3 ? styles.active : ""
            }`}
          >
            <ul className={styles.text}>
              <li>
                На Главной станице веб-приложения, в правом, верхнем углу,
                находится кнопка с иконкой календаря:
              </li>
              <img className={styles.img} src={calend} alt="календарь" />
              <li>При нажатии на неё раскроется небольшое окно:</li>
              <img className={styles.img} src={calend1} alt="календарь" />
            </ul>
          </div>
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGuide;

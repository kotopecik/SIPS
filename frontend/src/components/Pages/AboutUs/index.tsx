import Navbar from "@/components/navbar/AboutNavbar";
import styles from "./AboutUs.module.scss";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className={styles.root}>
        <div className={styles.block}>
          <div className={styles.inf}>
            Федеральный исследовательскй центр информационных и вычислительных
            технологий(ФИЦ ИВТ)
            <br />
            <br />
            Адрес: 630090, Россия, г.Новосибирск ул.Лавреньева 6<br />
            <br />
            Телефон: +7(383) 330-61-50
            <br />
            <br />
            E-mail: ict@ict.nsc.ru
            <br />
            <br />
            http://www.ict.nsc.ru/
          </div>
          <div className={styles.inf}>
            <p>
              Сервис выполнен выпускниками ВКИ НГУ:
              <br />
              <br />
              Лепешкиной Ксенией Александровной
              <br />
              Исаевым Степаном Андреевичем
              <br />
              Слободян Эвелиной Александровной
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

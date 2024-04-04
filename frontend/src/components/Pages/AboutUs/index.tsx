import Navbar from "@/components/navbar";
import styles from "./AboutUs.module.scss";
const AboutUs = () => {
  return (
      <div className={styles.root}>
        <div className={styles.block}>
          <div className={styles.inf}>
            <p>
              Федеральный исследовательскй центр информационных и вычислительных
              технологий(ФИЦ ИВТ)
            </p>
            <p>Адрес: 630090, Россия, г.Новосибирск ул.Лавреньева 6</p>
            <p>Телефон: +7(383) 330-61-50</p>
            <p>E-mail: ict@ict.nsc.ru</p>
            <p>
              <a className={styles.link} href="http://www.ict.nsc.ru/">Наш сайт</a>
            </p>
          </div>
          <div className={styles.inf}>
            <p>Продукты для просмотра: </p>
            <p>
              <li>Маскирование облачности </li>
              Пакет CLOUDMASK_SPA (VIIRS Cloud Mask Science Processing
              Algorithm) [22, 28] реализует алгоритмы маскирования
              облачности(установление пикселов сцены, закрытых облаками).
            </p>
            <p>
              <li>Аэрозольные продукты </li>
              Пакет AEROSOL_SPA (VIIRS Aerosol Science Processing Algorithm)
              [22, 29, 30] реализует алгоритм оценки параметров атмосферного
              аэрозоля.
            </p>
            <p>
              <li>Маска снежного покрова </li>
              Пакет SNOWCOV_SPA (SnowCover Science Processing Algorithm) [27,
              31] служит для определения пикселов сцены покрытых снегом и
              установления доли пиксела, содержащей снежный покров.
            </p>
            <p>
              <li>Коэффицент спектральной яркости подстилающей</li>
              Пакет SURFREFLECT_SPA (VIIRS Surface Reflectance Science
              Processing Algorithm) [24] позволяет получить коэффиценты
              спектральной яркости подстилающей поверхности.
            </p>
            <p>
              <li>Вегетационные индексы </li>Пакет VEGINDEX_SPA (VIIRS
              Vegitation Index (VI) Science Processing Algorithm) [26, 32]
              позволяет получать значения вегетационных индексов NDVI
              (Normalized Difference Vegetation Index) и EVI (Enhanced
              Vegetation Index).
            </p>
            <p>
              <li>Очаги термальных аномалий </li>Пакет VFIRE375_SPA(VIIRS 375m
              Active Fire Science Processing Algorithm) [20, 33].
              <br /> Пакет VIIRS-AF_SPA (VIIRS Active Science Processing
              Algorithm) [21] для выявления очагов термальных аномалий
              использует яркостные температуры M-каналов.
              <br />
              Пакет ACTIVEFIRES_SPA для выявления очагов термальных аномалий
              использует яркостные температуры M-каналов.
            </p>
          </div>
          <div className={styles.inf}>
            <p>Сервис выполнен выпускниками ВКИ НГУ:</p>
            <p>Лепешкиной Ксенией Александровной</p>
            Исаевым Степаном Андреевичем
            <br />
            Слободян Эвелиной Александровной
          </div>
        </div>
      </div>
  );
};

export default AboutUs;

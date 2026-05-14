import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.scss";

type ProductCard = {
  key: string;
  title: string;
  text: string;
};

const AboutUs = () => {
  const cards: ProductCard[] = useMemo(
    () => [
      { key: "aot550", title: "CLMSK2 (МАСКА ОБЛАЧНОСТИ УРОВНЯ 2)", text: "AOT550 — продукт, отражающий концентрацию аэрозольных частиц в атмосфере по ослаблению солнечного излучения на длине волны 550 нм, используемый для оценки качества воздуха и анализа дымовых шлейфов." },
      { key: "clphs", title: "CLPHS (ФАЗА ОБЛАКОВ)", text: "CLPHS — продукт, определяющий фазовое состояние облаков (жидкая, ледяная, смешанная) на основе теплового излучения в инфракрасных каналах." },
      { key: "clmsk", title: "CLMSK (МАСКА ОБЛАЧНОСТИ)", text: "CLMSK — продукт, классифицирующий пиксели по наличию облаков на основе данных каналов M1–M16 радиометра VIIRS. Используется как фильтр для исключения облачных зон." },
      { key: "aotaps", title: "AOTAPS", text: "AOTAPS — продукт AOT на 550 нм с учётом поляризационных характеристик рассеянного излучения, полученный по алгоритму APS." },
      { key: "aps", title: "APS", text: "Aerosol Polarimetry Sensor (APS) — алгоритм, учитывающий поляризацию при определении оптической толщины аэрозоля." },
      { key: "clmsk2", title: "CLMSK2", text: "CLMSK2 — улучшенная версия CLMSK с учётом фазы облаков и дополнительных спектральных признаков." },
      { key: "frmsk", title: "FRMSK", text: "FRMSK — продукт, выявляющий активные очахи пожаров по аномально высокой яркостной температуре в ИК диапазоне." },
      { key: "vindvi", title: "VINDVI", text: "VINDVI — продукт NDVI: нормализованная разность отражений в ближнем ИК и красном диапазонах." },
      { key: "vlst", title: "VLST", text: "VLST — продукт, объединяющий вегетационный индекс с данными о температуре поверхности Земли." },
      { key: "vievi", title: "VIEVI", text: "VIEVI — продукт, корректирующий атмосферные эффекты и насыщение сигнала в густой растительности, повышенная чувствительность." },
      { key: "evi", title: "EVI", text: "Enhanced Vegetation Index (EVI) — индекс растительности для оценки здоровья и плотности, улучшенный относительно NDVI." },
      { key: "ndvi", title: "NDVI", text: "Normalized Difference Vegetation Index (NDVI) — индекс растительности, определяющий наличие растительной массы на участке." },
      { key: "lst", title: "LST", text: "Land Surface Temperature (LST) — температура поверхности Земли, измеряемая спутниками по тепловому ИК излучению." },
      { key: "vscmo", title: "VSCMO", text: "VSCMO — продукт, формируемый агрегацией ежедневных наблюдений за месяц для определения устойчивых зон снега." },
    ],
    []
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [pause, setPause] = useState(false);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>(`[data-card="1"]`));
    const el = items[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handler = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>(`[data-card="1"]`));
      if (!items.length) return;

      const left = track.getBoundingClientRect().left;
      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left - left);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });

      setActive(bestIdx);
    };

    handler();
    track.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      track.removeEventListener("scroll", handler as any);
      window.removeEventListener("resize", handler);
    };
  }, []);

// Автопрокрутка (только когда курсор над каруселью)
useEffect(() => {
  if (pause) return;

  const id = window.setInterval(() => {
    const track = trackRef.current;
    if (!track) return;

    // Проверяем, видна ли карусель на экране
    const rect = track.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (!isVisible) return; // не крутим, если карусель не видна

    const next = (active + 1) % cards.length;
    scrollToIndex(next);
  }, 3500);

  return () => window.clearInterval(id);
}, [active, pause, cards.length]);

  return (
    <div className={styles.root}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroText}>
            Разрабатывайте, анализируйте и открывайте новое с данными VIIRS,
            превращая сложные спутниковые данные в ясные и информативные визуализации.
          </p>
        </div>

        <div className={styles.heroRight}>
          <h1 className={styles.heroTitle}>
            РАСЧЕТ И
            <br />
            ВИЗУАЛИЗАЦИЯ
            <br />
            ДАННЫХ
          </h1>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className={styles.products}>
        <h2 className={styles.sectionBigTitle}>ПРЕДОСТАВЛЯЕМЫЕ ПРОДУКТЫ</h2>

        <div
          className={styles.track}
          ref={trackRef}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          {cards.map((c) => (
            <div key={c.key} className={styles.card} data-card="1">
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardText}>{c.text}</div>
            </div>
          ))}
        </div>

        {/* ТОЧКИ (7 штук) */}
        <div className={styles.dots}>
          {Array.from({ length: 7 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active % 7 ? styles.dotActive : styles.dot}
              aria-label={`Слайд ${i + 1}`}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const items = Array.from(track.querySelectorAll<HTMLElement>(`[data-card="1"]`));
                const targetIndex = Math.floor((i / 6) * (items.length - 1));
                const el = items[targetIndex];
                if (el) el.scrollIntoView({ behavior: "smooth", inline: "start" });
              }}
            />
          ))}
        </div>
      </section>

      {/* USER GUIDE */}
      <section className={styles.guide}>
        <h2 className={styles.sectionBigTitle}>РУКОВОДСТВО ПОЛЬЗОВАТЕЛЯ</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepText}>
              Выберите тип карты для визуализации и при необходимости добавьте дополнительные параметры,
              такие как границы регионов, заповедники или населенные пункты.
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepText}>
              Выберите спутник для получения данных. После этого откроется окно выбора даты наблюдения.
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepText}>
              Укажите интересующую дату и выберите продукт, который хотите просмотреть.
              Выбранный продукт отобразится на карте.
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNum}>4</div>
            <div className={styles.stepText}>
              Сохраните нужный снимок на локальный компьютер с помощью функции экспорта или измените параметры
              и выберите другой продукт для загрузки.
            </div>
          </div>
        </div>

        <Link to="/" className={styles.toMapBtn}>
          НА КАРТУ
        </Link>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <div className={styles.footerTitle}>Адрес</div>
            <div>630090, Россия, г.Новосибирск</div>
            <div>ул.Лавреньева 6</div>

            <div className={styles.footerTitle} style={{ marginTop: 12 }}>
              Телефон
            </div>
            <div>+7(383) 330-61-50</div>

            <div className={styles.footerTitle} style={{ marginTop: 12 }}>
              E-mail
            </div>
            <div>ict@ict.nsc.ru</div>
          </div>

          <div className={styles.footerCol}>
            <div className={styles.footerTitle}>
              Федеральный исследовательский центр информационных и вычислительных технологий (ФИЦ ИВТ)
            </div>

            <a 
              href="http://www.ict.nsc.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              www.ict.nsc.ru
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
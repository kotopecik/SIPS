import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setComposite } from "@/store/tile/tile-slice";
import s from "./Settings.module.scss";

const compositeDescriptions: Record<string, string> = {

  aot550: "Продукт, отражающий концентрацию аэрозольных частиц в атмосфере по ослаблению солнечного излучения на длине волны 550 нм. Используется для оценки качества воздуха и анализа дымовых шлейфов.",

  aotaps: "Продукт, отражающий концентрацию аэрозольных частиц в атмосфере по ослаблению солнечного излучения на длине волны 550 нм с учетом поляризационных характеристик рассеянного излучения. Получен по алгоритму APS.",

  clphs: "Продукт, определяющий фазовое состояние облаков (жидкая, ледяная, смешанная) на основе теплового излучения в инфракрасных каналах.",

  clmsk: "Продукт, классифицирующий пиксели по наличию облаков на основе данных каналов M1–M16 радиометра VIIRS. Используется для исключения облачных зон при анализе поверхности.",

  clmsk2: "Улучшенная версия продукта clmsk с учетом фазы облаков и дополнительных спектральных признаков.",

  frmsk: "Продукт, выявляющий активные очаги пожаров по аномально высокой яркостной температуре в инфракрасном диапазоне.",

  vievi: "Продукт, корректирующий атмосферные эффекты и насыщение сигнала в густой растительности, обеспечивая повышенную чувствительность.",

  vindvi: "Продукт, вычисляемый как нормализованная разность отражений в ближнем инфракрасном и красном спектральных диапазонах.",

  vlst: "Продукт, объединяющий вегетационный индекс с данными о температуре поверхности Земли.",

  vscmo: "Продукт, формирующийся путем агрегации ежедневных наблюдений за месяц для определения устойчивых зон снега."

}

const Composites = () => {

  const dispatch = useAppDispatch();

  const composites = useAppSelector(state => state.tile.composites);
  const selectedComposite = useAppSelector(state => state.tile.composite);

  const [hovered, setHovered] = useState<string | null>(null);

  if (!composites || composites.length === 0) return null;

  return (

    <div className={s.compositesGrid}>

      {composites.map((item) => (

        <div
          key={item}
          className={s.compositeWrapper}
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
        >

          <button
            className={
              selectedComposite === item
                ? s.compositeActive
                : s.compositeChip
            }
            onClick={() => dispatch(setComposite(item))}
          >
            {item}
          </button>

          {hovered === item && (

            <div className={s.tooltipUnder}>
              {compositeDescriptions[item]}
            </div>

          )}

        </div>

      ))}

    </div>

  );

};

export default Composites;
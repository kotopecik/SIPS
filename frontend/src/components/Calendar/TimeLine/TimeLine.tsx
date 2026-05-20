import type { ChangeEvent } from "react";
import s from "./TimeLine.module.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setTime } from "@/store/tile/tile-slice";
import { Mark } from "@mui/base";

const normalizeTime = (value: unknown): string => {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  const onlyDigits = String(value).replace(/\D/g, "");

  if (!onlyDigits) {
    return "";
  }

  return onlyDigits.padStart(4, "0").slice(0, 4);
};

const formatTimeLabel = (time: string): string => {
  if (time.length !== 4) {
    return time;
  }

  return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
};

const TimeLine = () => {
  const dispatch = useAppDispatch();

  const times: Mark[] = useAppSelector((state) => state.tile.times) || [];
  const selectedTime = useAppSelector((state) => state.tile.dateTime.time);

  const normalizedTimes = times
    .map((time) => {
      const label = normalizeTime(time.label);
      const value = normalizeTime(time.value);

      const normalizedValue = value || label;

      return {
        label: formatTimeLabel(normalizedValue),
        value: normalizedValue,
      };
    })
    .filter((time) => time.value);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTime(event.target.value));
  };

  return (
    <div className={s.timeBlock}>
      <label className={s.label}>Время съёмки</label>

      {normalizedTimes.length > 0 ? (
        <select
          className={s.select}
          value={selectedTime || normalizedTimes[0].value}
          onChange={handleChange}
        >
          {normalizedTimes.map((time) => (
            <option key={time.value} value={time.value}>
              {time.label}
            </option>
          ))}
        </select>
      ) : (
        <div className={s.emptyTime}>
          Для выбранной даты время не найдено
        </div>
      )}
    </div>
  );
};

export default TimeLine;
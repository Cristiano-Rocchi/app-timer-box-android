import { useRef, useState } from "react";

export const useTimerSetup = (
  initialValue = 30,
  isSeconds = true,
  min = 5,
  max = 3599,
) => {
  const [value, setValue] = useState(initialValue);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Funzione base per aggiornare il valore con i limiti personalizzati
  const updateValue = (amount) => {
    setValue((prev) => {
      const next = prev + amount;
      if (next > max) return max;
      if (next < min) return min;
      return next;
    });
  };

  const startAdjusting = (type) => {
    const isAdd = type === "add";

    const step = isSeconds ? (isAdd ? 5 : -5) : isAdd ? 1 : -1;
    const fastStep = isSeconds ? (isAdd ? 60 : -60) : isAdd ? 5 : -5;

    updateValue(step);

    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const durationPressed = (Date.now() - startTimeRef.current) / 1000;

      if (durationPressed >= 6) {
        updateValue(fastStep);
      } else {
        updateValue(step);
      }
    }, 150);
  };

  const stopAdjusting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = null;
  };

  const formatDisplay = () => {
    if (!isSeconds) return value.toString();

    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    value,
    setValue,
    display: formatDisplay(),
    startAdjusting,
    stopAdjusting,
  };
};

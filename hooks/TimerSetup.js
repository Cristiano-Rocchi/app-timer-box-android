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

    // DEFINIZIONE DEGLI STEP
    // Se isSeconds: step 5s, dopo 6s diventa 60s
    // Se NON isSeconds (Round): step 1, dopo 6s diventa 5
    const step = isSeconds ? (isAdd ? 5 : -5) : isAdd ? 1 : -1;
    const fastStep = isSeconds ? (isAdd ? 60 : -60) : isAdd ? 5 : -5;

    // 1. Scatto immediato
    updateValue(step);

    startTimeRef.current = Date.now();

    // 2. Avviamo il ciclo di ripetizione
    intervalRef.current = setInterval(() => {
      const durationPressed = (Date.now() - startTimeRef.current) / 1000;

      if (durationPressed >= 6) {
        updateValue(fastStep); // Accelerazione dopo 6 secondi
      } else {
        updateValue(step); // Passo normale
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

  // FORMATTAZIONE DEL TESTO
  const formatDisplay = () => {
    if (!isSeconds) return value.toString(); // Ritorna "12"

    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`; // Ritorna "03:00"
  };

  return {
    value, // Il numero puro (utile per i calcoli della durata totale)
    display: formatDisplay(), // Il testo da mostrare nella card
    startAdjusting,
    stopAdjusting,
  };
};

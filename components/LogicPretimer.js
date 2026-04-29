import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, Vibration, View } from "react-native";
import { styles } from "../constants/styleTimer";
import { translations } from "../constants/translations";

// Aggiungiamo isSoundEnabled e isVibrationEnabled alle props
export default function LogicPreTimer({
  onFinish,
  isPaused,
  lang,
  isSoundEnabled,
  isVibrationEnabled,
}) {
  const [timeLeft, setTimeLeft] = useState(5);

  const t = translations[lang] || translations["eng"];

  async function playSound(type) {
    // --- PASSO 3: Se l'audio è disattivato, esci subito ---
    if (!isSoundEnabled) return;

    try {
      const file =
        type === "beep"
          ? require("../assets/sounds/beep.mp3")
          : require("../assets/sounds/bell.mp3");

      const { sound } = await Audio.Sound.createAsync(file);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((s) => {
        if (s.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let timer = null;
    let timeout = null;

    if (timeLeft > 0 && !isPaused) {
      playSound("beep");
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isPaused) {
      playSound("bell");

      // --- PASSO 3: Se la vibrazione è attiva, vibra ---
      if (isVibrationEnabled) {
        Vibration.vibrate(600);
      }

      timeout = setTimeout(() => {
        onFinish();
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [timeLeft, isPaused, onFinish]);

  return (
    <View style={styles.preTimerContent}>
      <Text style={styles.countdownNumber}>
        {timeLeft === 0 ? t.go : timeLeft}
      </Text>
      <Text style={styles.prepareText}>{t.prepare}</Text>
    </View>
  );
}

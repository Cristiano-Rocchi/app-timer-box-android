import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, Vibration, View } from "react-native";
import { styles } from "../constants/styleTimer";
import { translations } from "../constants/translations";

export default function LogicPreTimer({ onFinish, isPaused, lang }) {
  // RICEVE LANG
  const [timeLeft, setTimeLeft] = useState(5);

  // Recuperiamo le traduzioni
  const t = translations[lang] || translations["eng"];

  async function playSound(type) {
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
      Vibration.vibrate(600);
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
        {/* TRADOTTO: VAI! */}
        {timeLeft === 0 ? t.go : timeLeft}
      </Text>
      {/* TRADOTTO: PREPARATI */}
      <Text style={styles.prepareText}>{t.prepare}</Text>
    </View>
  );
}

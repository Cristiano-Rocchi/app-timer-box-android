import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../constants/styleTimer";

export default function LogicPreTimer({ onFinish, isPaused }) {
  // Aggiunta prop isPaused
  const [timeLeft, setTimeLeft] = useState(5);

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

    // Il countdown procede solo se NON è in pausa e c'è tempo rimasto
    if (timeLeft > 0 && !isPaused) {
      playSound("beep");
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    // Quando arriva a zero (e non è in pausa)
    else if (timeLeft === 0 && !isPaused) {
      playSound("bell");
      timeout = setTimeout(() => {
        onFinish();
      }, 1000);
    }

    // Pulizia degli intervalli e timeout
    return () => {
      if (timer) clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [timeLeft, isPaused, onFinish]); // Aggiunta dipendenza isPaused

  return (
    <View style={styles.preTimerContent}>
      <Text style={styles.countdownNumber}>
        {timeLeft === 0 ? "VAI!" : timeLeft}
      </Text>
      <Text style={styles.prepareText}>PREPARATI</Text>
    </View>
  );
}

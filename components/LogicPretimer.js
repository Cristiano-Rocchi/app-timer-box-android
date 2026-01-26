import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../constants/styleTimer";

export default function LogicPreTimer({ onFinish }) {
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
    if (timeLeft > 0) {
      playSound("beep");
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      playSound("bell"); // Facciamo partire la campana da 2 secondi subito

      const timeout = setTimeout(() => {
        onFinish();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft]);

  return (
    <View style={styles.preTimerContent}>
      <Text style={styles.countdownNumber}>
        {timeLeft === 0 ? "VAI!" : timeLeft}
      </Text>
      <Text style={styles.prepareText}>PREPARATI</Text>
    </View>
  );
}

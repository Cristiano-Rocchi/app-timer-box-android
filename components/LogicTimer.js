import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../constants/styleTimer";

export default function LogicTimer({
  workTime,
  restTime,
  isPaused,
  onRoundComplete,
  currentRound, // AGGIUNTO
  totalRounds, // AGGIUNTO
}) {
  const [phase, setPhase] = useState("WORK");
  const [timeLeft, setTimeLeft] = useState(workTime);

  async function playSound(type) {
    try {
      const file =
        type === "bell"
          ? require("../assets/sounds/bell.mp3")
          : require("../assets/sounds/beep.mp3");

      const { sound } = await Audio.Sound.createAsync(file);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((s) => {
        if (s.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.log(e);
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval = null;

    if (!isPaused && timeLeft > 0) {
      if (timeLeft <= 3) {
        playSound("beep");
      }

      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound("bell");

      if (phase === "WORK") {
        setPhase("REST");
        setTimeLeft(restTime);
        onRoundComplete();
      } else {
        setPhase("WORK");
        setTimeLeft(workTime);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, phase]);

  return (
    <View
      style={[
        styles.preTimerContent,
        {
          borderColor: phase === "WORK" ? "#4CD964" : "#FF3B30",
          borderWidth: 4,
        },
      ]}
    >
      <Text style={styles.countdownNumber}>{formatTime(timeLeft)}</Text>

      {/* MODIFICATO: Ora mostra la fase e il numero del round */}
      <Text style={styles.prepareText}>
        {phase === "WORK" ? "ROUND" : "RIPOSO"}{" "}
        <Text style={{ fontWeight: "bold" }}>{currentRound}</Text>/{totalRounds}
      </Text>
    </View>
  );
}

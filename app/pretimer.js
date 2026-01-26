import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router"; // <--- AGGIUNTO useRouter
import { useEffect, useState } from "react"; // <--- MANCAVANO QUESTI
import { Text, View } from "react-native";
import BackgroundView from "../components/BackgroundView";
import { styles } from "../constants/styleTimer";

export default function PreTimerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [timeLeft, setTimeLeft] = useState(5);

  async function playSound(type) {
    try {
      const soundFile =
        type === "beep"
          ? require("../assets/sounds/beep.mp3")
          : require("../assets/sounds/bell.mp3");

      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Errore riproduzione audio:", error);
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
      playSound("bell");

      // Piccolo ritardo prima di cambiare pagina per far sentire la campana
      const timeout = setTimeout(() => {
        router.replace({
          pathname: "/timer",
          params: params,
        });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft]);

  return (
    <BackgroundView>
      <View style={styles.headerTitles}>
        <Text style={styles.title}>&lt;</Text>
        <Text style={styles.title}>TIMER</Text>
      </View>

      <View style={styles.Content}>
        <View style={styles.preTimerContent}>
          <Text style={styles.countdownNumber}>
            {timeLeft === 0 ? "VAI!" : timeLeft}
          </Text>
          <Text style={styles.prepareText}>PREPARATI</Text>
        </View>
        <View style={styles.ButtonsContainer}>
          <Text style={styles.playPauseButton}>Button</Text>
        </View>
      </View>
    </BackgroundView>
  );
}

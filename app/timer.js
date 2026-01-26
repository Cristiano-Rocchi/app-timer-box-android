import { Text, View } from "react-native";
import BackgroundView from "../components/BackgroundView";
import { styles } from "../constants/styleTimer";

export default function PreTimerScreen() {
  return (
    <BackgroundView>
      <View style={styles.headerTitles}>
        <Text style={styles.title}>&lt;</Text>
        <Text style={styles.title}>TIMER</Text>
      </View>

      <View style={styles.Content}>
        <View style={styles.preTimerContent}>
          <Text style={styles.countdownNumber}>00:30</Text>
          <Text style={styles.prepareText}>Round/riposo</Text>
        </View>
        <View style={styles.ButtonsContainer}>
          <Text style={styles.playPauseButton}>Button</Text>
        </View>
      </View>
    </BackgroundView>
  );
}

import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import BackgroundView from "../components/BackgroundView";

import Mbutton from "../assets/icons/Mbutton.svg";
import Pbutton from "../assets/icons/Pbutton.svg";
import Playbutton from "../assets/icons/Play.svg";
import RoundImg from "../assets/images/round.webp";
import LavoroImg from "../assets/images/tempolavoro.webp";
import RiposoImg from "../assets/images/temporiposo.webp";
import { styles } from "../constants/style";
import { useTimerSetup } from "../hooks/TimerSetup";
export default function SetupScreen() {
  const router = useRouter();

  const workTimer = useTimerSetup(30, true, 5, 3599); // MM:SS, min 5s, max 59:59
  const restTimer = useTimerSetup(30, true, 5, 3599); // MM:SS, min 5s, max 59:59
  const roundCounter = useTimerSetup(5, false, 1, 99); // Numero, min 1, max 99

  // Calcolo dinamico durata totale
  const totalSecs = Math.max(
    0,
    (workTimer.value + restTimer.value) * roundCounter.value - restTimer.value,
  );

  const totalMins = Math.floor(totalSecs / 60);
  const totalRemainingSecs = totalSecs % 60;

  const handleStart = () => {
    // Logica per navigare al timer passando i dati
    router.push({
      pathname: "/timer",
      params: {
        rounds: roundCounter.value,
        workTime: workTimer.value,
        restTime: restTimer.value,
      },
    });
  };

  return (
    <BackgroundView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* TITOLO DELL'APP */}
        <View style={styles.headerTitles}>
          <Text style={styles.title}>BOXING TIMER</Text>
          <Text>info</Text>
        </View>

        {/* --- INIZIO AREA CARD SETUP --- */}
        {/* Qui inserirai le tue Card personalizzate (es. Round, Work, Rest) */}
        <View style={styles.cards}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>DURATA DEL ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>{workTimer.display}</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      onPressIn={() => workTimer.startAdjusting("sub")}
                      onPressOut={workTimer.stopAdjusting}
                    >
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => workTimer.startAdjusting("add")}
                      onPressOut={workTimer.stopAdjusting}
                    >
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.cardImg}>
                <Image
                  source={LavoroImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>DURATA DEL ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>{restTimer.display}</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      onPressIn={() => restTimer.startAdjusting("sub")}
                      onPressOut={restTimer.stopAdjusting}
                    >
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => restTimer.startAdjusting("add")}
                      onPressOut={restTimer.stopAdjusting}
                    >
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.cardImg}>
                <Image
                  source={RiposoImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>NUMERO DI ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>{roundCounter.display}</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      onPressIn={() => roundCounter.startAdjusting("sub")}
                      onPressOut={roundCounter.stopAdjusting}
                    >
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={() => roundCounter.startAdjusting("add")}
                      onPressOut={roundCounter.stopAdjusting}
                    >
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.cardImg}>
                <Image
                  source={RoundImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </View>

        {/* --- FINE AREA CARD SETUP --- */}

        {/* BOTTONE DI AVVIO (PLAY/START) */}
        <View style={styles.playButton}>
          <TouchableOpacity onPress={handleStart}>
            <Playbutton width={80} height={80} />
          </TouchableOpacity>
          <View style={styles.durataTotale}>
            <Text style={styles.durataText}>DURATA TOTALE</Text>
            <Text style={styles.durataTime}>
              {`${totalMins.toString().padStart(2, "0")}:${totalRemainingSecs.toString().padStart(2, "0")}`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </BackgroundView>
  );
}

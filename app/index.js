import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundView from "../components/BackgroundView";

import Mbutton from "../assets/icons/Mbutton.svg";
import Pbutton from "../assets/icons/Pbutton.svg";
import Playbutton from "../assets/icons/Play.svg";
import RoundImg from "../assets/images/round.webp";
import LavoroImg from "../assets/images/tempolavoro.webp";
import RiposoImg from "../assets/images/temporiposo.webp";
import { styles } from "../constants/style";
import { translations } from "../constants/translations";
import { useTimerSetup } from "../hooks/TimerSetup";

export default function SetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Per ora impostiamo la lingua fissa su "it". In futuro la leggeremo dalle impostazioni.
  const lang = "eng";
  const t = translations[lang];

  const workTimer = useTimerSetup(30, true, 5, 3599); // MM:SS, min 5s, max 59:59
  const restTimer = useTimerSetup(30, true, 5, 3599); // MM:SS, min 5s, max 59:59
  const roundCounter = useTimerSetup(5, false, 1, 99); // Numero, min 1, max 99

  // --- 1. CARICAMENTO DATI ALL'AVVIO ---
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedData = await AsyncStorage.getItem("@timer_settings");
        if (savedData !== null) {
          const parsed = JSON.parse(savedData);
          workTimer.setValue(parsed.workTime);
          restTimer.setValue(parsed.restTime);
          roundCounter.setValue(parsed.rounds);
        }
      } catch (e) {
        console.log("Errore caricamento:", e);
      }
    };
    loadSettings();
  }, []);

  // --- 2. SALVATAGGIO AUTOMATICO ---
  useEffect(() => {
    const saveSettings = async () => {
      try {
        const dataToSave = {
          workTime: workTimer.value,
          restTime: restTimer.value,
          rounds: roundCounter.value,
        };
        await AsyncStorage.setItem(
          "@timer_settings",
          JSON.stringify(dataToSave),
        );
      } catch (e) {
        console.log("Errore salvataggio:", e);
      }
    };
    saveSettings();
  }, [workTimer.value, restTimer.value, roundCounter.value]);

  // Calcolo dinamico durata totale
  const totalSecs = Math.max(
    0,
    (workTimer.value + restTimer.value) * roundCounter.value - restTimer.value,
  );

  const totalMins = Math.floor(totalSecs / 60);
  const totalRemainingSecs = totalSecs % 60;

  const handleStart = () => {
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
      <View style={{ paddingTop: insets.top }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* TITOLO DELL'APP */}
          <View style={styles.headerTitles}>
            <Text style={styles.title}>{t.app_title}</Text>
            <Text>{t.info_btn}</Text>
          </View>

          {/* --- INIZIO AREA CARD SETUP --- */}
          <View style={styles.cards}>
            {/* CARD LAVORO */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardSettings}>
                  <Text style={styles.cardTitle}>{t.work_duration}</Text>
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

            {/* CARD RIPOSO */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardSettings}>
                  <Text style={styles.cardTitle}>{t.rest_duration}</Text>
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

            {/* CARD ROUNDS */}
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardSettings}>
                  <Text style={styles.cardTitle}>{t.rounds_count}</Text>
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

          {/* BOTTONE DI AVVIO E DURATA TOTALE */}
          <View style={styles.playButton}>
            <TouchableOpacity onPress={handleStart}>
              <Playbutton width={80} height={80} />
            </TouchableOpacity>
            <View style={styles.durataTotale}>
              <Text style={styles.durataText}>{t.total_duration}</Text>
              <Text style={styles.durataTime}>
                {`${totalMins.toString().padStart(2, "0")}:${totalRemainingSecs.toString().padStart(2, "0")}`}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

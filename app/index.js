import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Importante per aggiornare al ritorno
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react"; // Aggiunto useState e useCallback
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundView from "../components/BackgroundView";

import Mbutton from "../assets/icons/Mbutton.svg";
import Pbutton from "../assets/icons/Pbutton.svg";
import Playbutton from "../assets/icons/Play.svg";
import Settingsbutton from "../assets/icons/Settings.svg";
import RoundImg from "../assets/images/round.webp";
import LavoroImg from "../assets/images/tempolavoro.webp";
import RiposoImg from "../assets/images/temporiposo.webp";
import { styles } from "../constants/style";
import { translations } from "../constants/translations";
import { useTimerSetup } from "../hooks/TimerSetup";

export default function SetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // --- STATO PER LA LINGUA ---
  const [lang, setLang] = useState("eng");
  const t = translations[lang] || translations["eng"];

  const workTimer = useTimerSetup(180, true, 5, 3599);
  const restTimer = useTimerSetup(60, true, 5, 3599);
  const roundCounter = useTimerSetup(12, false, 1, 99);

  // --- CARICAMENTO IMPOSTAZIONI (Lingua, Suoni, Vibrazione) ---
  const loadAppSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("@app_settings");
      if (savedSettings !== null) {
        const parsed = JSON.parse(savedSettings);
        if (parsed.lang) setLang(parsed.lang);
      }
    } catch (e) {
      console.log("Errore caricamento app settings:", e);
    }
  };

  // --- CARICAMENTO VALORI TIMER ---
  const loadTimerValues = async () => {
    try {
      const savedData = await AsyncStorage.getItem("@timer_settings");
      if (savedData !== null) {
        const parsed = JSON.parse(savedData);
        workTimer.setValue(parsed.workTime);
        restTimer.setValue(parsed.restTime);
        roundCounter.setValue(parsed.rounds);
      }
    } catch (e) {
      console.log("Errore caricamento timer:", e);
    }
  };

  // Questo hook si attiva ogni volta che la schermata torna in primo piano
  // Utile se cambi lingua nelle impostazioni e poi torni indietro
  useFocusEffect(
    useCallback(() => {
      loadAppSettings();
      loadTimerValues();
    }, []),
  );

  // --- SALVATAGGIO AUTOMATICO VALORI TIMER ---
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
        lang: lang, // Passiamo la lingua al timer
      },
    });
  };

  return (
    <BackgroundView>
      <View style={{ paddingTop: insets.top, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerTitles}>
            <Text style={styles.title}>{t.app_title}</Text>
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Settingsbutton width={30} height={30} />
            </TouchableOpacity>
          </View>

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

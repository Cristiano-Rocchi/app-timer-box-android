import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";

import Pausebutton from "../assets/icons/Pause.svg";
import Playbutton from "../assets/icons/Play.svg";
import AlertExit from "../components/alertExit";
import BackgroundView from "../components/BackgroundView";
import LogicPretimer from "../components/LogicPretimer";
import LogicTimer from "../components/LogicTimer";
import { Colors } from "../constants/Colors";
import { styles } from "../constants/styleTimer";
import { translations } from "../constants/translations";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TimerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // --- RECUPERO LINGUA DAI PARAMETRI ---
  // Se per qualche motivo non arriva, usiamo "eng" come fallback
  const lang = params.lang || "eng";
  const t = translations[lang] || translations["eng"];

  const [phase, setPhase] = useState("PREPARING");
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wasPausedBeforeAlert, setWasPausedBeforeAlert] = useState(false);

  // --- STATI IMPOSTAZIONI ---
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  const totalRounds = parseInt(params.rounds);
  const workTime = parseInt(params.workTime);
  const restTime = parseInt(params.restTime);

  // --- CARICAMENTO IMPOSTAZIONI ---
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedData = await AsyncStorage.getItem("@app_settings");
        if (savedData !== null) {
          const parsed = JSON.parse(savedData);
          setIsSoundEnabled(parsed.sound);
          setIsVibrationEnabled(parsed.vibration);
          // Nota: la lingua la prendiamo dai params per coerenza con la navigazione,
          // ma potresti anche caricarla da qui se preferisci.
        }
      } catch (e) {
        console.log("Errore lettura impostazioni:", e);
      } finally {
        setIsLoadingSettings(false);
      }
    };
    loadSettings();
  }, []);

  const handleBackAttempt = () => {
    if (phase === "FINISHED" || phase === "PREPARING") {
      router.replace("/");
    } else {
      setWasPausedBeforeAlert(isPaused);
      setIsPaused(true);
      setShowAlert(true);
    }
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackAttempt();
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
      return () => backHandler.remove();
    }, [phase, isPaused]),
  );

  const handlePreTimerFinish = () => {
    setPhase("WORKOUT");
  };

  const handleRoundComplete = () => {
    if (currentRound >= totalRounds) {
      setPhase("FINISHED");
    } else {
      setCurrentRound((prev) => prev + 1);
    }
  };

  if (isLoadingSettings) {
    return <BackgroundView />;
  }

  return (
    <BackgroundView>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <AlertExit
          visible={showAlert}
          lang={lang} // Passiamo la lingua all'alert
          onConfirm={() => router.replace("/")}
          onCancel={() => {
            setShowAlert(false);
            if (!wasPausedBeforeAlert) setIsPaused(false);
          }}
        />

        <View style={styles.headerTitles}>
          <TouchableOpacity onPress={handleBackAttempt}>
            <Text style={styles.title}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{t.training_title}</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.Content}>
          {phase === "PREPARING" && (
            <LogicPretimer
              onFinish={handlePreTimerFinish}
              lang={lang} // Passiamo la lingua
              isSoundEnabled={isSoundEnabled}
              isVibrationEnabled={isVibrationEnabled}
            />
          )}

          {phase === "WORKOUT" && (
            <LogicTimer
              workTime={workTime}
              restTime={restTime}
              isPaused={isPaused}
              onRoundComplete={handleRoundComplete}
              currentRound={currentRound}
              totalRounds={totalRounds}
              lang={lang} // Passiamo la lingua
              isSoundEnabled={isSoundEnabled}
              isVibrationEnabled={isVibrationEnabled}
            />
          )}

          {phase === "FINISHED" && (
            <View style={styles.preTimerContent}>
              <Text style={styles.countdownNumber}>{t.finish_state}</Text>
              <Text style={styles.prepareText}>{t.great_job}</Text>
            </View>
          )}

          <View style={styles.ButtonsContainer}>
            {phase === "WORKOUT" && (
              <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
                {isPaused ? (
                  <Playbutton width={100} height={100} />
                ) : (
                  <Pausebutton width={100} height={100} />
                )}
              </TouchableOpacity>
            )}

            {phase === "FINISHED" && (
              <TouchableOpacity
                style={[styles.buttonPrimary, { marginTop: 20 }]}
                onPress={() => router.replace("/")}
              >
                <Text
                  style={[
                    styles.playPauseButton,
                    {
                      backgroundColor: Colors.primary,
                      fontSize: 20,
                      padding: 12, // Un po' più di spazio
                      borderRadius: 8,
                      overflow: "hidden", // Per i bordi su iOS
                    },
                  ]}
                >
                  {t.back_home}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </BackgroundView>
  );
}

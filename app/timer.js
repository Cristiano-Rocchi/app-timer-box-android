import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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

  // Gestione Lingua (Per ora fissa, poi la prenderemo da params o storage)
  const lang = "jp";
  const t = translations[lang];

  const [phase, setPhase] = useState("PREPARING");
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wasPausedBeforeAlert, setWasPausedBeforeAlert] = useState(false);

  const totalRounds = parseInt(params.rounds);
  const workTime = parseInt(params.workTime);
  const restTime = parseInt(params.restTime);

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

  return (
    <BackgroundView>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <AlertExit
          visible={showAlert}
          lang={lang}
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
          {/* TRADOTTO: ALLENAMENTO */}
          <Text style={styles.title}>{t.training_title}</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.Content}>
          {phase === "PREPARING" && (
            <LogicPretimer onFinish={handlePreTimerFinish} lang={lang} />
          )}

          {phase === "WORKOUT" && (
            <LogicTimer
              workTime={workTime}
              restTime={restTime}
              isPaused={isPaused}
              onRoundComplete={handleRoundComplete}
              currentRound={currentRound}
              totalRounds={totalRounds}
              lang={lang} // PASSIAMO LA LINGUA AL COMPONENTE LOGIC
            />
          )}

          {phase === "FINISHED" && (
            <View style={styles.preTimerContent}>
              {/* TRADOTTO: FINE e OTTIMO LAVORO */}
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
                      padding: 8,
                      borderRadius: 8,
                    },
                  ]}
                >
                  {/* TRADOTTO: TORNA ALLA HOME */}
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

import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native"; // Aggiungi BackHandler
import Pausebutton from "../assets/icons/Pause.svg";
import Playbutton from "../assets/icons/Play.svg";
import AlertExit from "../components/alertExit";
import BackgroundView from "../components/BackgroundView";
import LogicPretimer from "../components/LogicPretimer";
import LogicTimer from "../components/LogicTimer";
import { styles } from "../constants/styleTimer";

export default function TimerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Fasi dell'app: 'PREPARING' | 'WORKOUT' | 'FINISHED'
  const [phase, setPhase] = useState("PREPARING");
  const [currentRound, setCurrentRound] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [wasPausedBeforeAlert, setWasPausedBeforeAlert] = useState(false);

  const totalRounds = parseInt(params.rounds);
  const workTime = parseInt(params.workTime);
  const restTime = parseInt(params.restTime);

  // Funzione per gestire il tentativo di uscita
  // Funzione per gestire il tentativo di uscita
  const handleBackAttempt = () => {
    // Se l'allenamento è FINITO o se siamo ancora nel PRETIMER
    if (phase === "FINISHED" || phase === "PREPARING") {
      router.replace("/"); // Torna indietro direttamente
    } else {
      // Se l'allenamento (WORKOUT) è in corso, chiedi conferma
      setWasPausedBeforeAlert(isPaused);
      setIsPaused(true);
      setShowAlert(true);
    }
    return true;
  };

  // Intercetta tasto indietro fisico (Android/Gesture)
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => handleBackAttempt();

      // Creiamo l'abbonamento
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      // Restituiamo la funzione di rimozione corretta
      return () => backHandler.remove();
    }, [phase, isPaused]),
  );

  // Funzione chiamata quando finisce il countdown "Preparati"
  const handlePreTimerFinish = () => {
    setPhase("WORKOUT");
  };

  // Funzione chiamata quando finisce un round di lavoro
  const handleRoundComplete = () => {
    // Se abbiamo completato l'ultimo round di lavoro
    if (currentRound >= totalRounds) {
      setPhase("FINISHED");
    } else {
      setCurrentRound((prev) => prev + 1);
    }
  };

  return (
    <BackgroundView>
      {/* Il tuo Alert personalizzato */}
      <AlertExit
        visible={showAlert}
        onConfirm={() => router.replace("/")}
        onCancel={() => {
          setShowAlert(false);
          if (!wasPausedBeforeAlert) setIsPaused(false); // Riprende solo se non era già in pausa
        }}
      />

      <View style={styles.headerTitles}>
        {/* Cambiato da router.back() alla nostra funzione */}
        <TouchableOpacity onPress={handleBackAttempt}>
          <Text style={styles.title}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ALLENAMENTO</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.Content}>
        {phase === "PREPARING" && (
          <LogicPretimer onFinish={handlePreTimerFinish} />
        )}

        {phase === "WORKOUT" && (
          <LogicTimer
            workTime={workTime}
            restTime={restTime}
            isPaused={isPaused}
            onRoundComplete={handleRoundComplete}
            currentRound={currentRound}
            totalRounds={totalRounds}
          />
        )}

        {phase === "FINISHED" && (
          <View style={styles.preTimerContent}>
            <Text style={styles.countdownNumber}>FINE</Text>
            <Text style={styles.prepareText}>OTTIMO LAVORO!</Text>
          </View>
        )}

        {/* Container Bottoni */}
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
                  { color: "#E2F163", fontSize: 20 },
                ]}
              >
                TORNA ALLA HOME
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BackgroundView>
  );
}

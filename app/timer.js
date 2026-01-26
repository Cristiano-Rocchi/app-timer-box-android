import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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

  const totalRounds = parseInt(params.rounds);
  const workTime = parseInt(params.workTime);
  const restTime = parseInt(params.restTime);

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
      <View style={styles.headerTitles}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.title}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {phase === "PREPARING"
            ? "PREPARATI"
            : `ROUND ${currentRound}/${totalRounds}`}
        </Text>
      </View>

      <View style={styles.Content}>
        {/* Switch tra le fasi dell'allenamento */}
        {phase === "PREPARING" && (
          <LogicPretimer onFinish={handlePreTimerFinish} />
        )}

        {phase === "WORKOUT" && (
          <LogicTimer
            workTime={workTime}
            restTime={restTime}
            isPaused={isPaused}
            onRoundComplete={handleRoundComplete}
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
              <Text style={styles.playPauseButton}>
                {isPaused ? "RIPRENDI" : "PAUSA"}
              </Text>
            </TouchableOpacity>
          )}

          {phase === "FINISHED" && (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={styles.playPauseButton}>TORNA ALLA HOME</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BackgroundView>
  );
}

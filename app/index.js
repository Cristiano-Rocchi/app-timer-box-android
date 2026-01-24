import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ProvaImg from "../assets/images/provaimg.jpg";
import { styles } from "../constants/style";
export default function SetupScreen() {
  const router = useRouter();

  // Stati per gestire i dati dell'allenamento
  const [rounds, setRounds] = useState("12");
  const [workTime, setWorkTime] = useState("180");
  const [restTime, setRestTime] = useState("60");

  const handleStart = () => {
    // Logica per navigare al timer passando i dati
    router.push({
      pathname: "/timer",
      params: { rounds, workTime, restTime },
    });
  };

  return (
    <View style={styles.container}>
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
            {/* Contenuto della Card per i Round */}

            <View style={styles.cardContent}>
              <View style={styles.cardSettings}>
                <Text style={styles.cardInfo}>INFO</Text>
                <Text style={styles.cardTimer}>00:30</Text>
                <View style={styles.cardButtons}>
                  <Text> BOTTONE- </Text>
                  <Text> BOTTONE+ </Text>
                </View>
              </View>
              <View style={styles.cardImg}>
                <Image
                  source={ProvaImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            {/* Contenuto della Card per i Round */}

            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <Text>INFO</Text>
                <Text style={styles.cardTimer}>00:30</Text>
                <View style={styles.cardButtons}>
                  <Text> BOTTONE- </Text>
                  <Text> BOTTONE+ </Text>
                </View>
              </View>
              <View style={styles.cardImg}>
                <Image
                  source={ProvaImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.card}>
            {/* Contenuto della Card per i Round */}

            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <Text>INFO</Text>
                <Text style={styles.cardTimer}>00:30</Text>
                <View style={styles.cardButtons}>
                  <Text> BOTTONE- </Text>
                  <Text> BOTTONE+ </Text>
                </View>
              </View>
              <View style={styles.cardImg}>
                <Image
                  source={ProvaImg}
                  style={styles.imageCard}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </View>

        {/* --- FINE AREA CARD SETUP --- */}

        {/* BOTTONE DI AVVIO (PLAY/START) */}
        <TouchableOpacity style={styles.buttonStart} onPress={handleStart}>
          <Text style={styles.buttonText}>INIZIA ALLENAMENTO</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* --- AREA BANNER PUBBLICITARIO --- */}
      {/* Posizionato fuori dallo ScrollView per restare fisso in fondo */}
      <View style={styles.adBannerContainer}>
        {/* Qui andrà il componente AdMob Banner */}
        <Text style={{ color: "#fff" }}>BANNER ADS QUI</Text>
      </View>
      {/* --- FINE AREA BANNER --- */}
    </View>
  );
}

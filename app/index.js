import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import Mbutton from "../assets/icons/Mbutton.svg";
import Pbutton from "../assets/icons/Pbutton.svg";
import Playbutton from "../assets/icons/Play.svg";
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
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>DURATA DEL ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>00:30</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity>
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
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
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>DURATA DEL ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>00:30</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity>
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
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
            <View style={styles.cardContent}>
              {/* CAMBIO DA cardInfo A cardSettings */}
              <View style={styles.cardSettings}>
                <Text style={styles.cardTitle}>NUMERO DI ROUND</Text>

                {/* AGGIUNTA centerGroup PER IL BLOCCO CENTRALE */}
                <View style={styles.centerGroup}>
                  <Text style={styles.cardTimer}>00:30</Text>
                  <View style={styles.cardButtons}>
                    <TouchableOpacity>
                      <Mbutton width={50} height={50} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Pbutton width={50} height={50} />
                    </TouchableOpacity>
                  </View>
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
        <View style={styles.playButton}>
          <TouchableOpacity>
            <Playbutton width={50} height={50} />
          </TouchableOpacity>
        </View>
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

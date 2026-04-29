import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Per aggiornare quando torni dalla scelta lingua
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackgroundView from "../components/BackgroundView";
import { Colors } from "../constants/Colors";
import { styles } from "../constants/styleSettings";
import { translations } from "../constants/translations"; // Importa traduzioni

// Importiamo l'icona
import ConfirmIcon from "../assets/icons/confirm.svg";

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [isSoundActive, setIsSoundActive] = useState(true);
  const [isVibrationActive, setIsVibrationActive] = useState(true);
  const [currentLang, setCurrentLang] = useState("eng");

  // Funzione di caricamento separata per poterla riusare
  const loadSettings = async () => {
    try {
      const savedData = await AsyncStorage.getItem("@app_settings");
      if (savedData !== null) {
        const parsed = JSON.parse(savedData);
        setIsSoundActive(parsed.sound);
        setIsVibrationActive(parsed.vibration);
        if (parsed.lang) setCurrentLang(parsed.lang);
      }
    } catch (e) {
      console.log("Errore caricamento impostazioni:", e);
    }
  };

  // Carica i dati quando entri nella pagina
  useEffect(() => {
    loadSettings();
  }, []);

  // AGGIORNA la lingua se torni indietro dalla pagina "Language"
  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, []),
  );

  // Scorciatoia per le traduzioni
  const t = translations[currentLang] || translations["eng"];

  // SALVATAGGIO AUTOMATICO
  useEffect(() => {
    const saveSettings = async () => {
      try {
        const dataToSave = {
          sound: isSoundActive,
          vibration: isVibrationActive,
          lang: currentLang,
        };
        await AsyncStorage.setItem("@app_settings", JSON.stringify(dataToSave));
      } catch (e) {
        console.log("Errore salvataggio impostazioni:", e);
      }
    };
    saveSettings();
  }, [isSoundActive, isVibrationActive, currentLang]);

  return (
    <BackgroundView>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>&lt; {t.back || "Back"}</Text>
          </TouchableOpacity>
          <Text style={styles.titlePage}>{t.settings_title || "SETTINGS"}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.settingsCard}>
            {/* LINGUA */}
            <Pressable
              onPress={() => router.push("/language")}
              style={({ pressed }) => [
                styles.settingRow,
                {
                  backgroundColor: pressed ? Colors.lightGrey : "transparent",
                  borderRadius: 10,
                },
              ]}
            >
              <Text style={styles.settingText}>
                {t.lang_label || "Language"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: Colors.lightGrey,
                    marginRight: 10,
                    fontSize: 16,
                  }}
                >
                  {currentLang.toUpperCase()}
                </Text>
                <Text style={{ color: Colors.lightGrey, fontSize: 18 }}>
                  &gt;
                </Text>
              </View>
            </Pressable>

            {/* SUONI */}
            <Pressable
              onPress={() => setIsSoundActive(!isSoundActive)}
              style={({ pressed }) => [
                styles.settingRow,
                {
                  backgroundColor: pressed ? Colors.lightGrey : "transparent",
                  borderRadius: 10,
                },
              ]}
            >
              <Text style={styles.settingText}>
                {t.sound_label || "Sounds"}
              </Text>
              <ConfirmIcon
                width={25}
                height={25}
                fill={isSoundActive ? Colors.primary : Colors.lightGrey}
                color={isSoundActive ? Colors.primary : Colors.lightGrey}
              />
            </Pressable>

            {/* VIBRAZIONI */}
            <Pressable
              onPress={() => setIsVibrationActive(!isVibrationActive)}
              style={({ pressed }) => [
                styles.settingRow,
                {
                  backgroundColor: pressed ? Colors.lightGrey : "transparent",
                  borderBottomWidth: 0,
                  borderRadius: 10,
                },
              ]}
            >
              <Text style={styles.settingText}>
                {t.vibration_label || "Vibrations"}
              </Text>
              <ConfirmIcon
                width={25}
                height={25}
                fill={isVibrationActive ? Colors.primary : Colors.lightGrey}
                color={isVibrationActive ? Colors.primary : Colors.lightGrey}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </BackgroundView>
  );
}

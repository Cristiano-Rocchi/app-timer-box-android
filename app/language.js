import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ConfirmIcon from "../assets/icons/confirm.svg";
import BackgroundView from "../components/BackgroundView";
import { Colors } from "../constants/Colors";
import { styles } from "../constants/styleSettings"; // Riutilizziamo gli stessi stili

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentLang, setCurrentLang] = useState("eng");

  // Lista delle lingue supportate
  const languages = [
    { id: "ita", label: "Italiano" },
    { id: "eng", label: "English" },
    { id: "esp", label: "Español" },
    { id: "pt", label: "Português" },
    { id: "fr", label: "Français" },
    { id: "de", label: "Deutsch" },
    { id: "jp", label: "日本語" },
    { id: "ru", label: "Русский" },
  ];

  useEffect(() => {
    const loadLang = async () => {
      const savedData = await AsyncStorage.getItem("@app_settings");
      if (savedData) {
        const { lang } = JSON.parse(savedData);
        if (lang) setCurrentLang(lang);
      }
    };
    loadLang();
  }, []);

  const selectLanguage = async (langId) => {
    setCurrentLang(langId);
    try {
      const savedData = await AsyncStorage.getItem("@app_settings");
      let newData = savedData ? JSON.parse(savedData) : {};
      newData.lang = langId; // Aggiorniamo solo la lingua
      await AsyncStorage.setItem("@app_settings", JSON.stringify(newData));

      // Opzionale: torna indietro dopo la selezione
      setTimeout(() => router.back(), 300);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BackgroundView>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>&lt; Torna indietro</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.settingsCard}>
            {languages.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => selectLanguage(item.id)}
                style={({ pressed }) => [
                  styles.settingRow,
                  {
                    backgroundColor: pressed ? Colors.lightGrey : "transparent",
                    borderBottomWidth: index === languages.length - 1 ? 0 : 1,
                    borderRadius: 10,
                  },
                ]}
              >
                <Text style={styles.settingText}>{item.label}</Text>
                {currentLang === item.id && (
                  <ConfirmIcon width={20} height={20} fill={Colors.primary} />
                )}
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </BackgroundView>
  );
}

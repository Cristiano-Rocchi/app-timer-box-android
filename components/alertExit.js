import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { translations } from "../constants/translations"; // IMPORTA TRADUZIONI

export default function AlertExit({ visible, onConfirm, onCancel, lang }) {
  // Recuperiamo le traduzioni (con fallback su italiano)
  const t = translations[lang] || translations["ita"];

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* TRADOTTO: ATTENZIONE */}
          <Text style={styles.title}>{t.exit_title}</Text>

          {/* TRADOTTO: Vuoi davvero lasciare l'allenamento? */}
          <Text style={styles.message}>{t.exit_message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              {/* TRADOTTO: SI */}
              <Text style={[styles.buttonText, { color: Colors.primary }]}>
                {t.yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onCancel}>
              {/* TRADOTTO: NO */}
              <Text style={[styles.buttonText, { color: Colors.primary }]}>
                {t.no}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    width: "80%",
    backgroundColor: "#1A1A1A",
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

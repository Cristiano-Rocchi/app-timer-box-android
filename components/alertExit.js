import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AlertExit({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>ATTENZIONE</Text>
          <Text style={styles.message}>
            Vuoi davvero lasciare l'allenamento?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={[styles.buttonText, { color: "#E2F163" }]}>SI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={[styles.buttonText, { color: "#E2F163" }]}>NO</Text>
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
    backgroundColor: "rgba(0,0,0,0.8)", // Sfondo semitrasparente scuro
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    width: "80%",
    backgroundColor: "#1A1A1A", // Grigio molto scuro
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2F163",
    alignItems: "center",
  },
  title: {
    color: "#E2F163",
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

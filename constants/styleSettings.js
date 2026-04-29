import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    gap: 15,
  },
  backText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  titlePage: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  settingsCard: {
    width: "80%",
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 20,
    gap: 15,
  },
  // NUOVO: Stile per la riga con testo + icona
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Spinge testo a sinistra e icona a destra
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  settingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});

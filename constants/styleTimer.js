import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.secondary,
  },
  Content: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  preTimerContent: {
    backgroundColor: Colors.secondary,
    width: 350,
    height: 350,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownNumber: {
    fontSize: 92,
  },
  prepareText: {
    fontSize: 24,
    marginTop: 20,
    letterSpacing: 2,
    paddingTop: 10,
    borderTopColor: Colors.background,
    borderTopWidth: 3,
  },
  ButtonsContainer: {},
});

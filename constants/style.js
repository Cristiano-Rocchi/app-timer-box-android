import { StyleSheet } from "react-native";

// 1. Sfondo generale
// 2. Contenuto scrollabile
// 3. Titoli e impostazioni
// 4. Cards

export const styles = StyleSheet.create({
  container: {
    // 1.SFONDO GENERALE
    padding: 36,
  },
  scrollContainer: {
    // 2. CONTENUTO SCROLLABILE
  },
  headerTitles: {
    // 3. TIOLI E IMPOSTAZIONI
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    // Stile per il testo TITOLO
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF0000",
  },
  card: {
    // 4. CARDS
    flexDirection: "row",
    alignItems: "center",
  },
  cardImg: {
    //immagine
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCard: {
    width: 50,
    height: 50,
  },
  cardContent: {
    //contenuto della card
    flex: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStart: {
    // Il rettangolo del bottone
  },
  buttonText: {
    // Il testo dentro il bottone
  },
  adBannerContainer: {
    // Lo spazio fisso in fondo per la pubblicità
  },
});

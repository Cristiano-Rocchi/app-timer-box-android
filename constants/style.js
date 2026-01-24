import { StyleSheet } from "react-native";

// 1. Sfondo generale
// 2. Contenuto scrollabile
// 3. Titoli e impostazioni
// 4. Cards

export const styles = StyleSheet.create({
  container: {
    // 1.SFONDO GENERALE
    paddingHorizontal: 15,
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
  }, // 4. CARDS
  cards: {
    flex: 1, // Il contenitore occupa tutto lo spazio centrale
    flexDirection: "column",
    justifyContent: "space-between",
  },
  card: {
    flex: 1, // Ogni card si spartisce lo spazio in parti uguali

    width: "100%",
    marginVertical: 5, // Un po' di distacco tra loro
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  cardImg: {
    flex: 1,
    alignItems: "center",
  },
  imageCard: {
    //immagine
    width: 100,
    height: "100%",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardSettings: {
    flex: 9,
  },
  cardInfo: {},

  cardTimer: {
    // area timer
    fontFamily: "monospace",
    fontSize: 50,
    textAlign: "center",

    fontVariant: ["tabular-nums"],
  },

  cardButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
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

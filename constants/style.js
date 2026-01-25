import { StyleSheet } from "react-native";

// 1. Sfondo generale
// 2. Contenuto scrollabile
// 3. Titoli e impostazioni
// 4. Cards

export const styles = StyleSheet.create({
  container: {
    // 1.SFONDO GENERALE
    paddingHorizontal: 15,
    paddingVertical: 20,
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
    fontSize: 22,
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
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
  },
  cardImg: {
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imageCard: {
    //immagine
    width: 80,
    height: "100%",
  },
  cardContent: {
    flexDirection: "row",
  },
  cardSettings: {
    flex: 8,
    paddingVertical: 5,
  },
  cardTitle: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 14,
  },

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
    gap: 40,
    marginTop: 5,
  },
  playButton: {
    alignItems: "center",
    marginVertical: 20,
  },
  cardRoundSettings: {
    display: "flex",
  },
  adBannerContainer: {
    // Lo spazio fisso in fondo per la pubblicità
  },
});

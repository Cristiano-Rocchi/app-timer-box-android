import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
// 1. Sfondo generale
// 2. Contenuto scrollabile
// 3. Titoli e impostazioni
// 4. Cards

export const styles = StyleSheet.create({
  container: {
    // 1.SFONDO GENERALE
  },
  scrollContainer: {
    // 2. CONTENUTO SCROLLABILE
    gap: 25,
  },
  BackgroundImg: {
    width: "100%", // Occupa tutta la larghezza
    height: "100%", // Occupa tutta l'altezza
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    color: Colors.primary,
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
    backgroundColor: Colors.secondary,
    paddingVertical: 5,
    borderRadius: 15,
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
    backgroundColor: Colors.background,
    color: Colors.secondary,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },

  cardTimer: {
    // area timer
    fontFamily: "monospace",
    fontSize: 45,
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
  durataTotale: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  durataText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  durataTime: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: Colors.secondary,
    color: "#000000",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  adBannerContainer: {
    // Lo spazio fisso in fondo per la pubblicità
  },
});

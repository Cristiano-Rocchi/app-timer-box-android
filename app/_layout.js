import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      {/* Imposta la barra di stato del telefono (batteria, ora) su uno stile chiaro per sfondo scuro */}
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          // Nascondiamo l'header per un look "full screen" professionale
          headerShown: false,
          // Colore di sfondo di tutte le schermate
          contentStyle: { backgroundColor: "#121212" },
        }}
      >
        {/* La prima pagina che Expo caricherà è index.js */}
        <Stack.Screen name="index" />
        {/* La pagina del timer */}
        <Stack.Screen name="timer" />
      </Stack>
    </>
  );
}

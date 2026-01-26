import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, View } from "react-native";
import BackgroundImg from "../assets/images/background.png";

export default function BackgroundView({ children }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ImageBackground
        source={BackgroundImg}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#000000eb", "#000000b6", "#000000af", "#0000008c"]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />
        {children}
      </ImageBackground>
    </View>
  );
}

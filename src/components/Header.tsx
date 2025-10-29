import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles/Header";
import { useFonts, AmaticSC_400Regular, AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";


export default function Header() {
  const [fontsLoaded] = useFonts({ AmaticSC_400Regular, AmaticSC_700Bold });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.topRow}>
          <Image
            source={require("../assets/SmartClubLogo.png")}
            style={styles.smartLogo}
            resizeMode="contain"
          />
          <View style={styles.amountBubble}>
            <Text style={styles.amountText}>0.00€</Text>
          </View>
        </View>
        <Text style={styles.hello}>Bonjour Christian !</Text>
      </View>

      <View style={styles.right}>
        <Image
          source={require("../assets/Carrefour.png")}
          style={styles.carrefourLogo}
          resizeMode="contain"
        />
        <Text style={styles.region}>Martinique</Text>
      </View>
    </View>
  );
}

import React from "react";
import { StyleSheet, StatusBar, View, Text, Animated, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./src/components/Header";
import BottomBar from "./src/components/BottomBar";
import NewsCarousel from "./src/components/NewsCarousel";
import { fetchNews } from "./src/api/news";
import { useFonts, AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";

export default function App() {
  const [fontsLoaded] = useFonts({ AmaticSC_700Bold });
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Header />
          <NewsCarousel fetchNews={fetchNews} />
          <Text style={styles.catalogues}>CATALOGUES</Text>
          <Pressable
            onPress={() => {}}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.clubTouchable}
          >
            <Animated.Image
              source={require("./src/assets/SmartClubRond.png")}
              style={[styles.clubIcon, { transform: [{ scale }] }]}
            />
          </Pressable>
          <BottomBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, backgroundColor: "#ffffff", position: "relative" },
  catalogues: {
    fontFamily: "AmaticSC_700Bold",
    color: "#254f9a",
    fontSize: 36,
    textAlign: "center",
    marginVertical: 20,
  },
  clubTouchable: {
    position: "absolute",
    right: 16,
    bottom: 70,
    zIndex: 20,
  },
  clubIcon: {
    width: 80,
    height: 80,
  },
});

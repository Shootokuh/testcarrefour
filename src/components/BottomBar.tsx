import React, { useState } from "react";
import { View, Text, Image, Pressable, Platform } from "react-native";
import { useFonts, AmaticSC_400Regular, AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";
import styles from "../styles/BottomBar";

type TabKey = "accueil" | "promos" | "smart club" | "listes" | "drive" | "profil";

export default function BottomBar() {
  const [active, setActive] = useState<TabKey>("accueil");

  const [fontsLoaded] = useFonts({
    AmaticSC_400Regular,
    AmaticSC_700Bold,
  });

  const regular = fontsLoaded ? "AmaticSC_400Regular" : Platform.select({ ios: "Arial", android: "sans-serif" });
  const bold    = fontsLoaded ? "AmaticSC_700Bold"    : Platform.select({ ios: "Arial", android: "sans-serif" });

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: "accueil",       label: "ACCUEIL",       icon: require("../assets/Accueil.png") },
    { key: "promos",      label: "PROMOS",      icon: require("../assets/promos.png") },
    { key: "smart club",  label: "SMART CLUB",  icon: require("../assets/smartclub.png") },
    { key: "listes",      label: "LISTES",      icon: require("../assets/listes.png") },
    { key: "drive",      label: "DRIVE",      icon: require("../assets/drive.png") },
    { key: "profil",     label: "PROFIL",     icon: require("../assets/profil.png") },
  ];

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {tabs.map((t) => {
          const selected = active === t.key;
          return (
            <Pressable key={t.key} onPress={() => setActive(t.key)} style={styles.item}>
              <View style={[styles.itemInner, selected && styles.itemInnerActive]}>
                <Image
                  source={t.icon}
                  style={[styles.icon, t.key === "smart club" && styles.iconSmartClub]}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  style={[
                    styles.label,
                    { fontFamily: selected ? bold : regular },
                    selected ? styles.labelActive : styles.labelInactive,
                  ]}
                >
                  {t.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

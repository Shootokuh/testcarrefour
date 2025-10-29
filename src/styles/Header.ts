import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    alignItems: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  smartLogo: {
    width: 64,
    height: 64,
    marginRight: -1,
    marginTop: 2, 
  },
  amountBubble: {
    backgroundColor: "#ce0f69",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 10,
    marginTop: 8,
  },
  amountText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  hello: {
    marginTop: -6,
    marginLeft: 2,
    color: "#ce0f69",
    fontSize: 12,
    fontWeight: "600",
  },
  right: {
    alignItems: "center",
  },
  carrefourLogo: {
    width: 64,
    height: 64,
  },
  region: {
    color: "#c20016",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
    marginTop: -6,
  },
});

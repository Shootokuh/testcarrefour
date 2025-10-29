import { StyleSheet } from "react-native";

const H_PADDING = 16;

export const styles = StyleSheet.create({
  carouselWrapper: {
    paddingHorizontal: H_PADDING,
    marginTop: 5,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  heroBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#FFFFFF",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  dot: { width: 6, height: 6, borderRadius: 6, marginHorizontal: 4 },
  dotActive: { backgroundColor: "#9B9BA6", width: 10, borderRadius: 5 },
  dotInactive: { backgroundColor: "#D8D8DE" },
});

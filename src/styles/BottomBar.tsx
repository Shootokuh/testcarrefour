import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eceff4",
    paddingTop: 3,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  item: {
    width: "17%",
    alignItems: "center",
  },
  itemInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 14,
    minWidth: 68,
  },
  itemInnerActive: { backgroundColor: "#f6dce7" },
  icon: { width: 35, height: 35 },
  iconSmartClub: { width: 45, height: 35 },
  label: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.3,
    textAlign: "center",
    includeFontPadding: false,
    flexWrap: "nowrap",
  },
  labelInactive: { color: "#1f4f8f" },
  labelActive: { color: "#ce0f69", fontWeight: "700" },
});

export default styles;

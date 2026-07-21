import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  containerData: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginVertical: 12,
  },
  dateText: {
    color: colors.gray[100],
    fontSize: 20,
    fontWeight: "bold",
  },
});
import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  centerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  centerSubtext: {
    color: colors.gray[400],
    fontSize: 11,
    fontWeight: "500",
  },
  centerText: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 2,
  },
  centerCategoryCount: {
    color: colors.gray[400],
    fontSize: 10,
  },
});
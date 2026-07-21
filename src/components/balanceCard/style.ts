import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    borderRadius: 20,
    padding: 28,
    marginVertical: 15,
    marginHorizontal: 5,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: colors.gray[500],
  },
  label: {
    color: colors.gray[400],
    fontSize: 14,
    marginBottom: 4,
    //borderWidth: 2,
    //borderColor: "red",
  },

  balanceText: {
    color: colors.green[300],
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    //borderWidth: 2,
    //borderColor: "red",
  },

  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //borderWidth: 2,
    //borderColor: "red",
  },

  summaryItem: {
    flex: 1,
  },

  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },

  summaryLabel: {
    color: colors.gray[400],
    fontSize: 12,
  },

  incomeText: {
    color: colors.green[300],
    fontSize: 16,
    fontWeight: "600",
  },

  expenseText: {
    color: colors.red[200],
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.blue[500],
    marginHorizontal: 15,
  },
});
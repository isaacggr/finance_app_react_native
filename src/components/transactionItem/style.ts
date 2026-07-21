import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray[800],
        borderRadius: 20,
        padding: 16,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        borderWidth: 1,
        borderColor: colors.gray[500],
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
        
    },
    incomeIconBg: {
        backgroundColor: colors.green[100_15],
    },
    expenseIconBg: {
        backgroundColor: colors.red[200_15],
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        color: colors.gray[100],
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    subInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    category: {
        color: colors.gray[500],
        fontSize: 13,
    },
    tag: {
        backgroundColor: colors.blue[500],
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    tagText: {
        color: colors.blue[200],
        fontSize: 10,
        fontWeight: "bold",
    },
    amount: {
        fontSize: 15,
        fontWeight: "bold",
    },
    incomeText: {
        color: colors.green[100],
    },
    expenseText: {
        color: colors.red[200],
    },
});
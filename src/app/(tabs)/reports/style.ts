import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.gray[850],
    },
    header: {
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: colors.gray[100],
        fontSize: 20,
        fontWeight: "bold",
    },
    monthSelector: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginVertical: 12,
    },
    monthText: {
        color: colors.gray[100],
        fontSize: 16,
        fontWeight: "bold",
    },
    card: {
        backgroundColor: colors.blue[500],
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.gray[500],
    },
    cardTitle: {
        color: colors.gray[100],
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    cardSubtitle: {
        color: colors.gray[400],
        fontSize: 13,
        marginTop: 2,
        marginBottom: 16,
    },
    categoryItem: {
        marginBottom: 14,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    categoryNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    categoryName: {
        color: colors.gray[100],
        fontSize: 14,
        fontWeight: "500",
    },
    categoryValueGroup: {
        alignItems: "flex-end",
    },
    categoryAmount: {
        color: colors.gray[100],
        fontSize: 14,
        fontWeight: "bold",
    },
    categoryPercentage: {
        color: colors.gray[400],
        fontSize: 11,
    },
    progressBg: {
        height: 8,
        backgroundColor: colors.gray[1000],
        borderRadius: 4,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 4,
    },
    exportButton: {
        backgroundColor: colors.blue[300],
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        gap: 10,
        marginTop: 8,
    },
    exportButtonText: {
        color: colors.gray[100],
        fontWeight: "bold",
        fontSize: 15,
    },
    emptyText: {
        color: colors.gray[400],
        textAlign: "center",
        paddingVertical: 20,
        fontSize: 14,
    },
    
});
import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray[850],
        padding: 15,
    },
    header: {
        paddingVertical: 16,
    },
    headerTitle: {
        color: colors.gray[100],
        fontSize: 20,
        fontWeight: "bold",
    },
    summaryCard: {
        backgroundColor: colors.blue[500],
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.gray[500],
    },
    summaryTitle: {
        color: colors.gray[400],
        fontSize: 13,
    },
    summaryAmount: {
        color: colors.gray[100],
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 4,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: colors.blue[400],
        borderRadius: 4,
        marginVertical: 8,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: colors.red[200],
        borderRadius: 4,
    },
    progressText: {
        color: colors.gray[400],
        fontSize: 12,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: colors.blue[400],
        marginVertical: 12,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subTitle: {
        color: colors.gray[400],
        fontSize: 12,
    },
    subAmount: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 2,
    },
    filterContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
    },
    filterChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.blue[500],
    },
    filterChipActive: {
        backgroundColor: colors.blue[300],
    },
    filterText: {
        color: colors.gray[400],
        fontSize: 13,
    },
    filterTextActive: {
        color: colors.gray[100],
        fontWeight: "bold",
    },

    /* 🪟 ESTILOS DO MODAL COM KEYBOARD AVOIDING */
    modalOverlay: {
        flex: 1,
        backgroundColor: colors.gray[1000],
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    modalContent: {
        width: "100%",
        backgroundColor: colors.blue[500],
        borderRadius: 20,
        padding: 20,
        maxHeight: "80%",
        borderWidth: 1,
        borderColor: colors.gray[500],
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        color: colors.gray[100],
        fontSize: 18,
        fontWeight: "bold",
    },
    modalLabel: {
        color: colors.gray[400],
        fontSize: 12,
        marginTop: 12,
        marginBottom: 4,
    },
    modalInput: {
        backgroundColor: colors.blue[600],
        color: colors.gray[100],
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
    },
    monthControls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.blue[600],
        borderRadius: 8,
        padding: 8,
        marginTop: 4,
    },
    monthButton: {
        backgroundColor: colors.blue[500],
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    monthValue: {
        color: colors.gray[100],
        fontSize: 14,
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: colors.blue[300],
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 12,
    },
    saveButtonText: {
        color: colors.gray[100],
        fontWeight: "bold",
        fontSize: 15,
    },
});
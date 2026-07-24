import { StyleSheet } from "react-native"

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    home: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.gray[850],
    },

    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
    },

    logo: {
        height: 39,
        width: 40,
    },

    containerData: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginVertical: 15,
        // borderWidth: 2,
        // borderColor: "red",
    },
    dateText: {
        color: colors.gray[100],
        fontSize: 18,
        fontWeight: "bold",
    },
});
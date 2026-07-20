import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "@/app/(tabs)/style"
import { colors } from "@/styles/colors";

interface MonthSelectorProps {
    currentDate: Date;
    onChangeDate: (newDate: Date) => void;
}

export function MonthSelector({ currentDate, onChangeDate }: MonthSelectorProps) {


    const handlePreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        onChangeDate(newDate);
    };


    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        onChangeDate(newDate);
    };


    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric",
    }).format(currentDate);


    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    return (
        <View style={styles.containerData}>
            <TouchableOpacity onPress={handlePreviousMonth} hitSlop={10}>
                <FontAwesome5 name="chevron-left" size={20} color={colors.green[300]} />
            </TouchableOpacity>

            <Text style={styles.dateText}>{capitalizedDate}</Text>

            <TouchableOpacity onPress={handleNextMonth} hitSlop={10}>
                <FontAwesome5 name="chevron-right" size={20} color={colors.green[300]} />
            </TouchableOpacity>
        </View>
    );
};
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"

import { MonthSelector } from "@/components/monthSelector";
import { styles } from "./style"
import { colors } from "@/styles/colors";

export default function Home() {
    
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />

                <TouchableOpacity activeOpacity={0.8}>
                    <FontAwesome5 name="user-circle" size={35} color={colors.gray[400]} />
                </TouchableOpacity>
            </View>

            
            <MonthSelector
                currentDate={selectedDate}
                onChangeDate={(newDate) => setSelectedDate(newDate)}
            />

            
        </SafeAreaView>
    );
}


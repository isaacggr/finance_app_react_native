import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, FlatList, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { MonthSelector } from "@/components/monthSelector";
import { BalanceCard } from "@/components/balanceCard";
import { TransactionItem, Transaction } from "@/components/transactionItem";
import { styles } from "./style";
import { colors } from "@/styles/colors";

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [financialData, setFinancialData] = useState({
        balance: 140.0,
        incomes: 3000.0,
        expenses: 2860.0,
    });

    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: "1",
            title: "Salário",
            category: "Trabalho",
            amount: 5200,
            type: "income",
            iconName: "briefcase",
        },
        {
            id: "2",
            title: "Aluguel",
            category: "Moradia",
            amount: 1800,
            type: "expense",
            iconName: "home",
            tag: "Fixa",
        },
        {
            id: "3",
            title: "Streaming 1",
            category: "Assinaturas",
            amount: 60,
            type: "expense",
            iconName: "tv",
            tag: "Fixa até 12/26",
        },
        {
            id: "4",
            title: "Streaming 2",
            category: "Assinaturas",
            amount: 60,
            type: "expense",
            iconName: "tv",
            tag: "Fixa até 12/26",
        },
        {
            id: "5",
            title: "Streaming 3",
            category: "Assinaturas",
            amount: 60,
            type: "expense",
            iconName: "tv",
            tag: "Fixa até 12/26",
        },
        {
            id: "6",
            title: "Streaming 4",
            category: "Assinaturas",
            amount: 60,
            type: "expense",
            iconName: "tv",
            tag: "Fixa até 12/26",
        },
    ]);

    return (
        <SafeAreaView style={[styles.home, { flex: 1 }]}>
            {/* 📌 SEÇÃO FIXA (Fica parada no topo) */}
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

            <BalanceCard
                balance={financialData.balance}
                incomes={financialData.incomes}
                expenses={financialData.expenses}
            />

            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold", marginVertical: 12, paddingHorizontal: 10 }}>
                Lançamentos
            </Text>

            {/* 📜 SEÇÃO ROLÁVEL (Apenas os itens rolam aqui) */}
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TransactionItem data={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 55 }}
                style={{ flex: 1 }} // Garante que a lista ocupe todo o resto da tela
            />
        </SafeAreaView>
    );
}
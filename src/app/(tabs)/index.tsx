import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, FlatList, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { MonthSelector } from "@/components/monthSelector";
import { BalanceCard } from "@/components/balanceCard";
import { TransactionItem } from "@/components/transactionItem";
import { useTransactions } from "@/context/TransactionContext";
import { styles } from "../../styles/home";
import { colors } from "@/styles/colors";

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Extraímos deleteTransaction do contexto
  const { transactions, deleteTransaction } = useTransactions();

  // Função para navegar até a aba de Perfil
  const handleOpenProfile = () => {
    router.push("/(tabs)/profile");
  };

  // 1. Filtra as transações comparando o Mês e Ano selecionados de forma segura (DD/MM/YYYY e ISO)
  const filteredTransactions = transactions.filter((item) => {
    if (!item.startDate) return false;

    // Formato DD/MM/YYYY
    if (item.startDate.includes("/")) {
      const parts = item.startDate.split("/");
      if (parts.length === 3) {
        const itemMonth = parseInt(parts[1], 10) - 1; // Mês no JS vai de 0 a 11
        const itemYear = parseInt(parts[2], 10);

        return (
          itemMonth === selectedDate.getMonth() &&
          itemYear === selectedDate.getFullYear()
        );
      }
    }

    // Formato YYYY-MM-DD (ISO)
    if (item.startDate.includes("-")) {
      const parts = item.startDate.split("-");
      if (parts.length >= 2) {
        const itemYear = parseInt(parts[0], 10);
        const itemMonth = parseInt(parts[1], 10) - 1;

        return (
          itemMonth === selectedDate.getMonth() &&
          itemYear === selectedDate.getFullYear()
        );
      }
    }

    return false;
  });

  // 2. Calcula as receitas do mês filtrado
  const incomes = filteredTransactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  // 3. Calcula as despesas do mês filtrado
  const expenses = filteredTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  // 4. Calcula o saldo do mês
  const balance = incomes - expenses;

  return (
    <SafeAreaView style={[styles.home, { flex: 1 }]}>
      {/* 📌 SEÇÃO FIXA */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenProfile}
          hitSlop={10}
        >
          <FontAwesome5
            name="user-circle"
            size={35}
            color={colors.gray[400]}
          />
        </TouchableOpacity>
      </View>

      {/* Seletor de Mês */}
      <MonthSelector
        currentDate={selectedDate}
        onChangeDate={(newDate) => setSelectedDate(newDate)}
      />

      {/* Card com os valores calculados dinamicamente para o mês */}
      <BalanceCard
        balance={balance}
        incomes={incomes}
        expenses={expenses}
      />

      <Text
        style={{
          color: colors.gray[100],
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 12,
          paddingHorizontal: 10,
        }}
      >
        Lançamentos
      </Text>

      {/* 📜 SEÇÃO ROLÁVEL - Exibe apenas as transações do mês selecionado */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            data={item}
            onDelete={deleteTransaction}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 55 }}
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={{ color: colors.gray[400], fontSize: 14 }}>
              Nenhum lançamento neste mês.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
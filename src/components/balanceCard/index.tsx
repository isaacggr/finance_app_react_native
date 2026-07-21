import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "@/styles/colors";

// Essas "Props" dizem quais dados esse componente precisa receber para desenhar na tela
interface BalanceCardProps {
  balance: number;
  incomes: number;
  expenses: number;
}

export function BalanceCard({ balance, incomes, expenses }: BalanceCardProps) {
  // Função para transformar números em formato de dinheiro (ex: 2340 -> R$ 2.340,00)
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <View style={styles.container}>
      {/* Saldo Principal */}
      <Text style={styles.label}>Saldo do mês</Text>
      <Text style={styles.balanceText}>{formatCurrency(balance)}</Text>

      {/* Receitas e Despesas */}
      <View style={styles.summaryContainer}>
        {/* Receita */}
        <View style={styles.summaryItem}>
          <View style={styles.headerItem}>
            <Feather name="arrow-up" size={15} color={colors.green[100]} />
            <Text style={styles.summaryLabel}>Receitas</Text>
          </View>
          <Text style={styles.incomeText}>{formatCurrency(incomes)}</Text>
        </View>

        {/* Divisória do meio */}
        <View style={styles.divider} />

        {/* Despesa */}
        <View style={styles.summaryItem}>
          <View style={styles.headerItem}>
            <Feather name="arrow-down" size={15} color={colors.red[200]} />
            <Text style={styles.summaryLabel}>Despesas</Text>
          </View>
          <Text style={styles.expenseText}>{formatCurrency(expenses)}</Text>
        </View>
      </View>
    </View>
  );
}
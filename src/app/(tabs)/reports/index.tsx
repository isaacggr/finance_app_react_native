import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTransactions } from "@/context/TransactionContext";
import { exportTransactionsToExcel } from "@/utils/exportPlanilha";
import { DonutChart } from "@/components/donutChart";
import { MonthSelector } from "@/components/monthSelector";
import { styles } from "./style";
import { colors } from "@/styles/colors";

export function getCategoryColor(categoryName: string): string {
  const normalizedKey = categoryName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const categoryColors = colors.category as Record<string, string>;
  return categoryColors[normalizedKey] || categoryColors.outros;
}

export default function ReportsScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();
  
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 1));

  const currentYear = selectedDate.getFullYear();

  const handleOpenProfile = () => {
    router.push("/(tabs)/profile");
  };

  const expenses = transactions.filter((item) => {
    if (item.type !== "expense") return false;

    if (item.startDate && item.startDate.includes("/")) {
      const parts = item.startDate.split("/");
      if (parts.length === 3) {
        const itemMonth = parseInt(parts[1], 10) - 1;
        const itemYear = parseInt(parts[2], 10);
        
        return itemMonth === selectedDate.getMonth() && itemYear === selectedDate.getFullYear();
      }
    }

    if (item.startDate && item.startDate.includes("-")) {
      const parts = item.startDate.split("-");
      if (parts.length >= 2) {
        const itemYear = parseInt(parts[0], 10);
        const itemMonth = parseInt(parts[1], 10) - 1;

        return itemMonth === selectedDate.getMonth() && itemYear === selectedDate.getFullYear();
      }
    }

    return false;
  });

  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);

  const categoryTotals = expenses.reduce((acc, item) => {
    const catName = item.category || "Outros";
    acc[catName] = (acc[catName] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryList = Object.keys(categoryTotals)
    .map((category) => {
      const amount = categoryTotals[category];
      const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
      const color = getCategoryColor(category);
      return { category, amount, percentage, color };
    })
    .sort((a, b) => b.amount - a.amount);

  const chartColors = categoryList.map((item) => item.color);

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleExport = () => {
    if (transactions.length === 0) {
      Alert.alert("Atenção", "Não há transações para exportar.");
      return;
    }
    exportTransactionsToExcel(transactions, currentYear);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Relatórios e Análises</Text>

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

        {/* 📅 SELETOR DE MÊS */}
        <MonthSelector
          currentDate={selectedDate}
          onChangeDate={setSelectedDate}
        />

        {/* CARD DE DESPESAS POR CATEGORIA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Despesas por Categoria</Text>

          {categoryList.length > 0 ? (
            <>
              {/* 📊 GRÁFICO DE ROSCA SVG */}
              <DonutChart
                data={categoryList}
                colors={chartColors}
                totalAmount={totalExpense}
              />

              {/* LISTA DE CATEGORIAS */}
              {categoryList.map((item) => (
                <View key={item.category} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryNameRow}>
                      <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                      <Text style={styles.categoryName}>{item.category}</Text>
                    </View>

                    <View style={styles.categoryValueGroup}>
                      <Text style={styles.categoryAmount}>
                        {formatCurrency(item.amount)}
                      </Text>
                      <Text style={styles.categoryPercentage}>
                        {item.percentage.toFixed(1)}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(item.percentage, 100)}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma despesa registrada para análise neste período.
            </Text>
          )}
        </View>

        {/* CARD DE EXPORTAÇÃO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Exportação de Dados</Text>
          <Text style={styles.cardSubtitle}>
            Baixe suas finanças em uma planilha Excel (.xlsx) organizada com abas para cada mês do ano.
          </Text>

          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <FontAwesome5 name="file-excel" size={18} color={colors.gray[100]} />
            <Text style={styles.exportButtonText}>
              Exportar Planilha Excel (.xlsx)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
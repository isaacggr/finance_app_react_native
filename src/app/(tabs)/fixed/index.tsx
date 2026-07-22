import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { TransactionItem, Transaction } from "@/components/transactionItem";
import { useTransactions } from "@/context/TransactionContext";
import { styles } from "./style";
import { colors } from "@/styles/colors";

export default function FixedScreen() {
  const { transactions, deleteTransaction, updateTransaction } = useTransactions();
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fixedTransactions = transactions.filter((item) => item.isFixed);

  const filteredList = fixedTransactions.filter((item) => {
    if (filter === "income") return item.type === "income";
    if (filter === "expense") return item.type === "expense";
    return true;
  });

  const totalFixedIncome = fixedTransactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const totalFixedExpense = fixedTransactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const percentageCommitted =
    totalFixedIncome > 0
      ? Math.min(Math.round((totalFixedExpense / totalFixedIncome) * 100), 100)
      : 0;

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const getRemainingMonthsTag = (item: Transaction) => {
    if (item.isPermanent || !item.endDate) {
      return "Fixa";
    }

    const today = new Date();
    const end = new Date(item.endDate);

    const months =
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth());

    if (months <= 0) return "Último mês";
    return `Faltam ${months} ${months === 1 ? "mês" : "meses"}`;
  };

  const handleAdjustMonths = (amountToAdd: number) => {
    if (!editingTransaction) return;

    const currentEnd = editingTransaction.endDate
      ? new Date(editingTransaction.endDate)
      : new Date();

    currentEnd.setMonth(currentEnd.getMonth() + amountToAdd);

    setEditingTransaction({
      ...editingTransaction,
      endDate: currentEnd.toISOString(),
    });
  };

  const handleSaveEdit = async () => {
    if (!editingTransaction) return;
    await updateTransaction(editingTransaction);
    setEditingTransaction(null);
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      {/* 📌 CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lançamentos Fixos</Text>
      </View>

      {/* 📊 CARD DE COMPROMETIMENTO */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Compromisso Mensal Recorrente</Text>
        <Text style={styles.summaryAmount}>
          {formatCurrency(totalFixedExpense)}
        </Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentageCommitted}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {percentageCommitted}% da renda fixa comprometida
        </Text>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.subTitle}>
              <FontAwesome5 name="arrow-up" size={12} color={colors.green[100]} /> Receitas Fixas
            </Text>
            <Text style={[styles.subAmount, { color: colors.green[100] }]}>
              {formatCurrency(totalFixedIncome)}
            </Text>
          </View>

          <View>
            <Text style={styles.subTitle}>
              <FontAwesome5 name="arrow-down" size={12} color={colors.red[200]} /> Despesas Fixas
            </Text>
            <Text style={[styles.subAmount, { color: colors.red[200] }]}>
              {formatCurrency(totalFixedExpense)}
            </Text>
          </View>
        </View>
      </View>

      {/* 🔘 FILTROS */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filter === "all" && styles.filterChipActive]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            Todos ({fixedTransactions.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === "expense" && styles.filterChipActive]}
          onPress={() => setFilter("expense")}
        >
          <Text style={[styles.filterText, filter === "expense" && styles.filterTextActive]}>
            Despesas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filter === "income" && styles.filterChipActive]}
          onPress={() => setFilter("income")}
        >
          <Text style={[styles.filterText, filter === "income" && styles.filterTextActive]}>
            Receitas
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📜 LISTA */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            data={{
              ...item,
              tag: getRemainingMonthsTag(item),
            }}
            onDelete={deleteTransaction}
            onPress={() => setEditingTransaction(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ color: colors.gray[400], fontSize: 14 }}>
              Nenhum lançamento fixo cadastrado.
            </Text>
          </View>
        )}
      />

      {/* 🪟 POP-UP */}
      <Modal
        visible={!!editingTransaction}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingTransaction(null)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Lançamento Fixo</Text>
                <TouchableOpacity onPress={() => setEditingTransaction(null)}>
                  <FontAwesome5 name="times" size={18} color={colors.gray[300]} />
                </TouchableOpacity>
              </View>

              {editingTransaction && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.modalLabel}>Título</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={editingTransaction.title}
                    onChangeText={(text) =>
                      setEditingTransaction({ ...editingTransaction, title: text })
                    }
                  />

                  <Text style={styles.modalLabel}>Valor (R$)</Text>
                  <TextInput
                    style={styles.modalInput}
                    keyboardType="numeric"
                    value={String(editingTransaction.amount)}
                    onChangeText={(text) =>
                      setEditingTransaction({
                        ...editingTransaction,
                        amount: parseFloat(text) || 0,
                      })
                    }
                  />

                  <View style={styles.switchRow}>
                    <Text style={{ color: colors.gray[100], fontSize: 14 }}>Lançamento Permanente</Text>
                    <Switch
                      value={editingTransaction.isPermanent}
                      onValueChange={(val) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          isPermanent: val,
                        })
                      }
                      trackColor={{ false: colors.blue[600], true: colors.blue[300] }}
                      thumbColor={colors.gray[100]}
                    />
                  </View>

                  {!editingTransaction.isPermanent && (
                    <View style={{ marginTop: 8 }}>
                      <Text style={styles.modalLabel}>Duração / Meses Restantes</Text>
                      <View style={styles.monthControls}>
                        <TouchableOpacity
                          style={styles.monthButton}
                          onPress={() => handleAdjustMonths(-1)}
                        >
                          <FontAwesome5 name="minus" size={12} color={colors.gray[100]} />
                        </TouchableOpacity>

                        <Text style={styles.monthValue}>
                          {getRemainingMonthsTag(editingTransaction)}
                        </Text>

                        <TouchableOpacity
                          style={styles.monthButton}
                          onPress={() => handleAdjustMonths(1)}
                        >
                          <FontAwesome5 name="plus" size={12} color={colors.gray[100]} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveEdit}
                  >
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
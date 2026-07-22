import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { MonthSelector } from "@/components/monthSelector";
import { useTransactions } from "@/context/TransactionContext";
import { styles } from "./style";
import { colors } from "@/styles/colors";

const EXPENSE_CATEGORIES = [
  { id: "1", name: "Lazer", icon: "running" },
  { id: "2", name: "Saúde", icon: "briefcase-medical" },
  { id: "3", name: "Moradia", icon: "home" },
  { id: "4", name: "Assinaturas", icon: "tv" },
  { id: "5", name: "Outras", icon: "boxes" },
];

const INCOME_CATEGORIES = [
  { id: "1", name: "Salário", icon: "briefcase" },
  { id: "2", name: "Freelance", icon: "laptop-code" },
  { id: "3", name: "Investimentos", icon: "chart-line" },
  { id: "4", name: "Outras", icon: "wallet" },
];

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();

  // Estados
  const [type, setType] = useState<"income" | "expense">("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Lazer");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFixed, setIsFixed] = useState(false);
  const [isPermanent, setIsPermanent] = useState(false);

  // Limpa o formulário
  const resetForm = () => {
    setDescription("");
    setAmount("");
    setType("expense");
    setSelectedCategory("Lazer");
    setStartDate(new Date());
    setEndDate(new Date());
    setIsFixed(false);
    setIsPermanent(false);
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    if (newType === "income") {
      setSelectedCategory(INCOME_CATEGORIES[0].name);
    } else {
      setSelectedCategory(EXPENSE_CATEGORIES[0].name);
    }
  };

  const currentCategories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSave = async () => {
    if (!description || !amount) {
      alert("Por favor, preencha a descrição e o valor.");
      return;
    }

    const numericAmount = parseFloat(amount.replace(",", "."));

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    // Busca o ícone correspondente à categoria selecionada
    const matchedCategory = currentCategories.find(
      (cat) => cat.name === selectedCategory
    );

    // Monta a tag visual se for fixo
    let tagText = undefined;
    if (isFixed) {
      tagText = isPermanent ? "Fixa" : `Fixa até ${endDate.getMonth() + 1}/${endDate.getFullYear().toString().slice(-2)}`;
    }

    await addTransaction({
      title: description,
      description,
      amount: numericAmount,
      type,
      category: selectedCategory,
      iconName: matchedCategory?.icon || "wallet",
      tag: tagText,
      startDate: startDate.toISOString(),
      isFixed,
      isPermanent: isFixed ? isPermanent : false,
      endDate: isFixed && !isPermanent ? endDate.toISOString() : null,
    });

    resetForm();
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Alternador Receita x Despesa */}
          <View style={styles.typeToggleContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "income" && styles.incomeActive,
              ]}
              onPress={() => handleTypeChange("income")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeText,
                  type === "income" && styles.typeTextActive,
                ]}
              >
                Receita
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === "expense" && styles.expenseActive,
              ]}
              onPress={() => handleTypeChange("expense")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeText,
                  type === "expense" && styles.typeTextActive,
                ]}
              >
                Despesa
              </Text>
            </TouchableOpacity>
          </View>

          {/* Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder={
                type === "income"
                  ? "Ex: Salário Empresa, Freela..."
                  : "Ex: Academia, Aluguel..."
              }
              placeholderTextColor={colors.gray[400]}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Valor */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Valor (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor={colors.gray[400]}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Categorias Dinâmicas */}
          <Text style={styles.label}>Categoria</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {currentCategories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(cat.name)}
                >
                  <FontAwesome5
                    name={cat.icon}
                    size={12}
                    color={isSelected ? colors.gray[100] : colors.gray[400]}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Mês de Início */}
          <Text style={styles.label}>Mês de Início</Text>
          <MonthSelector currentDate={startDate} onChangeDate={setStartDate} />

          {/* Switch 1: Lançamento Fixo */}
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchTitle}>Lançamento fixo</Text>
              <Text style={styles.switchSubtitle}>Repete todo mês</Text>
            </View>
            <Switch
              value={isFixed}
              onValueChange={setIsFixed}
              trackColor={{ false: colors.blue[500], true: colors.blue[300] }}
              thumbColor={colors.gray[100]}
            />
          </View>

          {/* Opções condicionais para Lançamento Fixo */}
          {isFixed && (
            <>
              {/* Switch 2: Permanente */}
              <View style={styles.switchRow}>
                <View>
                  <Text style={styles.switchTitle}>Permanente</Text>
                  <Text style={styles.switchSubtitle}>
                    Sem data prevista pra acabar
                  </Text>
                </View>
                <Switch
                  value={isPermanent}
                  onValueChange={setIsPermanent}
                  trackColor={{ false: colors.blue[500], true: colors.blue[300] }}
                  thumbColor={colors.gray[100]}
                />
              </View>

              {/* Mês de Término */}
              {!isPermanent && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.label}>Até qual mês?</Text>
                  <MonthSelector
                    currentDate={endDate}
                    onChangeDate={setEndDate}
                  />
                </View>
              )}
            </>
          )}

          {/* Botão Adicionar */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { useTransactions } from "@/context/TransactionContext";
import { styles } from "@/styles/profile";
import { colors } from "@/styles/colors";

export default function ProfileScreen() {

  const { transactions, clearAllTransactions } = useTransactions();

  const totalTransactions = transactions.length;
  
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
    
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const globalBalance = totalIncome - totalExpense;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleClearData = () => {
    Alert.alert(
      "Apagar Tudo",
      "Tem certeza que deseja apagar permanentemente todo o seu histórico financeiro cadastrado neste dispositivo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await clearAllTransactions();
              Alert.alert("Sucesso", "Todos os dados foram apagados com sucesso.");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível apagar os dados.");
            }
          } 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 👤 CABEÇALHO DO PERFIL */}
        <View style={styles.headerProfile}>
          <View style={styles.avatarContainer}>
            <FontAwesome5
              name="user-circle"
              size={80}
              color={colors.gray[400]}
            />
          </View>

          <Text style={styles.userName}>Usuário Local</Text>
          <Text style={styles.userEmail}>Dados salvos neste dispositivo</Text>
        </View>

        {/* 📊 RESUMO FINANCEIRO GERAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Geral Acumulado</Text>
          
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalTransactions}</Text>
              <Text style={styles.statLabel}>Lançamentos</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={[
                styles.statNumber, 
                { color: globalBalance >= 0 ? colors.green[300] : colors.red[200] }
              ]}>
                {formatCurrency(globalBalance)}
              </Text>
              <Text style={styles.statLabel}>Saldo Atual</Text>
            </View>
          </View>
        </View>

        {/* ⚙️ SEÇÃO 1: GERENCIAMENTO DE DADOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gerenciar Dados</Text>

          <TouchableOpacity style={styles.optionRow} onPress={handleClearData}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIconContainer, { backgroundColor: colors.red[200_15] }]}>
                <Feather name="trash-2" size={18} color={colors.red[200]} />
              </View>
              <Text style={[styles.optionText, { color: colors.red[200] }]}>
                Apagar Todo Histórico Financeiro
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>

        {/* ℹ️ SEÇÃO 2: SOBRE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>

          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Feather name="info" size={18} color={colors.green[300]} />
              </View>
              <Text style={styles.optionText}>Versão do Aplicativo</Text>
            </View>
            <Text style={styles.optionValue}>1.0.0</Text>
          </View>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
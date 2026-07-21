import React from "react";
import { View, Text } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "@/styles/colors";

// Definição da estrutura do Lançamento
export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense"; // Receita ou Despesa
  iconName: string;           // Ex: 'briefcase', 'home', 'tv'
  tag?: string;                // Ex: 'Fixa', 'Fixa até 12/26'
}

interface Props {
  data: Transaction;
}

export function TransactionItem({ data }: Props) {
  const isIncome = data.type === "income";

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <View style={styles.container}>
      {/* Ícone com Quadrado Arredondado */}
      <View style={[styles.iconContainer, isIncome ? styles.incomeIconBg : styles.expenseIconBg]}>
        <FontAwesome5 
          name={data.iconName} 
          size={18} 
          color={isIncome ? colors.green[100] : colors.red[200]} 
        />
      </View>

      {/* Detalhes do Lançamento (Título + Categoria + Tag) */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        
        <View style={styles.subInfoContainer}>
          <Text style={styles.category}>{data.category}</Text>
          
          {/* Tag opcional (ex: 'Fixa') */}
          {data.tag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.tag}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Valor */}
      <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
        {isIncome ? `+${formatCurrency(data.amount)}` : `-${formatCurrency(data.amount)}`}
      </Text>
    </View>
  );
}
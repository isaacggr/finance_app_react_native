import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "@/styles/colors";

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  iconName?: string;
  tag?: string;
  startDate?: string;
  isFixed?: boolean;
  isPermanent?: boolean;
  endDate?: string | null;
}

interface Props {
  data: Transaction;
  onDelete?: (id: string) => void;
  onPress?: () => void;
}

export function TransactionItem({ data, onDelete, onPress }: Props) {
  const [showDelete, setShowDelete] = useState(false);
  const isIncome = data.type === "income";

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleDelete = () => {
    if (!onDelete) return;

    Alert.alert(
      "Excluir Lançamento",
      `Deseja realmente excluir "${data.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(data.id),
        },
      ]
    );
  };

  const handlePressContainer = () => {
    if (onPress) {
      onPress();
    } else {
      setShowDelete(!showDelete);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePressContainer}
      style={styles.container}
    >
      <View
        style={[
          styles.iconContainer,
          isIncome ? styles.incomeIconBg : styles.expenseIconBg,
        ]}
      >
        <FontAwesome5
          name={data.iconName}
          size={18}
          color={isIncome ? colors.green[100] : colors.red[200]}
        />
      </View>

      {/* Detalhes do Lançamento */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.subInfoContainer}>
          <Text style={styles.category}>{data.category}</Text>

          {data.tag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{data.tag}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Se o estado showDelete for verdadeiro, mostra a lixeira */}
      {showDelete ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDelete}
          style={{ paddingLeft: 12, paddingVertical: 4 }}
        >
          <FontAwesome5
            name="trash-alt"
            size={18}
            color={colors.red[200]}
          />
        </TouchableOpacity>
      ) : (
        <Text
          style={[
            styles.amount,
            isIncome ? styles.incomeText : styles.expenseText,
          ]}
        >
          {isIncome
            ? `+${formatCurrency(data.amount)}`
            : `-${formatCurrency(data.amount)}`}
        </Text>
      )}
    </TouchableOpacity>
  );
}
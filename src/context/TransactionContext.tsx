import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "@/components/transactionItem";

interface TransactionContextData {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const STORAGE_KEY = "@finance_app:transactions";

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadStoredData() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTransactions(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    loadStoredData();
  }, []);

  const addTransaction = async (data: Omit<Transaction, "id">) => {
    try {
      const newTransaction: Transaction = {
        ...data,
        id: String(new Date().getTime()),
      };

      const updatedList = [newTransaction, ...transactions];
      setTransactions(updatedList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    }
  };

  // 🔴 Função para deletar um lançamento pelo ID
  const deleteTransaction = async (id: string) => {
    try {
      const updatedList = transactions.filter((item) => item.id !== id);
      setTransactions(updatedList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
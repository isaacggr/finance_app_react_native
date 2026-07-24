import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[850], // Fundo escuro
  },
  scrollContent: {
    padding: 15,
  },
  // Alternador Receita / Despesa
  typeToggleContainer: {
    flexDirection: "row",
    backgroundColor: colors.blue[500],
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.gray[500]
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  incomeActive: {
    backgroundColor: colors.green[300],
  },
  expenseActive: {
    backgroundColor: colors.red[200],
  },
  typeText: {
    color: colors.gray[400],
    fontWeight: "bold",
    fontSize: 16,
  },
  typeTextActive: {
    color: colors.gray[100],
  },
  // Form Groups
  label: {
    color: colors.gray[300],
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.blue[500],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.gray[100],
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray[500]
  },
  // Categorias
  categoriesContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.blue[500],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryChipSelected: {
    borderColor: colors.blue[200],
    backgroundColor: colors.blue[500],
  },
  categoryText: {
    color: colors.gray[400],
    fontSize: 14,
  },
  categoryTextSelected: {
    color: colors.gray[100],
    fontWeight: "bold",
  },
  // Swtiches (Fixos)
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  switchTitle: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "bold",
  },
  switchSubtitle: {
    color: colors.gray[400],
    fontSize: 12,
  },
  // Botão Adicionar
  addButton: {
    backgroundColor: colors.blue[300],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "bold",
  },
});
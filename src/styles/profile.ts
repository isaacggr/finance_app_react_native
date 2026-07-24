import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[950],
    paddingHorizontal: 16,
  },

  // Cabeçalho
  headerProfile: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    color: colors.gray[100],
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    color: colors.gray[400],
    fontSize: 14,
    marginTop: 2,
  },

  // Card de Estatísticas (Geral)
  statsCard: {
    flexDirection: "row",
    backgroundColor: colors.gray[900],
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  statNumber: {
    color: colors.gray[100],
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: colors.gray[400],
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.gray[800],
  },

  // Seções
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.gray[400],
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 12,
    paddingLeft: 4,
  },

  // Opções / Linhas
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray[900],
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.green[900],
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    color: colors.gray[100],
    fontSize: 15,
    fontWeight: "500",
  },
  optionValue: {
    color: colors.gray[400],
    fontSize: 14,
  },
});
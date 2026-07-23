import * as XLSX from "xlsx";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Transaction } from "@/components/transactionItem";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getTransactionMonth(dateStr?: string): number | null {
  if (!dateStr) return null;

  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length >= 2) {
      const month = parseInt(parts[1], 10);
      return !isNaN(month) ? month - 1 : null;
    }
  }

  if (dateStr.includes("-")) {
    const parts = dateStr.split("-");
    if (parts.length >= 2) {
      const month = parseInt(parts[1], 10);
      return !isNaN(month) ? month - 1 : null;
    }
  }

  return null;
}

export async function exportTransactionsToExcel(
  transactions: Transaction[],
  year: number = 2026
) {
  try {
    const workbook = XLSX.utils.book_new();

    MONTH_NAMES.forEach((monthName, monthIndex) => {

      const monthTransactions = transactions.filter((item) => {
        const itemMonth = getTransactionMonth(item.startDate);
        
        if (itemMonth !== null) {
          return itemMonth === monthIndex;
        }

        return monthIndex === new Date().getMonth();
      });

      const rows = monthTransactions.map((item) => ({
        Data: item.startDate || "N/A",
        Título: item.title,
        Categoria: item.category || "Geral",
        Tipo: item.type === "income" ? "Receita" : "Despesa",
        "Valor (R$)": item.amount,
      }));

      const sheetData =
        rows.length > 0
          ? rows
          : [
              {
                Data: "-",
                Título: "Nenhum lançamento registrado neste mês",
                Categoria: "-",
                Tipo: "-",
                "Valor (R$)": 0,
              },
            ];

      const worksheet = XLSX.utils.json_to_sheet(sheetData);

      worksheet["!cols"] = [
        { wch: 14 },
        { wch: 28 }, 
        { wch: 20 }, 
        { wch: 12 },
        { wch: 16 }, 
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, monthName);
    });


    const base64Excel = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    const fileName = `Relatorio_Financeiro_${year}.xlsx`;
    const file = new File(Paths.cache, fileName);

    file.write(base64Excel, { encoding: "base64" });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(file.uri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Exportar Planilha Excel",
        UTI: "com.microsoft.excel.xlsx",
      });
    } else {
      alert("O compartilhamento não está disponível neste dispositivo.");
    }
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
    alert("Erro ao gerar a planilha Excel.");
  }
}
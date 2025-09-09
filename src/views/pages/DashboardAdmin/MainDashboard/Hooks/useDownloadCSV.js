import { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";

const useDownloadCSV = () => {
  const [loading, setLoading] = useState(false);

  const downloadCSV = async () => {
    setLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${ApiConfig.mainDashboard}/user-transactions`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLoading(false);

      const transactions = res.data.transactions;
      if (transactions && transactions.length > 0) {
        const headers = Object.keys(transactions[0]);
        const csvRows = [
          headers.join(","), // Add header row
          ...transactions.map((transaction) =>
            headers
              .map((header) => JSON.stringify(transaction[header] || ""))
              .join(",")
          ),
        ];

        const csvString = csvRows.join("\n");

        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.warn("No transactions available for CSV export.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching CSV data:", error);
      throw error;
    }
  };

  return { downloadCSV, loading };
};

export default useDownloadCSV;

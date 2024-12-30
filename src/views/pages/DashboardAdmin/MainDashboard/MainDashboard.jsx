import React, { useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APIConfig";
import Card from "./CardBlock/Card";
import TopUsers from "./TableCardBlock/TabularCard"

import styles from "./MainDashboard.module.scss";

const MainDashboard = () => {
  const [loading, setLoading] = useState(false);

  const getCSVData = async () => {
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

      // Prepare CSV data
      const transactions = res.data.transactions;
      if (transactions && transactions.length > 0) {
        const headers = Object.keys(transactions[0]); // Use keys from the first object as headers
        const csvRows = [
          headers.join(","),
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
      console.error("Error fetching sheet counts:", error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.topContainer}>
        <p>Transaction Report History</p>
        <button onClick={getCSVData}>Download</button>
      </div>
      <div className={styles.cardsContainer}>
        <Card
          heading={"Tokens spent"}
          growthText={"Monthly growth"}
          label={"New"}
          amount={"390$"}
        />
        <Card
          heading={"Tokens spent"}
          growthText={"Monthly growth"}
          label={"New"}
          amount={"390$"}
        />
        <Card
          heading={"Tokens spent"}
          growthText={"Monthly growth"}
          label={"New"}
          amount={"390$"}
        />
        <Card
          heading={"Tokens spent"}
          growthText={"Monthly growth"}
          label={"New"}
          amount={"390$"}
        />
      </div>
      <div className={styles.TableSection}>
      <div className={styles.TopUserContainer}>
        <TopUsers />
        <TopUsers />
      </div>
      </div>
    </>
  );
};

export default MainDashboard;

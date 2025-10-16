import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http://localhost:3000/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/summary/${userId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadingData = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [fetchTransactions, fetchSummary]);

  const deleteTransaction = useCallback(
    async (transactionId) => {
      try {
        await fetch(`${API_URL}/transactions/${transactionId}`, {
          method: "DELETE",
        });
        // Refresh transactions and summary after deletion
        await loadingData();
        Alert.alert("Success", "Transaction deleted successfully");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        Alert.alert("Error", error.message || "Failed to delete transaction");
      }
    },
    [loadingData]
  );

  return {
    isLoading,
    transactions,
    summary,
    loadingData,
    deleteTransaction,
  };
};

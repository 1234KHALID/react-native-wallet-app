import { sql } from "../config/db.js";

export const createTransactions = async (req, res) => {
  try {
    const { title, category, amount, user_id } = req.body;
    if (!title || !category || !user_id || amount === undefined) {
      res.status(400).json({ message: "All fields are required" });
    }

    const transactiion =
      await sql` INSERT INTO transactions(user_id, title, category, amount)
    VALUES(${user_id}, ${title}, ${category}, ${amount})
     RETURNING *
    `;

    res.status(201).json(transactiion[0]);
  } catch (error) {
    console.log("Error creating is the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactiion =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transactiion);
  } catch (error) {
    console.log("Error getting is the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactionsSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance from transactions WHERE user_id = ${userId}`;

    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as income from transactions WHERE user_id = ${userId} AND amount > 0`;

    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as expenses from transactions WHERE user_id = ${userId} AND amount < 0`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error getting is the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invailid transaction Id" });
    }
    const result =
      await sql`DELETE FROM transactions WHERE id= ${id} RETURNING *`;

    if (!result.length) {
      return res.status(404).json({ message: "Transaction is not found!" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting is the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import express from "express";
import {
  getTransactions,
  getTransactionsSummary,
  deleteTransactions,
  createTransactions,
} from "../controllers/transactions-controller.js";

export const router = express.Router();

router.post("/create", createTransactions);
router.get("/:userId", getTransactions);
router.get("/summary/:userId", getTransactionsSummary);
router.delete("/:id", deleteTransactions);

export default router;

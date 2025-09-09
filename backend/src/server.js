import express from "express";
import dotenv from "dotenv";
import { initDB } from "./model/transactions.js";
import transactionsRoutes from "./routes/transactions-routes.js";
import rateLimiter from "./middleware/rate-limiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);
app.use(express.json());
app.use("/api/transactions", transactionsRoutes);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
  });
});

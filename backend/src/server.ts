import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions } from "./config/cors";
import { generalLimiter } from "./config/rateLimit";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";
import rootRouter from "./routes";

const app = express();

// Standard Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(generalLimiter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Routes
app.use("/api", rootRouter);

// Error Handling
app.use(errorHandler);

export default app;

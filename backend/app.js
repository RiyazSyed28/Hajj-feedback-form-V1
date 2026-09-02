import express from "express";
import cors from "cors";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

// Public Feedback API
app.use("/api/feedback", feedbackRoutes);

// Admin API
app.use("/api/admin", adminRoutes);

export default app;
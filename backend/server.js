
import dotenv from "dotenv";
import cors from "cors";

import app from "./app.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import recordingsRouter from "./routes/recordings.js";

dotenv.config();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/admin/export", exportRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin/analytics", analyticsRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/dashboard", dashboardRoutes);

/*
|--------------------------------------------------------------------------
| Recording Routes
|--------------------------------------------------------------------------
*/

app.use("/api/recordings", recordingsRouter);

/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


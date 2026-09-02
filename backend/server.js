
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

const allowedOrigins = [
    "http://localhost:5173",
    "https://lavender-aardvark-116528.hostingersite.com",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // (Postman, server-to-server requests, etc.)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
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

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});


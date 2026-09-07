import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log("===== MYSQL CONFIG =====");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("========================");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    ssl: {
        rejectUnauthorized: false,
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
});

pool.getConnection()
    .then((connection) => {
        console.log("✅ MYSQL CONNECTION SUCCESSFUL");
        connection.release();
    })
    .catch((error) => {
        console.error("❌ MYSQL CONNECTION FAILED");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
    });

const keepDatabaseAlive = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("✅ MySQL keep-alive successful");
    } catch (error) {
        console.error("❌ MySQL keep-alive failed:", error.message);
    }
};

// Run immediately
keepDatabaseAlive();

// Then every 10 minutes
setInterval(keepDatabaseAlive, 10 * 60 * 1000);

export default pool;
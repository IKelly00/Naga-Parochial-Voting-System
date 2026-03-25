import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nps_election",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 50,
});

async function startServer() {
  try {
    console.log("Checking database connection...");
    const connection = await db.getConnection();
    console.log("✅ MySQL Connected successfully to 'nps_election'!");
    connection.release();

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`📡 Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DATABASE CONNECTION ERROR:");
    console.error("Code:", err.code);
    console.error("Message:", err.message);
    process.exit(1);
  }
}
startServer();

app.get("/api/get-count", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT COUNT(*) AS user_count FROM candidates",
    );
    const count = rows[0].user_count;
    res.json({
      message: "Count retrieved successfully",
      count: count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving count" });
  }
});

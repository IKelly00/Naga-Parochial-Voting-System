import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  "/uploads",
  express.json(),
  express.static(path.join(__dirname, "../frontend/src/assets/uploads")),
);
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

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id, username, full_name, role, isAlreadyVoted FROM users WHERE username = ? AND password = ?",
      [username, password],
    );

    if (rows.length > 0) {
      const user = rows[0];

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          role: user.role,
          isAlreadyVoted: Boolean(user.isAlreadyVoted),
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/cast-vote", async (req, res) => {
  const { userId } = req.body;

  try {
    await db.query("UPDATE users SET isAlreadyVoted = TRUE WHERE id = ?", [
      userId,
    ]);

    const [rows] = await db.query(
      "SELECT id, username, full_name, role, isAlreadyVoted FROM users WHERE id = ?",
      [userId],
    );

    res.json({
      success: true,
      message: "Vote recorded successfully",
      user: rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Database update failed" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/src/assets/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post("/api/candidates", upload.single("image"), async (req, res) => {
  const { name, org, position, desc } = req.body;
  const imageName = req.file ? req.file.filename : null;

  try {
    const sql =
      "INSERT INTO candidates (name, org, position, description, image) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      name,
      org,
      position,
      desc,
      imageName,
    ]);

    res.status(200).json({
      success: true,
      message: "Candidate Saved!",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/candidates", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM candidates");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/candidates/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM candidates WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Candidate deleted" });
    } else {
      res.status(404).json({ success: false, error: "Candidate not found" });
    }
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// SERVER

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

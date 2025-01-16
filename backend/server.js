import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Workaround for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and set CORS headers
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Route to handle QR code generation
app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: "URL is required" });
  }

  try {
    const qrCode = qr.imageSync(url, { type: "png" }); // Generate QR code
    const base64QR = Buffer.from(qrCode).toString("base64"); // Convert to base64
    res.send({ qr: base64QR }); // Send the base64 string
  } catch (error) {
    res.status(500).send({ error: "Failed to generate QR code" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

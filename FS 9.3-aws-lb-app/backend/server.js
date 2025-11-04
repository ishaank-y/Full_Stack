import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let messages = [
  { id: 1, text: "Hello from server", ts: new Date().toISOString() }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const text = (req.body && req.body.text || "").toString().trim();
  if (!text) return res.status(400).json({ error: "text required" });
  const msg = { id: messages.length + 1, text, ts: new Date().toISOString() };
  messages.push(msg);
  res.status(201).json(msg);
});

app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
});

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// simple test route
app.get("/", (req, res) => {
  res.json({ message: "CyberSafe backend is running" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("scenario:start", () => {
    socket.emit("scenario:step", {
      step: 1,
      text: "Suspicious email detected. What would you do?"
    });
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

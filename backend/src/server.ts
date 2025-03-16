import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import vmRoutes from "./routes/vm.routes";
import serverRoutes from "./routes/server.routes";
import logRoutes from "./routes/logs.routes";
import { CustomRequest } from "./types"; 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*",methods: ["GET", "POST"] } });

app.use(cors());
app.use(express.json());

// Attach Socket.IO to Request
app.use((req, res, next) => {
  (req as CustomRequest).io = io;
  next();
});

// API Routes
app.use("/api/vm", vmRoutes);
app.use("/api/servers", serverRoutes);
app.use("/api/logs", logRoutes);

// ✅ Handle Socket Connections
io.on("connection", (socket) => {
  console.log("Client connected with ID:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});



// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

export default app;
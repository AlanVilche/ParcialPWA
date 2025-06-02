import express from "express";
import cors from "cors";
import rutas from "./Rutas";
import "dotenv/config";
import connectDB from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", rutas);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

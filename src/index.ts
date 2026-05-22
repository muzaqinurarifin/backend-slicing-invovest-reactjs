import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute.js";
import CategoryRoute from "./routes/categoryRoute.js";
import speakerRoute from "./routes/speakerRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: function (origin, callback) {
      // Mengizinkan request dari Postman (!origin), localhost, dan semua domain vercel.app
      if (!origin || origin.includes("localhost") || origin.includes("vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    // Pastikan "OPTIONS" ditambahkan di sini untuk mengatasi "preflight request"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ini adalah aplikasi untuk invofest");
});

app.use("/events", eventRoute);
app.use("/categories", CategoryRoute);
app.use("/speakers", speakerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute.js";
import CategoryRoute from "./routes/categoryRoute.js";
import speakerRoute from "./routes/speakerRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const whitelist = [
  "https://slicing-invovest-reactjs.vercel.app",
  "https://invovest.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (curl, server-to-server)
      if (whitelist.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
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

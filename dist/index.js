import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute.js";
import CategoryRoute from "./routes/categoryRoute.js";
import speakerRoute from "./routes/speakerRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
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
//# sourceMappingURL=index.js.map
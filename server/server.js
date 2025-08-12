import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/api/ping", (req, res) => {
    res.json({msg: "pong"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));
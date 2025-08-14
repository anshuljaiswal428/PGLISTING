import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
connectDB();

app.get("/api/ping", (req, res) => {
    res.json({msg: "PONG"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));

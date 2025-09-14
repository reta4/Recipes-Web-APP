import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRouth from "./routes/authRout.js";
import usersRouth from "./routes/usersRouth.js";
import recipeRouter from "./routes/recipeRouth.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", //
    credentials: true, //
  })
);

//routes:
app.use("/api/auth", authRouth);
app.use("/api", usersRouth);
app.use("/api/recipes", recipeRouter);

app.get("/", (req, res) => {
  res.send("<h1>this is a test</h1>");
});
const PORT = process.env.PORT;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

startServer();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

//connect to DataBase MongoDb
Dotenv.config();

const connection_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || process.env.PORT;

mongoose
  .connect(connection_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port :${PORT}`))
  )
  .catch((error) => console.log(error.message));

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

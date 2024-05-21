import express from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import upworkJobs from "./routes/upwork-rss/jobs";
import dotenv from "dotenv";

// initialize express
const app = express();
dotenv.config();
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection using mongoose 🦫
// mongoose.connect("mongodb://localhost:27017/upwork-rss");
// check if the connection is successful
// mongoose.connection.on("open", () => {
//   console.log(chalk.green("Database connected successfully"));
// });

// run server on port 3000
app.listen(3000, () => {
  console.log(chalk.blue("🐰 🐰 🐰 Server running on port 3000"));
});

app.get("/", () => ({
  message: "A webscraping API by Thomas Kamau 🐰",
  github: "https://github.com/TomBrian",
}));

// finance routes
app.use("/upwork/jobs", upworkJobs);

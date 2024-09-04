import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// const server = http.createServer(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`API running on http://localhost:${process.env.PORT}`);
});

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

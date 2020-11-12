import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

const app = express();

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/myShop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.send("server is ready");
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

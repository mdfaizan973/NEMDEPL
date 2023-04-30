const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./db");
const { userRouter } = require("./router/user.Router");
const { ProdRouter } = require("./router/prods.Router");
const { auth } = require("./middleware/auth.middleware");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello I am Hoome Page ☆*: .｡. o(≧▽≦)o .｡.:*☆");
});

app.use("/users", userRouter);
app.use(auth);
app.use("/prods", ProdRouter);
app.listen(2000, async () => {
  try {
    await connection;
    console.log("Server is running at port 2000");
  } catch (err) {
    console.log({ err: err.message });
  }
});

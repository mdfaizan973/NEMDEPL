const express = require("express");
const ProdRouter = express.Router();
const { prodsModel } = require("../module/prods.model");

ProdRouter.post("/add", async (req, res) => {
  const data = req.body;
  const prods = new prodsModel(data);
  await prods.save();
  res.json("Added the new prods");
});

ProdRouter.get("/", async (req, res) => {
  try {
    const prods = await prodsModel.find();
    res.send(prods);
  } catch (err) {
    res.send(err.message);
  }
});

ProdRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prodsModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send("Data updated successfully ");
  } catch (err) {
    console.log(err);
  }
});

ProdRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prodsModel.findByIdAndDelete({ _id: id });
    res.send("Data Deleted successfully ");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = { ProdRouter };

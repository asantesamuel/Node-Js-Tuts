const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const port = 8080;

mongoose
  .connect(
    "mongodb+srv://samuelab:admin@cluster1.czabbgb.mongodb.net/BackendLectures"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
});

const Item = mongoose.model("Item", itemSchema);

// GET all items
app.get("/getItems", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD item
app.post("/additem", async (req, res) => {
  const { id, name, price } = req.body;

  // Validation
  if (!id || !name || !price) {
    return res.status(400).send("Missing required fields: id, name, price");
  }

  try {
    const newItem = new Item({ id, name, price });
    await newItem.save();

    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`CRUD app listening on port ${port}...`);
});

import express, { Application, Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

const app: Application = express();
app.use(express.json());

const port: number = 8082;

mongoose
  .connect(
    "mongodb+srv://samuelab:admin@cluster1.czabbgb.mongodb.net/BackendLectures"
  )
  .then((): void => console.log("MongoDB connected"))
  .catch((err: Error): void => console.error("MongoDB connection error:", err));

interface IItem extends Document {
  id: number;
  name: string;
  price: number;
}

const itemSchema: Schema<IItem> = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);

app.get("/getItems", async (req: Request, res: Response): Promise<void> => {
  try {
    const items: IItem[] = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/additem", async (req: Request, res: Response): Promise<void> => {
  const { id, name, price } = req.body as {
    id: number;
    name: string;
    price: number;
  };

  if (!id || !name || !price) {
    res.status(400).send("Missing required fields: id, name, price");
    return;
  }

  try {
    const newItem: IItem = new Item({ id, name, price });
    await newItem.save();

    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, (): void => {
  console.log(`CRUD app listening on port ${port}...`);
});

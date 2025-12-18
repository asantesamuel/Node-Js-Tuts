"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8081;
/* ---------- MongoDB Connection ---------- */
mongoose_1.default
    .connect('mongodb+srv://samuelab:admin@cluster1.czabbgb.mongodb.net/BackendLectures')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
/* ---------- Mongoose Schema ---------- */
const itemSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
});
/* ---------- Mongoose Model ---------- */
const Item = mongoose_1.default.model('Item', itemSchema);
/* ---------- GET all items ---------- */
app.get('/getItems', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
/* ---------- ADD item ---------- */
app.post('/additem', async (req, res) => {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
        res.status(400).send('Missing required fields: id, name, price');
        return;
    }
    try {
        const newItem = new Item({ id, name, price });
        await newItem.save();
        res.status(201).json({
            message: 'Item added successfully',
            item: newItem
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
/* ---------- Server ---------- */
app.listen(port, () => {
    console.log(`CRUD app listening on port ${port}...`);
});

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());
router.use(express.json());

let invoices = [
    {
        id: 1,
        client: "Samuel Boakye",
        amount: 250,
        status: "paid", // paid | pending | cancelled
        createdAt: new Date()
    }
];

function generateId() {
    return invoices.length ? invoices[invoices.length - 1].id + 1 : 1;
}


router.get("/", (req, res) => {
    res.json(invoices);
});

router.post("/", (req, res) => {
    const { client, amount, status } = req.body;

    if (!client || !amount || !status) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newInvoice = {
        id: generateId(),
        client,
        amount,
        status,
        createdAt: new Date()
    };

    invoices.push(newInvoice);
    res.status(201).json(newInvoice);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const invoice = invoices.find(inv => inv.id === id);

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
});


router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { client, amount, status } = req.body;

    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    invoice.client = client ?? invoice.client;
    invoice.amount = amount ?? invoice.amount;
    invoice.status = status ?? invoice.status;

    res.json(invoice);
});


router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    invoices = invoices.filter(inv => inv.id !== id);

    res.json({ message: "Invoice deleted successfully" });
});

module.exports = router;


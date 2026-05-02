const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let leads = [];

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Get all leads
app.get("/leads", (req, res) => {
  res.json(leads);
});

// Add lead
app.post("/leads", (req, res) => {
  const newLead = {
    id: Date.now(),
    name: req.body.name,
    phone: req.body.phone,
    source: req.body.source,
    status: "Interested"
  };

  leads.push(newLead);
  res.json(newLead);
});

// Update status
app.put("/leads/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }

  lead.status = status;
  res.json(lead);
});

// Delete lead
app.delete("/leads/:id", (req, res) => {
  const id = parseInt(req.params.id);
  leads = leads.filter(l => l.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(7000, () => {
  console.log("Server running on http://localhost:7000");
});
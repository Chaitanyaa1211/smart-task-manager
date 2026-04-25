const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory database
let tasks = [];

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Version endpoint
app.get("/version", (req, res) => {
  res.json({ version: "1.0.0" });
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  const task = {
    id: uuidv4(),
    title,
    status: "pending",
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

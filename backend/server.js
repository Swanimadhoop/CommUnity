import app from "./app.js";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

// Get the directory name of the current module (for ES module compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "build")));

// Route all unknown requests to the React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the backend server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

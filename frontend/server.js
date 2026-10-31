const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
// In Docker Compose the Flask service is reachable by its service name
const BACKEND_URL = process.env.BACKEND_URL || "http://backend:5000";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/submit`, req.body);
    res.render("index", { result: response.data, error: null });
  } catch (err) {
    const msg = err.response?.data?.error || "Could not reach the Flask backend";
    res.render("index", { result: null, error: msg });
  }
});

app.listen(PORT, "0.0.0.0", () => console.log(`Frontend running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(bodyParser.json());
app.use("/api", userRoutes); // Prefix semua route dengan /api

app.use("/api", authRoutes);

module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for development purposes
    credentials: true,
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

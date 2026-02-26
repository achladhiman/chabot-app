const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Message = require("./models/messageModel");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins for development purposes
    credentials: true,
  }),
);

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API endpoint to handle chat messages
app.post("/api/chat", async (req, res) => {
  const { sessionId, message } = req.body;
  if(!sessionId || !message) {
    return res.status(400).json({ error: "sessionId and message are required" });
  }
  try {
    await Message.create({ sessionId, role: "user", message });
    const historyDocs = await Message.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(10);
    console.log(historyDocs);
    const history = historyDocs.map((doc) => ({
      role: doc.role === "assistant" ? "model" : "user",
      parts: [{ text: doc.message }],
    }));
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are a cricket expert assistant. Only answer cricket questions. If not cricket related, say: Sorry, I can only answer questions related to cricket.",
          },
        ],
      },
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();
    await Message.create({
      sessionId,
      role: "assistant",
      message: responseText,
    });
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error handling chat message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

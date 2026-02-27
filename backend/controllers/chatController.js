const Message = require('../models/messageModel');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller to handle chat messages
exports.handleChat = async (req, res) => {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) {
        return res.status(400).json({ success: false, error: "sessionId and message are required" });
    }
    try {
        await Message.create({ sessionId, role: "user", message });
        const historyDocs = await Message.find({ sessionId })
            .sort({ createdAt: -1 })
            .limit(10);
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
        res.status(200).json({ success: true, response: responseText });
    } catch (error) {
        console.error("Error handling chat message:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
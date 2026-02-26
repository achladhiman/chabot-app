const mongoose = require('mongoose');

// Define the Message schema
const messageSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

// Export the Message model
module.exports = Message;
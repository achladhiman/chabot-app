const express = require('express');
const router = express.Router();

// Import the controller
const chatController = require('../controllers/chatController');

// Define routes
router.post('/', chatController.handleChat);

module.exports = router;
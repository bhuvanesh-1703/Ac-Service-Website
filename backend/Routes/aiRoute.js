const express = require('express');
const { handleChat } = require('../Ai-Integration/geminiAI.js');

const router = express.Router();

router.post('/chat', handleChat);

module.exports=router
const { GoogleGenAI } = require("@google/genai");

// Load API key from GEMINI_API_KEY as defined in the .env file
const AI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleChat = async (req, res) => {
  const { message, history } = req.body;
  try {
    // Corrected method from charts.create to chats.create, using standard gemini-2.5-flash
    const chat = AI.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction:
          "You are a helpful customer support assistant for V&V Services. We provide expert AC, Refrigerator, Washing Machine, and RO Water Purifier repair and services. Be polite, concise, and helpful.",
      },
      history: history,
    });
    const response = await chat.sendMessage({ message });
    res.status(200).json({
      success: true,
      response: response.text,
    });
  } catch (error) {
    console.error("GenAI Chat Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { handleChat };

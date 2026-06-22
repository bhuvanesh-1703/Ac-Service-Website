const { GoogleGenAI } = require("@google/genai");
const JobApplication = require("../models/JobApplication");
const Booking = require("../models/Booking");

const AI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const handleChat = async (req, res) => {
  const { message, history } = req.body;

  const systemInstruction = `You are a customer support assistant for V&V Services.

We provide services ONLY for:
- AC
- Refrigerator
- Washing Machine
- RO Water Purifier

Rules:

1. If the customer mentions a problem like:
   - water leakage
   - not working
   - noise issue
   - vibration
   - bad smell
   - cooling issue

   but does NOT mention the appliance,
   ask:

   "Which appliance are you referring to? AC, Refrigerator, Washing Machine, or RO Water Purifier?"

2. Do NOT ask for Name, Phone Number, or Address until the appliance type is identified.

3. If the customer mentions an unsupported appliance such as:
   TV, Mobile, Laptop, Fan, Microwave, Geyser, etc.

   reply:

   "Sorry, we currently provide services only for AC, Refrigerator, Washing Machine, and RO Water Purifier."

4. Once a supported appliance is identified, collect:
   - Customer Name
   - Contact Phone Number
   - Service Address

5. After collecting all required details, confirm the booking.

6. Keep responses short, friendly, and conversational.`;

  let aiResponseText = "";
  let success = false;
  let errorMsg = "";

  const modelsToTry = ["gemini-3.1-flash-lite", "gemini-1.5-flash"];
  let chosenModel = "";

  for (const model of modelsToTry) {
    try {
      const chat = AI.chats.create({
        model: model,
        config: { systemInstruction },
        history: history,
      });
      const response = await chat.sendMessage({ message });
      aiResponseText = response.text;
      chosenModel = model;
      success = true;
      break;
    } catch (chatError) {
      console.warn(`Gemini model ${model} failed:`, chatError.message);
      errorMsg = chatError.message;
    }
  }

  if (!success) {
    console.error("All Gemini models failed. API error:", errorMsg);
    return res.status(503).json({
      success: false,
      error: `Gemini API service unavailable (Tried models: ${modelsToTry.join(", ")}). Error: ${errorMsg}`,
    });
  }

  try {
    // Build history text for analysis
    const historyText = history
      ? history.map((h) => `${h.role}: ${h.parts[0]?.text || ""}`).join("\n")
      : "";

    // Prompt Gemini to extract fields if complete
    const extractPrompt = `You are a data extractor. Analyze the conversation history and the latest exchange to see if the customer has provided all 4 booking details: Name, Phone, Address, and Problem Description.
    
    Conversation History:
    ${historyText}
    User: ${message}
    AI: ${aiResponseText}
    
    If all 4 are present and clear, set isComplete to true and extract the details. Otherwise, set isComplete to false.`;

    const extraction = await AI.models.generateContent({
      model: chosenModel,
      contents: extractPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            isComplete: { type: "BOOLEAN" },
            name: { type: "STRING" },
            phone: { type: "STRING" },
            address: { type: "STRING" },
            problem: { type: "STRING" },
            category: {
              type: "STRING",
              enum: [
                "ac",
                "refrigerator",
                "washing_machine",
                "ro_purifier",
                "other",
              ],
            },
          },
          required: ["isComplete"],
        },
      },
    });

    const data = JSON.parse(extraction.text);
    if (
      data.isComplete &&
      data.name &&
      data.phone &&
      data.address &&
      data.problem
    ) {
      let assignedTech = "System Assigned";

      if (data.category && data.category !== "other") {
        // Find hired technician with matching specialization
        const tech = await JobApplication.findOne({
          status: "hired",
          specialization: data.category,
        });
        if (tech) {
          assignedTech = tech.fullName;
        }
      }

      // Save booking to DB
      const newBooking = new Booking({
        name: data.name,
        phone: data.phone,
        address: data.address,
        problem: data.problem,
        technician: assignedTech,
        status: "assigned",
      });
      await newBooking.save();

      // Append confirmation text to response
      aiResponseText += `\n\n📅 **Booking Confirmed!**\n- **Name:** ${data.name}\n- **Phone:** ${data.phone}\n- **Address:** ${data.address}\n- **Assigned Technician:** ${assignedTech}\n\nOur coordinator will call you shortly to confirm the schedule. Thank you!`;
    }
  } catch (parseError) {
    console.error("Structured data parsing/saving error:", parseError.message);
  }

  res.status(200).json({
    success: true,
    response: aiResponseText,
  });
};

module.exports = { handleChat };

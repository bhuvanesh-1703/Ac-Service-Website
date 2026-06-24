const { GoogleGenAI } = require("@google/genai");
const JobApplication = require("../models/JobApplication");
const Booking = require("../models/Booking");
const { sendBookingConfirmation, sendTechnicianAlert } = require("../utils/smsService");

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

6. Keep responses short, friendly, and conversational.Examples:

- Water Leakage:
  • Turn off the appliance immediately.
  • Disconnect the power supply if it is safe.
  • Keep the area dry and avoid using the appliance.

- AC Not Cooling:
  • Check if the air filter is dirty.
  • Keep doors and windows closed.
  • Avoid repeatedly turning the AC on and off.

- Refrigerator Not Cooling:
  • Ensure the door is fully closed.
  • Avoid storing additional food items.
  • Do not open internal panels.

- Washing Machine Not Working:
  • Stop the wash cycle.
  • Disconnect the power supply.
  • Do not force the drum manually.

- RO Water Purifier Leakage:
  • Turn off the water inlet valve.
  • Disconnect the power supply.
  • Avoid using the purifier until inspected.

8. Always provide safety advice BEFORE asking for customer details.

9. Never provide repair instructions that require opening, dismantling, rewiring, or repairing electrical components.

10. Never suggest actions that may cause injury, electric shock, fire, or further damage.

11. Keep safety advice short and practical (maximum 3-4 bullet points).

12. After giving safety advice, collect:
   - Customer Name
   - Contact Phone Number
   - Service Address

13. When all details are collected, confirm the booking politely.

14. If the customer asks about service charges, explain that the technician will inspect the appliance and provide the final estimate based on the issue.

15. If the customer asks how soon a technician can arrive, inform them that the service team will contact them shortly to schedule a visit.`;

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
      let techPhone = null;

      if (data.category && data.category !== "other") {
        // Find hired technician with matching specialization
        const tech = await JobApplication.findOne({
          status: "hired",
          specialization: data.category,
        });
        if (tech) {
          assignedTech = tech.fullName;
          techPhone = tech.phone;
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

      // Fire Twilio WhatsApp/SMS to CUSTOMER
      sendBookingConfirmation(data.phone, data.name, assignedTech, data.problem);

      // Fire Twilio WhatsApp/SMS to TECHNICIAN (if found)
      if (techPhone) {
        sendTechnicianAlert(techPhone, assignedTech, data.name, data.phone, data.problem, data.address);
      }

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

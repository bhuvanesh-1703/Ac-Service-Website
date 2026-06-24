const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

let client;
if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
} else {
    console.warn("Twilio credentials not found in .env. SMS service is disabled (Mock Mode Enabled).");
}

/**
 * Formats a phone number and sends a WhatsApp/SMS message via Twilio.
 */
const sendMessage = async (toPhone, messageBody) => {
    if (!client || !fromPhone) {
        console.log("Mock SMS Delivery (Twilio not configured):");
        console.log(`To: ${toPhone}\nMessage: ${messageBody}`);
        return { success: true, mock: true };
    }

    let formattedPhone = toPhone.replace(/\s+/g, '');
    if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone;
    }

    // Detect WhatsApp Sandbox number
    const isWhatsApp = fromPhone.startsWith('whatsapp:') || fromPhone === '+14155238886';
    const fromNumber = isWhatsApp && !fromPhone.startsWith('whatsapp:') ? `whatsapp:${fromPhone}` : fromPhone;
    const toNumber = isWhatsApp ? `whatsapp:${formattedPhone}` : formattedPhone;

    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 3000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`Sending ${isWhatsApp ? 'WhatsApp' : 'SMS'} → To: ${toNumber} (Attempt ${attempt}/${MAX_RETRIES})`);

            const message = await client.messages.create({
                body: messageBody,
                from: fromNumber,
                to: toNumber
            });

            console.log(`${isWhatsApp ? 'WhatsApp' : 'SMS'} Sent Successfully. SID: ${message.sid}`);
            return { success: true, sid: message.sid };
        } catch (error) {
            console.error(`Attempt ${attempt} failed for ${toNumber}: ${error.message}`);
            if (attempt < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            } else {
                console.error(`All ${MAX_RETRIES} attempts failed for ${toNumber}.`);
                return { success: false, error: error.message };
            }
        }
    }
};

/**
 * Sends booking confirmation to the CUSTOMER.
 */
const sendBookingConfirmation = async (toPhone, customerName, technicianName, problem) => {
    const messageBody = `Hello ${customerName}, your service booking for '${problem}' is confirmed! Assigned Technician: ${technicianName}. Our coordinator will contact you shortly. - V&V Services`;
    return sendMessage(toPhone, messageBody);
};

/**
 * Sends a new job alert to the assigned TECHNICIAN.
 */
const sendTechnicianAlert = async (toPhone, technicianName, customerName, customerPhone, problem, address) => {
    const messageBody = `Hi ${technicianName}, We are From V&V service, One of our Customer has booked a service!\n\nCustomer: ${customerName}\nCustomer Contact: ${customerPhone}\nProblem: ${problem}\nAddress: ${address}\n\nPlease contact the customer or wait for coordinator instructions. - V&V Services`;
    return sendMessage(toPhone, messageBody);
};

module.exports = {
    sendBookingConfirmation,
    sendTechnicianAlert
};

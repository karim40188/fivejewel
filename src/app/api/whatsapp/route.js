import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const userLanguages = {};
const messages = { 
    
  arabic: {
    welcome: "مرحبًا! 🎉\n1️⃣ للاستفسار\n2️⃣ طلب خدمة\n0️⃣ تغيير اللغة",
    invalidOption: "عذرًا، لم أفهم طلبك. يرجى اختيار رقم من القائمة.",
  },
  english: {
    welcome: "Welcome! 🎉\n1️⃣ Inquiry\n2️⃣ Request a service\n0️⃣ Change language",
    invalidOption: "Sorry, I didn't understand your request. Please choose a number from the menu.",
  },
};

// إرسال الرسائل عبر Twilio
async function sendWhatsAppMessage(to, message) {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log(`Message sent to ${to}`);
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
  }
}

export async function POST(req) {
  const body = await req.json();
  const from = body.From;
  const message = body.Body.trim();

  if (!from || !message) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const userLang = userLanguages[from] || 'arabic';

  if (message === '0') {
    userLanguages[from] = null;
    await sendWhatsAppMessage(from, "اختر لغتك:\n1️⃣ العربية\n2️⃣ English");
    return NextResponse.json({ success: true });
  }
  if (message === '1') {
    userLanguages[from] = 'arabic';
    await sendWhatsAppMessage(from, messages.arabic.welcome);
    return NextResponse.json({ success: true });
  }
  if (message === '2') {
    userLanguages[from] = 'english';
    await sendWhatsAppMessage(from, messages.english.welcome);
    return NextResponse.json({ success: true });
  }

  await sendWhatsAppMessage(from, messages[userLang]?.invalidOption || "Invalid request.");
  return NextResponse.json({ success: true });
}

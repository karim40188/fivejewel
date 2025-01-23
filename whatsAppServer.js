require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// التحقق من متغيرات البيئة
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_NUMBER) {
  console.error("⚠️ يرجى إعداد متغيرات البيئة بشكل صحيح.");
  process.exit(1);
}

const app = express();
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// تخزين اللغة والحالات لكل مستخدم
const userLanguages = {};
const userStates = {};

// الرسائل المخصصة لكل لغة
const messages = {
  arabic: {
    welcome: "مرحبًا بك في مغسلة الجواهر الخمسة! 🎉 كيف يمكننا مساعدتك اليوم؟\n1️⃣ الاستفسار عن الخدمات والأسعار\n2️⃣ طلب خدمة\n3️⃣ متابعة طلبك\n4️⃣ التحدث إلى موظف خدمة العملاء\n5️⃣ العروض والخصومات\n6️⃣ تقييم الخدمة\n0️⃣ العودة إلى اختيار اللغة",
    services: "💡 خدماتنا:\n1️⃣ غسيل وكوي\n2️⃣ تنظيف جاف\n3️⃣ تنظيف مفروشات\nاختر رقم الخدمة للاطلاع على التفاصيل:\n0️⃣ العودة إلى القائمة الرئيسية",
    requestService: "ما نوع الخدمة المطلوبة؟\n1️⃣ غسيل وكوي\n2️⃣ تنظيف جاف\n3️⃣ تنظيف مفروشات\n0️⃣ العودة إلى القائمة الرئيسية",
    itemsCount: "كم عدد القطع؟ (يرجى إدخال العدد)",
    address: "أدخل عنوانك: [يرجى كتابة العنوان]",
    pickupTime: "حدد موعد الاستلام: [اليوم، صباحًا/مساءً]",
    paymentMethod: "طريقة الدفع:\n1️⃣ نقدًا\n2️⃣ تحويل بنكي",
    confirmation: "👍 تم تسجيل طلبك بنجاح! شكرًا لاستخدامك خدماتنا.",
    trackOrder: "📦 أدخل رقم طلبك لتتبع حالته:",
    invalidOption: "عذرًا، لم أفهم طلبك. يرجى اختيار رقم من القائمة.",
  },
  english: {
    welcome: "Welcome to Five Jewels Laundry! 🎉 How can we assist you today?\n1️⃣ Inquire about services and prices\n2️⃣ Request a service\n3️⃣ Track your order\n4️⃣ Speak to a customer service agent\n5️⃣ Offers and Discounts\n6️⃣ Rate Our Service\n0️⃣ Return to language selection",
    services: "💡 Our services include:\n1️⃣ Washing and ironing\n2️⃣ Dry cleaning\n3️⃣ Linen cleaning\nChoose a service number to see details:\n0️⃣ Return to the main menu",
    requestService: "What type of service do you need?\n1️⃣ Washing and ironing\n2️⃣ Dry cleaning\n3️⃣ Linen cleaning\n0️⃣ Return to the main menu",
    itemsCount: "How many items? (Please enter the number)",
    address: "Enter your address: [Please type your address]",
    pickupTime: "Select a pickup time: [Day, Morning/Evening]",
    paymentMethod: "Payment method:\n1️⃣ Cash\n2️⃣ Bank transfer",
    confirmation: "👍 Your order has been successfully placed! Thank you for choosing our services.",
    trackOrder: "📦 Enter your order number to track its status:",
    invalidOption: "Sorry, I didn't understand your request. Please select a valid option.",
  },
};

// وظيفة إرسال الرسائل عبر Twilio
async function sendWhatsAppMessage(to, message) {
  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log(`Message sent to ${to}`);
  } catch (error) {
    console.error(`Error sending message to ${to}: ${error.message}`);
  }
}

// منطق التطبيق
app.post('/whatsapp', async (req, res) => {
  const from = req.body.From;
  const message = req.body.Body.trim();

  if (!from || !message) {
    return res.status(400).send("Invalid request.");
  }

  const userLang = userLanguages[from] || 'arabic';

  // اختيار اللغة
  if (message === '1') {
    userLanguages[from] = 'arabic';
    await sendWhatsAppMessage(from, messages.arabic.welcome);
    return res.status(200).send("Language set to Arabic.");
  }
  if (message === '2') {
    userLanguages[from] = 'english';
    await sendWhatsAppMessage(from, messages.english.welcome);
    return res.status(200).send("Language set to English.");
  }

  // القائمة الرئيسية
  if (message === '3') {
    await sendWhatsAppMessage(from, messages[userLang].services);
    return res.status(200).send("Services menu sent.");
  }

  // طلب خدمة
  if (message === '2') {
    userStates[from] = 'requestService';
    await sendWhatsAppMessage(from, messages[userLang].requestService);
    return res.status(200).send("Request service menu sent.");
  }
  // منطق الحالات الأخرى
  if (userStates[from] === 'requestService' && /^\d+$/.test(message)) {
    userStates[from] = 'itemsCount';
    await sendWhatsAppMessage(from, messages[userLang].address);
    return res.status(200).send("Waiting for address.");
  }

  if (userStates[from] === 'itemsCount') {
    userStates[from] = 'pickupTime';
    await sendWhatsAppMessage(from, messages[userLang].pickupTime);
    return res.status(200).send("Waiting for pickup time.");
  }

  if (userStates[from] === 'pickupTime') {
    userStates[from] = 'paymentMethod';
    await sendWhatsAppMessage(from, messages[userLang].paymentMethod);
    return res.status(200).send("Waiting for payment method.");
  }

  if (userStates[from] === 'paymentMethod' && ['1', '2'].includes(message)) {
    userStates[from] = null;
    await sendWhatsAppMessage(from, messages[userLang].confirmation);
    return res.status(200).send("Order confirmed.");
  }

  // رد افتراضي
  await sendWhatsAppMessage(from, messages[userLang].invalidOption);
  return res.status(200).send("Invalid option sent.");
});

// تشغيل السيرفر
app.listen(3000, () => console.log("🚀 Server is running on port 3000."));

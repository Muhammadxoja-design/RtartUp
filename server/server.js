import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // bu sizning Telegram ID yoki guruh ID

if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error("BOT_TOKEN va CHAT_ID environmentda bo'lishi kerak");
}

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email, and message are required" });
  }

  const text = `
📨 *New Contact Request*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject || "-"}
*Message:* ${message}
`;

  try {
    await bot.sendMessage(CHAT_ID, text, { parse_mode: "Markdown" });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
s;

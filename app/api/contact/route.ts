import { NextRequest, NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  throw new Error("BOT_TOKEN va CHAT_ID environmentda bo‘lishi kerak");
}

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const text = `
📨 *New Contact Request*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || "-"}
*Message:* ${message}
`;

    await bot.sendMessage(CHAT_ID, text, { parse_mode: "Markdown" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

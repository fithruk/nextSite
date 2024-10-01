import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const message = `
  Новое сообщение с сайта:
  Имя: ${body.name}
  Телефон: ${body.phone}
  Email: ${body.email}
  `;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  await fetch(telegramUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  });

  return NextResponse.json({ success: true });
}

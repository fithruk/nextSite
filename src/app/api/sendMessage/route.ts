import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, telegram, message } = body;

  if (!name || !phone || !telegram) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
  console.log(TELEGRAM_BOT_TOKEN);

  const text = `
🟢 Нове повідомлення з сайту:
👤 Ім’я: ${name}
📞 Телефон: ${phone}
✈️ Telegram: ${telegram}
📝 Повідомлення: ${message}
`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    const data = await telegramRes.json();

    if (!data.ok) {
      return NextResponse.json(
        { success: false, error: data.description },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

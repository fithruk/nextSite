import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import SiteHead from "@/components/MetaComponents/Head/Head";

export const metadata: Metadata = {
  title: "Fitness Trainer",
  description:
    "Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей.",
  keywords:
    "фитнес, тренер, тренировки, здоровье, спорт, индивидуальные тренировки, программы питания",
  authors: [{ name: "Белов Сергей" }],
  openGraph: {
    title: "Фитнес Тренер Белов Сергей",
    description:
      "Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей.",
    url: "https://yourwebsite.com/",
    siteName: "Фитнес Тренер",
    images: [
      {
        url: "https://yourwebsite.com/path/to/image.jpg",
        width: 800,
        height: 600,
        alt: "Изображение фитнес тренера",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Фитнес Тренер Белов Сергей",
    description:
      "Личный сайт фитнес тренера. Индивидуальные тренировки, советы по питанию и программы для достижения ваших целей.",
    images: ["https://yourwebsite.com/path/to/image.jpg"],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <SiteHead />
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

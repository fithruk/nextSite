import type { Metadata } from "next";
import { ThemeProvider } from "./Contexts/ThemeContext/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Онлайн фитнес-тренер | Персональні тренування — The Fitness Trainer",
  description:
    "Індивідуальні онлайн тренування з сертифікованим фітнес-тренером. Програми для схуднення, набору м’язів і підтримки форми. Почни вже сьогодні!",
  keywords: [
    "фітнес онлайн",
    "онлайн тренер",
    "персональний тренер",
    "фітнес програма",
    "онлайн тренування",
    "тренування вдома",
    "fitness online",
    "online fitness coach",
    "personal trainer Ukraine",
  ],
  openGraph: {
    title: "The Fitness Trainer — персональні онлайн тренування",
    description:
      "Отримай персональний фітнес-план, консультацію та підтримку від тренера онлайн.",
    url: "https://www.thefitnesstrainer.online/",
    siteName: "The Fitness Trainer",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body cz-shortcut-listen="true">
        <Providers>
          <AppRouterCacheProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}

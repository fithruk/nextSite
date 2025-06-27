import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // отключает двойной ререндер в dev
  eslint: {
    ignoreDuringBuilds: true, // чтобы ошибки eslint не ломали прод сборку
  },
  // typescript: {
  //   ignoreBuildErrors: true, // если хочешь деплоить даже с TS ошибками (осторожно)
  // },
};

export default nextConfig;

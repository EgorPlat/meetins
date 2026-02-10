import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "ru",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
            {
                protocol: "http",
                hostname: "*",
            },
        ],
    }
};

export default nextConfig;

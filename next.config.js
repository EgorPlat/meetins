/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "ru",
        localeDetection: true
    },
    images: {
        domains: ["media.kudago.com", "localhost", "meetins-egorplat.amvera.io"]
    }
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

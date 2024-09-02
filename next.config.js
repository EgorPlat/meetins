/** @type {import('next').NextConfig} */
const config = {
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

module.exports = config;

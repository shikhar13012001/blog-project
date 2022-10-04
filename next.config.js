/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'firebasestorage.googleapis.com',
            'i.ibb.co',
        ],
    },
    env: {
        IMGBB_API_KEY: process.env.IMGBB_API_KEY,
        TYPE: process.env.TYPE,
        PROJECT_ID: process.env.PROJECT_ID,
        PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_EMAIL: process.env.CLIENT_EMAIL,
        CLIENT_ID: process.env.CLIENT_ID,
        AUTH_URI: process.env.AUTH_URI,
        TOKEN_URI: process.env.TOKEN_URI,
        AUTH_PROVIDER_X509_CERT_URL: process.env.AUTH_PROVIDER_X509_CERT_URL,
        CLIENT_X509_CERT_URL: process.env.CLIENT_X509_CERT_URL,
        APIKEY: process.env.APIKEY,
        AUTHDOMAIN: process.env.AUTHDOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
        APPID: process.env.APPID,
    },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: '',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/main',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/account',
                destination: '/account/details',
                permanent: true
            }
        ]
    },
    env: {
        MONGO_URI: 'mongodb://localhost:27017/webshop'
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false }
        return config
    }
}

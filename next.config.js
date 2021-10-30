module.exports = {
    reactStrictMode: true,
    env: {
        MONGO_URI: 'mongodb://localhost:27017/webshop'
    },
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false }
        return config
    }
}

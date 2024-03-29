const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    "images": {
        domains: ['localhost', "www.arsimodir.ir"]
    }
})
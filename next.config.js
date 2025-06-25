/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    // Image optimization configuration
    images: {
        unoptimized: process.env.NODE_ENV === 'production' ? false : true
    },
    // Enable source maps in production
    productionBrowserSourceMaps: true
};

// Only enable static exports for production builds
if (process.env.NODE_ENV === 'production') {
    nextConfig.output = 'export';
}

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    transpilePackages: [
        '@reacterial/ui',
        '@reacterial/auth',
        '@reacterial/theme',
        '@reacterial/utils',
    ],
};

export default nextConfig;

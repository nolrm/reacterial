/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placehold.co'],
        dangerouslyAllowSVG: true,
    },
    transpilePackages: [
        '@reacterial/ui',
        '@reacterial/auth',
        '@reacterial/theme',
        '@reacterial/utils',
    ],
};

export default nextConfig;

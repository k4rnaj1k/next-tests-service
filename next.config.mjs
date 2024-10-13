/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [{
            source: '/',
            destination: '/tests',
            permanent: false,
        }]
    }
};

export default nextConfig;

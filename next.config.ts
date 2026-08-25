/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {},

<<<<<<< HEAD
  allowedDevOrigins: ["192.168.1.104", "http://192.168.1.104:3000", '10.210.74.213' , ' 10.251.6.149'],
=======
  allowedDevOrigins: ["192.168.1.104", "http://192.168.1.104:3000", "192.168.1.101", '10.210.74.213'],
>>>>>>> 6707850e8dd51b5870de28b619bf4458044f231f
};

module.exports = nextConfig;

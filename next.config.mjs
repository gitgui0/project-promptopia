/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //   appDir: true,
    //   serverComponentsExternalPackages: ["mongoose"],
    // },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    // Comment out or remove custom Webpack configuration
  // webpack(config) {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
  }
  
export default nextConfig;
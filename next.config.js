/** @type {import('next').NextConfig} */

const nextConfig = {

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
    images:{
        remotePatterns:[
          {
            hostname: "1h3.googleusercontent.com",
            protocol : "https",
          },
        ]
    },
    
};


  module.exports = nextConfig;
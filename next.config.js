/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav:true, 
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions:{
    disableDevLogs:true,
  }
});

const nextConfig = {

    images:{
        remotePatterns:[
          {
            hostname: "1h3.googleusercontent.com",
            protocol : "https",
          },
        ]
    },
    
};


  module.exports = withPWA(nextConfig);
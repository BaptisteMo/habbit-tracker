/** @type {import('next').NextConfig} */

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


  module.exports = nextConfig;
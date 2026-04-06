import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.15.72"],

  /* config options here */

  images: {
    qualities: [10, 20,30,40,50,60,70,80,100]
  },
  
};

export default nextConfig;



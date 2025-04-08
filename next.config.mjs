// next.config.mjs
export default {
  webpack: (config) => {
    config.resolve.fallback = {
      "pg-native": false, // Ignoriere pg-native
    };
    return config;
  },
};

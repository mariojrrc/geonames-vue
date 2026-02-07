module.exports = {
  devServer: {
    allowedHosts: 'all',
    port: 8081,
    proxy: {
      '/v1': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};

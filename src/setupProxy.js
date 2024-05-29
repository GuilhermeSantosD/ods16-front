const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/translate',
        createProxyMiddleware({
            target: 'https://translation.googleapis.com',
            changeOrigin: true,
            pathRewrite: {
                '^/translate': '',
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request:', req.url);
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
            },
        })
    );
};

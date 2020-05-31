module.exports= {
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:8899'
            }
        }
    }
}
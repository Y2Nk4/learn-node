let http = require('http')

http.createServer()
    .on('request', (req, res) => {
        console.log('request')
    })
    .on('connect', () => {
        console.log('connect')
    })
    .listen(8081, (port) => {
        console.log(`listened to ${port}`)
    })
let http = require('http')

http.createServer()
    .on('request', (req, res) => {
        console.log('request')
    })
    // emits while receiving a CONNECT-method request.
    .on('connect', (req, res) => {
        console.log('connect')
        res.end('success')
    })
    .listen(8081, (port) => {
        console.log(`listened to ${port}`)
    })
let events = require('events')

let eventEmitter = new events.EventEmitter()

eventEmitter.on('event1', (...params) => {
    console.log('event1 emitted', params)
})
eventEmitter.on('event1', (...params) => {
    console.log('event1 emitted 2nd listener', params)
})
eventEmitter.once('event1', (...params) => {
    console.log('event1 emits only once', params)
})

eventEmitter.emit('event1', 'hello', 'world')
console.log('--------------')
eventEmitter.emit('event1', 'This', 'is', 'the', 'second', 'time')
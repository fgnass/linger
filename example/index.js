var linger = require('../')

console.log('Please wait or press Ctrl-C ...')
linger('zzZz')

setTimeout(function() { linger(false) }, 5000)

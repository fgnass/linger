var linger = require('../')

var timeout

console.log('Please wait or press Ctrl-C ...')

var stop = linger('zzZz', function(c) {
  if (c == 'SIGTERM') console.log('SIGTERM received.')
  else if (c == 'ETX') console.log('Ctrl-C was pressed.')
  else if (c == 'EOT') console.log('Ctrl-D was pressed.')
  else console.log('stop("%s") was called.', c)
  clearTimeout(timeout)
})

timeout = setTimeout(function() {
  stop('time is up')
}, 5000)

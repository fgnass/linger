var ansi = {
  g: '\033[32m', // green
  b: '\033[30m', // black
  B: '\033[1m',  // bold
  R: '\033[0m',  // reset
  o: '∙',
  O: '•'
}

function decode(a) {
  return a.map(function(s) {
    if (!s) return
    return s.split('').map(function(c) { return ansi[c] }).join('')
  })
}

var frames = decode([
  'goO',
  'bBogO',
  ,,,,
  'bBoRgO',
  'gOo',
  'gBObo',
  ,,,,
  'gObBo'
])


var stdin = process.stdin
  , stdout = process.stdout

module.exports = function(msg, cb) {

  function stop(reason) {
    stdout.write(ansi.R)
    stdout.write('\u001b[2K') // erase line
    stdout.write('\r')
    stdout.write('\u001b[?25h') //show the cursor
    clearInterval(timer)
    stdin.pause()
    cb(reason)
  }

  if (stdin.setRawMode) {
    stdin.setRawMode(true)
    // Start reading from stdin so we don't exit
    stdin.resume()
    stdin.setEncoding('utf8')

    process.on('SIGTERM', function(s) {
      stop('exit')
    })

    stdin.on('data', function(key) {
      // Ctrl-C or Ctrl-D
      if (key == '\u0003' || key == '\u0004') {
        stop(key == '\u0003' ? 'ETX' : 'EOT')
        stdin.setRawMode(false)
      }
    })

  }

  stdout.write('\u001b[?25l') // hide the cursor
  if (msg) stdout.write('    ' + ansi.B + ansi.b + msg)

  var len = frames.length
    , i = 0

  var timer = setInterval(function() {
    var str = frames[i++ % len]
    if (str) stdout.write('\u001b[2G' + ansi.R + str)
  }, 100)

  return stop
}

var code = {
  h: '\u001b[?25l', // hide cursor
  s: '\u001b[?25h', // show cursor
  1: '\u001b[1G',   // move to col 1
  c: '\u001b[2K',   // clear line
  g: '\033[32m',    // green
  b: '\033[30m',    // black
  B: '\033[1m',     // bold
  X: '\033[0m',     // reset
  o: '∙',
  O: '•',
  _: ' '
}

function decode(s) {
  if (!s) return
  return s.split('').map(function(c) { return code[c] }).join('')
}

function write() {
  for (var i=0; i < arguments.length; i++) {
    var s = arguments[i]
    process.stdout.write(Array.isArray(s) ? decode(s[0]) : s)
  }
}

var frames = [
  'goO',
  'bBogO',
  ,,,,
  'bBoXgO',
  'gOo',
  'gBObo',
  ,,,,
  'gObBo'
].map(decode)

var timer
  , len = frames.length
  , i = 0

module.exports = function(msg) {
  clearInterval(timer)
  if (msg === false || msg === undefined) {
    write(['Xc1s'])
  }
  else {
    timer = setInterval(function() {
      var str = frames[i++ % len]
      if (str) write(['h1_X'], str, ['bB_'], msg, ['Xs_'])
    }, 100)
  }
}


self.addEventListener('message', function(e) {

  //bitwise solution to n-queens from: http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/

  var solutionCount = 0;

  var all = Math.pow(2, e.data[3]) - 1;

  var findSolutions = function(cols, ld, rd) {
    var pos = ~(cols | ld | rd) & all;

    while(pos > 0) {
      var bit = -pos & pos;
      pos = pos ^ bit;

      findSolutions((cols | bit), (ld | bit) << 1, (rd | bit) >> 1);
    }
    if (cols === all) {
      ++solutionCount;
    }
  };

  findSolutions(e.data[0], e.data[1], e.data[2]);

  self.postMessage(solutionCount);

}, false);

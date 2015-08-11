
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
var countNQueensSolutions = function(n, callback, finalCallback, executeAsynchronously) {

  var myWorker;
  var startTime = new Date().getTime(); 

  if(executeAsynchronously === undefined || executeAsynchronously <= 0)
  {
    callback("Beginning Singlethreaded N-Queens Count");

    myWorker = new Worker('./worker.js');

    myWorker.postMessage([0, 0, 0, n]);

    myWorker.addEventListener('message', function(e) {
      callback("Total Count: " + e.data);
      callback("Elapsed time: " + (new Date().getTime() - startTime) + " milliseconds");

      finalCallback();
    }, false);    
  }
  else
  {
    callback("Beginning Multithreaded N-Queens Count");

    var stepCount = 0;
    var solutionCount = 0;

    var cols = 0;
    var ld = 0;
    var rd = 0;

    for(var i = 0; i < n; ++i) {
      cols = Math.pow(2, i);
      ld = Math.pow(2, i + 1);

      if(i > 0)
      {
        rd = Math.pow(2, i - 1);
      }

      myWorker = new Worker('./worker.js');

      myWorker.postMessage([cols, ld, rd, n]);

      myWorker.addEventListener('message', function(e) {
        solutionCount += e.data;

        ++stepCount;

        if(executeAsynchronously === 1)
        {
          callback("Step " + stepCount + ": " + e.data + " - Total: " + solutionCount);
        }

        if(stepCount === n)
        {
          callback("Total Count: " + solutionCount);
          callback("Elapsed time: " + (new Date().getTime() - startTime) + " milliseconds");
          finalCallback();
        }
      }, false);
    }
  }

};


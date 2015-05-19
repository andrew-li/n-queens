/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({'n': n});
  var i=0;
  var j=0;
  // returns a single solution
    while(i < n && j < n){

      board.togglePiece(i, j);
      if(board.hasRowConflictAt(i)){
        board.togglePiece(i, j);
        i+=1;
        j=0;
        continue;
      }
      if(board.hasColConflictAt(j)){
        board.togglePiece(i, j);
        j+=1;
        continue;
      }
      if(!board.hasAnyRooksConflictsOn(i,j)){
        var old_i = i;
        var old_j = j;
        j+=1;
        if(j === n){
          j = 0;
          i ++;
        }
        //repeat(board, i,j); // if we placed the rook
        //board.togglePiece(old_i, old_j);
      }
    }
    //board.print();
    solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  console.log("got here");
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});
  // place one in the first row - n possibilities.
    // for (n - 1 ) rooks place one rook per row

  // for(var i = 0 ; i < n; i++){
  //   for(var j = 0; j < n; j++){

  //   }
  // }
  // optimization
  // /var colConflicts = {'0': true};
  //



  var repeat = function(board,j){

    if(j >= n){
      return true;
    }

   for(var i = 0; i < n; i++)
   {

      board.togglePiece(i, j);
     if(!board.hasRowConflictAt(i))
     {
       if(repeat(board.copy(), j + 1) === true)
       {
        solutionCount++;
        //return true;
       }

     }
     board.togglePiece(i, j);
   }


    //board.print();
    return false;
  }
  //console.log("first call");
  //console.log(board.get(0)[0]);
  repeat(board,0);





  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

  // var repeat = function(board,i,j){

  //   if(j === n){
  //     solutionCount++;
  //   }

  //   while(true){
  //     if(j === n && i===n ){
  //       solutionCount++;
  //       break;
  //     }

  //     board.togglePiece(i, j);
  //     if(board.hasRowConflictAt(i)){
  //       board.togglePiece(i, j);
  //       i+=1;
  //       j=0;
  //       continue;
  //     }
  //     if(board.hasColConflictAt(j)){
  //       board.togglePiece(i, j);
  //       j+=1;
  //       continue;
  //     }
  //     if(!board.hasAnyRooksConflictsOn(i,j)){
  //       var old_i = i;
  //       var old_j = j;
  //       j+=1;
  //       if(j === n){
  //         j = 0;
  //         i ++;
  //       }
  //       repeat(board, i,j); // if we placed the rook
  //       board.togglePiece(old_i, old_j);
  //     }
  //   }




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

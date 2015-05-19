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

  var repeat = function(board,j){

    // means we reached the end of the board.
    // but what if reached the end of the board, but don't have a solution? will that never happen?
    if(j >= n){
      return true;
    }

   for(var i = 0; i < n; i++) // loop on rows
   {

      board.togglePiece(i, j);
      // we only check for row conflict, since we never place two items(rooks/queens) in the same column,
      // when we place a piece, we go to the next column straight away.
     if(!board.hasRowConflictAt(i))
     {
       if(repeat(board, j + 1) === true)
       {
        if(solution === undefined){
            solution = board;
            done = true;
          }
          return true;
       }

     }
     board.togglePiece(i, j);
   }


    //board.print();
    return false;
  }

  repeat(board,0);
  solution = solution.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0; //fixme
  var board = new Board({'n': n});


  // recurse on columns
  var repeat = function(board,j){

    // means we reached the end of the board.
    // but what if reached the end of the board, but don't have a solution? will that never happen?
    if(j >= n){
      return true;
    }

   for(var i = 0; i < n; i++) // loop on rows
   {
      board.togglePiece(i, j);

      // we only check for row conflict, since we never place two items(rooks/queens) in the same column,
      // when we place a piece, we go to the next column straight away.
     if(!board.hasRowConflictAt(i))
     {
       if(repeat(board, j + 1) === true)
       {

        solutionCount++;
        //return true;
       }

     }
     board.togglePiece(i, j);
   }



    return false;
  }

  repeat(board,0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution; //fixme
  var done = false;

  // means we reached the end of the board.
  // but what if reached the end of the board, but don't have a solution? will that never happen?
  var board = new Board({'n': n});

  if(n===0){
      return [];
  }
  // recurse on columns
  var repeat = function(board,j){

    // means we reached the end of the board.
    // but what if reached the end of the board, but don't have a solution? will that never happen?


    // we only increment j when we place a rook/queen. so when j reaches n, it means we
    // placed all n rooks/queens, since we reached the end of the board.
    if(j >= n){
      return true;
    }

   for(var i = 0; i < n; i++) // loop on rows
   {
      board.togglePiece(i, j);
     if(!board.hasRowConflictAt(i) && !board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(i,j))
      && !board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(i,j)))
     {
       if(repeat(board, j + 1) === true)
       {
          if(solution === undefined){
            solution = board;
            done = true;
          }
          return true;
       }

     }
     board.togglePiece(i, j);
     if(done)
      return true;
   };

    return false;
  }

  repeat(board, 0);

  if(solution === undefined){
    solution = board.rows();
  }
  else{
    solution = solution.rows();
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme


    // means we reached the end of the board.
    // but what if reached the end of the board, but don't have a solution? will that never happen?
  var board = new Board({'n': n});

  // recurse on columns
  var repeat = function(board,j){

    // means we reached the end of the board.
    // but what if reached the end of the board, but don't have a solution? will that never happen?

    if(j >= n){
      return true;
    }



   for(var i = 0; i < n; i++) // loop on rows
   {
      board.togglePiece(i, j);
     if(!board.hasRowConflictAt(i) && !board.hasMajorDiagonalConflictAt(board._getFirstRowColumnIndexForMajorDiagonalOn(i,j))
      && !board.hasMinorDiagonalConflictAt(board._getFirstRowColumnIndexForMinorDiagonalOn(i,j)))
     {
       if(repeat(board, j + 1) === true)
       {
        solutionCount++;
       }

     }
     board.togglePiece(i, j);
   };



    return false;
  }

  repeat(board,0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

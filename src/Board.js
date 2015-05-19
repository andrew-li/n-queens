// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        //console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        //console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        //console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    columns: function(){
      var cols = [];
      _.each(this.rows(), function(row, rowIndex){
        _.each(row, function(col, colIndex){
          cols[colIndex] = cols[colIndex] || [];
          cols[colIndex][rowIndex] = col;
        });
      });
      return cols;
    },

    copy: function(){
      var currentBoard= this;
      var newBoard = new Board({n : this.get('n')});
      _.each(this.rows(), function(row, rowIndex){
        _.each(row, function(col, colIndex){
          newBoard.get(rowIndex)[colIndex] = currentBoard.get(rowIndex)[colIndex];
        });
      });
      return newBoard;
    },

    print: function(){
      var s = "";
      for(var l = 0; l < this.get('n'); l++)
      {
        s="";
        for(var k = 0; k < this.get('n'); k++)
        {
          s+= "-" + this.get(l)[k];
        }
        console.log(s);
      }
      console.log("New Board");
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyRooksConflictsOn: function(rowIndex, colIndex) {
      return this.hasRowConflictAt(rowIndex) || this.hasColConflictAt(colIndex);
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      for(var i = 0; i < this.get(rowIndex).length; i++)
      {
        if(this.get(rowIndex)[i] === 1)
        {
          count++;
        }
        if(count >= 2)
          return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for(var i = 0; i < this.rows().length; i++)
      {
        if(this.hasRowConflictAt(i))
          return true;
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for(var i = 0; i < this.columns()[colIndex].length; i++)
      {
        //debugger;
        if(this.columns()[colIndex][i] === 1)
        {
          count++;
        }
        if(count >= 2)
          return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for(var i = 0; i < this.columns().length; i++)
      {

        if(this.hasColConflictAt(i))
          return true;
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var i = 0;
      var j = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      while(i < this.get('n') && j < this.get('n')) {
        if(this.get(i++)[j++] === 1)
        {
          count++;
        }
        if(count >= 2)
          return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for(var i = 0; i < this.columns().length; i++)
      {
        if(this.hasMajorDiagonalConflictAt(i))
          return true;
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var i = 0;
      var j = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      while(i < this.get('n') && j >= 0) {
        if(this.get(i++)[j--] === 1)
        {
          count++;
        }
        if(count >= 2)
          return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for(var i = 0; i < this.columns().length; i++)
      {
        if(this.hasMinorDiagonalConflictAt(i))
          return true;
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

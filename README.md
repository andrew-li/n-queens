#n-queens
This is a project I completed as a student at [hackreactor](http://hackreactor.com). This project was worked on with a pair.


The source code in this repository was written as part of a sprint at Hack Reactor. The task was to implement a solution to the [n-queens problem](http://www.durangobill.com/N_Queens.html). The basic requirement to implement a working solution was finished as a pair. However, I implemented the extra credit portion to multithread the solution using Web Workers on my own after the sprint was over.


============================================================================================================================================================================


The src folder contains the basic solution to the n-queens and n-rooks problems. The algorithm recursively checks all possible board configurations to see which configurations with all n queens/rooks on the board are valid. However, queens/rooks are never placed in the same column since two pieces can't be in the same column. So for each row, a new piece is added column by column. The solution uses an optimization technique known as [backtracking](https://en.wikipedia.org/wiki/Backtracking), which will prevent a recursive branch from continuing when an invalid board configuration is reached. The backtracking optimization makes the solution run in exponential time rather than factorial.

The extra credit portion for this sprint - to use Web Workers to multithread the solution to the n-queens problem - has been completed. 

The source code for the multithreaded solution can be found in the webworkers folder. The solvers.js file splits the solution into different branches, and the worker.js file calculates the number of valid board configurations for the given branch. There is an index.html file in the webworkers folder that can be opened in a web browser to run the multithreaded solution. The index.html page also allows running in singlethreaded mode for comparison. Note: if running the index.html locally in Chrome, certain launch parameters need to be set to enable Web Workers.

The basic solution uses a board class to construct each board configuration and check if the board configuration is valid. However, using bitwise operators allows for much faster board validation. Since I was more focused on getting the Web Workers to work and I wanted concise code to work with, for the multithreading part I used the bitwise solution from this blog: [http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript/](http://gregtrowbridge.com/a-bitwise-solution-to-the-n-queens-problem-in-javascript). More information about how the bitwise solution works can be found in that blog. The high level algorithm is still the same (except this implementation of the bitwise solution places a queen row by row instead of column by column, although it can be done either way), but the bitwise portion changes how a board configuration is validated.

The difficult part of multithreading the solution was figuring out how to divide the work amongst each thread. My approach to creating a multithreaded solution was to create a new thread for each initial recursive branch. In other words, a new Web Worker was spawned for every column in the board, such that each thread calculated the number of possible ways to place n number of queens on the board starting from placing a single queen in the first row for each column.

So for a 4x4 board, there will be four different Web Workers spawned. The initial configurations of the board for the Web Workers will look like the following:<br/>
1000 | 0100 | 0010 | 0001<br/>
0000 | 0000 | 0000 | 0000<br/>
0000 | 0000 | 0000 | 0000<br/>
0000 | 0000 | 0000 | 0000<br/>
A new queen will then be placed row by row (a queen will still be placed in each column, but no more than one in a row at any given time) until 4 queens are placed on the board in a valid configuration. If an invalid board configuration is reached, the solution will backtrack. Each thread will count the number of valid 4 piece board configurations starting from its given initial board configuration.


DEMO: [n-queens](http://andrew-li.github.io/nqueens/index.html)<br/>


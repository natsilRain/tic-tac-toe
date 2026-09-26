# Developer Notes

I am having trouble figuring out how to approach this project, so I thought I would write down my thoughts/plan for better clarity.

My goal is to develop a tic-tac-toe game. First I will write a working game interacted via the JavaScript console, then I will give it a nice UI using HTML/CSS.

This project needs to be completed using encapsulation, the module pattern (via IIFE's), and separation of concerns.

## How the Game will Work in the Console

1. The program displays an intro. Something like "Welcome to Tic-Tac-Toe!"
2. Displays a 3 x 3 grid representing the game board. I think it should be numbered so the players can choose which square to mark.
2. Asks for the names of player 1 (X) and player 2 (O).
3. Asks player 1 for their input.
4. Marks the square they chose with (X).
5. Asks player 2 for their input.
6. Marks the square they chose with (O).
7. Repeat until one of the players successfully marks three squares in a row, column, or diagonal.
8. Display which player won the game.
9. Ask if the players want to play another round.

## Code Structure for Console Edition

The entire game will be contained within three components:

1. gameBoard
2. createPlayer
3. gameBrain

### gameBoard

The `gameBoard` will manage the grid of data that represents my game. To do this I will use a 2-dimensional array, also known as a matrix. This way I can reference every point in my grid like so: `array[a][b]`.

It will also know how to modify the grid values. It will take the parameters `player` and `position`. It will then look up that `player`'s mark (X or O), and write that value to the specified `position`.

I need to remember that when modifying the grid, I shouldn't allow this function to modify a mark already made by a player. In that case, it should reject that change and return an error.

If I use an IIFE for this component, I need to return some things in an object:

- `getBoard`: method to return the game board array (for use by other components).
- `insertMark`: method to update square value (this is the modification function).
- `createNewBoard`: method to create an empty board (for new rounds).
- `displayBoard`: method to visualize game board in the console.

### createPlayer

This will be a factory function that takes the `playerName` parameter and returns player objects with the properties `playerName`, `playerNum` and `playerMark`.

#### playerId incrementor

I had to create a separate function to increment the player's ID value every time the player creating factory is called. This will increase the component count to four.

### gameBrain

The `gameBrain` handles the flow of the game. It will create the player objects, handle display of the game board, and alternate between asking each player for their input.

This will also be an IIFE. It will return:

- `playTurn`: the function players use to play a turn.

I ended up coding this component without planning too much. However, it works, for now. 

First, it creates a `gameStart` function that checks if the board is empty and creates a new one if not; since this function is only called at the beginning of the game or when the game is restarted. It then takes the player names and returns an array with 2 player objects.

The `switchPlayerTurn` function is self-explanatory, same for `displayNewTurn`.

The `checkWinner` function I had trouble with. It's a series of `for` loops that checks if any of the rows, columns, and diagonals of the board matrix has a matching set of characters and returns that character, or declares a draw.

The `gameOver` function alerts the winning player and starts a new game if the player wants.

Finally, the `playTurn` function takes a row index and a column index and either puts a mark there, stops from putting a mark on the same spot twice while allowing another turn for that player, and calls the `checkWinner` function to check for winners.

## Designing the UI

Since the console version is pretty much complete, I need to start work on the HTML/CSS. The question is, how do I link my clunky game engine to them?
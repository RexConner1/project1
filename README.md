# Project 1: Tower of Hanoi

## Description
A game where an ascending stack of rings must be moved from one rod to another where:

1. Only one ring can be moved at a time
2. No larger ring can be placed on a smaller

## Installation: 
- [Go to Game](https://xenodochial-poincare-598164.netlify.app/).


## Main Features
- Features games ranging from 3 rings to 7 rings
- Rings are able to be moved to pegs EITHER by clicking or by dragging 
- Automatic solution of puzzle (from game start)
- Checks in place to avoid illegal moves
- A scoring system based on the number of moves and the solution time

## User Stories
- Be able to start a new game of Tower of Hanoi (automatically)
- Have instructions on how to play the game
- Easily able to move rings from one ring to the next
- Not be able to make illegal moves
- Know how good I am doing (ex. timer, movement score, etc.)
- Know when the game is over, either by an message or functionality shutdown
- Be able to reset game
- Be able to change the number of rings

## Technologies Used
Vanilla Javascript, HTML, and CSS

## The Plan
- Wireframe:
![](images/wireframe.jpg)

## Unsolved Problems
- The styling/CSS structuring of the project could use a bit more creativity
- The formula used to generate the "Total Score" is arbitrary.
    - Maybe some tooltip/modal window to display the formula when hovering over it
- Make the "Solve" button work mid-game
- Hint button for next move
- Refactoring of code so ring methods are in Ring class, peg methods are in Peg class, etc.



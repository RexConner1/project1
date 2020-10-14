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

## The Approach
- Based on the wireframe image, the page itself was constructed using a grid layout
- Another grid system for the elements of the peg container (peg, rings) was considered
    - However, easier/less complicated result were achieved using flex-end containering

- Structure of a Container:
![](images/userStories.jpg)

- Javascript was were 95% of the time was spent
    - CSS was known from the beginning to be a "back burner"/platinum plan idea
    - Rather than using fixed HTML content, divs were generated using JS for all game elements
- I decided to put all objects (i.e. rings, pegs, each button, etc.) into its own separate class
    - The belief was that this would make the code easier to understand and edit
    - This did create a problem in maintaining local variables
- For every new issue or error I ran into or thought of, I added to a list of TO DO items
    - These can be seen in the "Structure of a Container" image above
- The automatic solution was "solved" using logic 
    - Uses recursion


## Unsolved Problems
- The styling/CSS structuring of the project could use a bit more creativity
- The formula used to generate the "Total Score" is arbitrary.
    - Maybe some tooltip/modal window to display the formula when hovering over it
- Make the "Solve" button work mid-game
- Hint button for next move
- Refactoring of code so ring methods are in Ring class, peg methods are in Peg class, etc.



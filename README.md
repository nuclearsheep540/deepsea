# Shots Fired!
![GA logo](/images/ga.png)

## Software Engineering Immersive: Project 1
This was the start of my 7 day game development project, as part of my 3rd week on the General Assembly SEI course.

![Game logo](images/md/logo)
## The Battleships-Minesweeper game, with a twist!
This project is built entirely with vanilla javascript, HTML and CSS.


#### Credits
Credit to the BBC Sound Effects library for use of sound effects,
Bob Bradley (PRS) for the use of Gypsy Sailor (licensed by Audio Network), Daniel Eden for use of Animate.CSS a cross-browser library of CSS animations.

#### Breif
I developed my own brief for this project, combining multiple flavors from two games; Minesweeper and Battleships. My goal was to build a game with many layers of game logic, which would enable the end user to make careful decicions during their gameplay, resulting in risk-reward scenarios.

# Deployment
Shots Fired is deployed via GitHub io and can be found at 
https://nuclearsheep540.github.io/deepsea/

![Concept](images/md/concept.png)

Shots fired is a single player game, in which the user has limited resources to discover and take out all enemy ships that are procedurally generated on a 220 tile map.

Resources are limited; the player will start with 18 cannonballs to fire, 6 Doubloons to spend at the shop, 3 health and 10 minutes to complete a quick game.

The game also generates hidden trap tiles in which will take away player lives when activated.

* Sea mines will directly affect a players health by minus 1
  
  Sea mines will trigger a proximity indicator when the player attacks a tile within a 1-tile raidus of the trap.

* Sirens are the second trap and their behavour is based on two conditions: 

  If the player has 5 or more Doubloons, the siren trap will steal 5 Doubloons.

  If the player has less than 5 Doubloons the Siren will attack the player's health directly

* Loot is also scattered across the map, in which will reward the player with 6 Doubloons when attacked. Doubloons can be spent at the store for additional cannonballs or health and also contribute to your final end score.

  Loot also has a proximity inidcator, however loot indicators are always visible on the map

  ![Game logo](images/md/arc.png)

# Shots Fired!
![GA logo](/images/ga.png)

## Software Engineering Immersive: Project 1
This was the start of my 7 day game development project, as part of my 3rd week on the General Assembly SEI course.

#
![Game logo](images/md/logo)
## The Battleships-Minesweeper game, with a twist!
This project is built entirely with vanilla javascript, HTML and CSS.


#### Credits
Credit to the BBC Sound Effects library for use of sound effects,
Bob Bradley (PRS) for the use of Gypsy Sailor (licensed by Audio Network), Daniel Eden for use of Animate.CSS a cross-browser library of CSS animations.

#
![Concept](images/md/concept.png)

#### Breif
I developed my own brief for this project, combining multiple flavors from two games; Minesweeper and Battleships. My goal was to build a game with many layers of game logic, which would enable the end user to make careful decicions during their gameplay, resulting in risk-reward scenarios.

>
>Shots fired is a single player game, in which the user has limited resources to discover and take out all enemy ships that are procedurally generated on a 220 tile map.
>
>Ships generate in a 3x1 rectangle, and can generate either vertically or horizontally on the map.
>
>Resources are limited; the player will start with 18 cannonballs to fire, 6 Doubloons to spend at the shop, 3 health and 10 minutes to complete a quick game.


A win condition is met once the player takes out all the ships. A total score is accumulated by the following:
* Every 10 seconds left on the clock rewards 1 point
* Every canonball remaining rewards 1 point
* Every doubloon earnt rewards 1 point 

    *(excluding starting money and excluding any losses throughout the game)*
* Every health remaining rewards 10 points


The game also generates hidden trap tiles in which will take away player lives when activated.

* Sea mines will directly affect a players health by minus 1
  
  Sea mines will trigger a proximity indicator when the player attacks a tile within a 1-tile raidus of the trap.

* Sirens are the second trap and their behavour is based on two conditions: 

  If the player has 5 or more Doubloons, the Siren will steal 5 Doubloons from the player.

  If the player has less than 5 Doubloons the Siren will attack the player's health directly

* Loot is also scattered across the map, in which will reward the player with 6 Doubloons when attacked. 

  Doubloons can be spent at the store for additional cannonballs or health and also contribute to your final end score.

  Loot also has a proximity inidcator, however loot indicators are always visible on the map

  ![Game logo](images/md/arc.png)

# Deployment
Shots Fired is deployed via GitHub io and can be found at 
https://nuclearsheep540.github.io/deepsea/

# Architecture
The player starts in the centre of a 20x11 (220 tile) map.

Arrow Keys, AWSD Keys are programmed to move the attack cursor and Spacebar is programmed to perform an attack
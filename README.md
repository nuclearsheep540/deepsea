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

Lose conditions are defined, if any of the following are met:

* The timer runs out
* Player runs out of health
* Player runs out of Cannonballs and has less than 6 Doubloons to purchase more

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

# Design

In order to work around google chromes auto-play blocker, Shots Fired! has a landing page requesting user input to initate the page's logic and assets.

![start](images/md/start.png)

In order to support multiple layers within the site, I built a 'home page' for the game. All 'pages' are controlled with event listeners toggling CSS styling, this prevents users from making multiple calls to a server every time they want to navigate through the game menus, and also creates a more steamlined experience, visually as well as in terms of responsiveness.

![home](images/md/home.png)



The player starts in the centre of a 20x11 (220 tile) map.

Arrow Keys, AWSD Keys are programmed to move the attack cursor and Spacebar is programmed to perform an attack.

![stage2](images/md/stage2.png)
![stage2inPlay](images/md/stage2inPlay.png)

Visuals indicate what you're interacting with:
* Treasure chests indicate you've struck Doubloons
* Ships indicate you've successfully hit a Ship
* Sirens indicate you just hit a Siren
* Black mins indicate you just hit a Sea Mine
* Red Exclamation marks indicate you're within proximity of a Sea Mine
* Grayed blocks indicate somewhere you've attacked, which had nothing there.
* The red crosshair indcates your current targetting position

On every attack, multiple checked are being performed:
* If the game has started yet

 *The game can be paused, and navigated away mid-game by clicking the home button at any point*

* Is the player still in-play
* Are attack conditions met; 
    * Has the canon has successfully completed it's re-loaded
    * Are there sufficient cannonballs remaining
    * Has the tile targeted, not already been fired at
* What is under the tile, that needs to be displayed post-attack
* What values are being returned to the player, post-attack
    
*If any of these conditions dont comply, the game will react accordingly to whatever condition didnt pass the check. i.e attacking the same tile will not fire the cannon, or running out of cannons with no money left will result in a lost game, or if the player is not in play all input is to be ignored.*


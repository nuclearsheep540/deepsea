console.log('javascript enabled')
document.addEventListener('DOMContentLoaded', () => {
  // vvvvv declare variables below vvvvv
  const modebutton = document.querySelectorAll('.mode')
  const stage0 = document.querySelector('.stage0')
  const stage1 = document.querySelector('.stage1')
  const stage2 = document.querySelector('.stage2')
  const stage3 = document.querySelector('.stage3')
  const cannon = document.querySelector('.cannon')
  const backButton = document.querySelector('button.left')
  const nextButton = document.querySelector('.right')


  // ^^^^^ declare variables above ^^^^^

  // **************************************//
  // **** declare Game mode functions **** //
  // **************************************//

  // these hide existing UI and setup Game mode UI ...
  // select tutorial or play
  function GameStartTutorial() {
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage1.classList.remove('hide')
      cannon.classList.remove('hide')
      console.log('gamestart complete')
    }, 1500)
  }// end of GameStartTutorial

  function GameStartPlay() {
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage2.classList.remove('hide')
      cannon.classList.remove('hide')
      console.log('gamestart complete')
    }, 1500)
  }// end of setTimeout Function

  // **************************************//
  // ************** BUTTONS ***************//
  // **************************************//

  // back button
  backButton.addEventListener('click', e => {
    setTimeout(function () {
      stage1.classList.add('hide')
      stage2.classList.add('hide')
      stage3.classList.add('hide')
      cannon.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage0.classList.remove('hide')
      console.log('returned home')
    }, 1500)

  })// end of back button

  // NEXT BUTTON
  // if (stage0.classList.contains('hide') ||
  //     stage1.classList.contains('hide')) {
  //   nextButton.style.visibility = 'hidden'
  // } else {
  //   nextButton.style.visibility = 'visible'
  // }
  nextButton.addEventListener('click', e => {
    setTimeout(function () {
      stage2.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage3.classList.remove('hide')
      console.log('stage 3... ready')
    }, 1500)
  })// end of next button


  // game mode buttons
  modebutton.forEach(element =>
    element.addEventListener('click', e => {
      if (e.target.id === 'tutorial') {
        console.log('tutorial starting')
        GameStartTutorial()
      } else if (e.target.id === 'play') {
        console.log('game play starting')
        GameStartPlay()
      }
    })//end of event listener
  )//end of modebutton

  // **************************************//
  // ************ GAME LOGIC **************//
  // **************************************//

  //scoreboard
  let score = 0
  const ui = document.querySelectorAll('.ui')
  ui[0].textContent = `Score \n ${score}`

  //points
  const boatPoints = 5
  const lootPoints = 10
  const trapPoints = -5







  const play = document.querySelector('#play')
  //SHOW WHERE THE PLAYER IS BY UPDATING CLASS
  function handleClick(e) {
    e.target.classList.add('player')
  }

  //CHECK GAME HAS STARTED BEFORE LOADING GRID AND
  //BEFORE RECORDING MOVES AND ATTACKS
  play.addEventListener('click', () => {
    console.log('game script enabled')

    //RULES OF THE GRID
    const grid = document.querySelector('.grid')
    const width = 18
    const cells = []
    let playerIdx = 81


    //GENERATE 9 x 18 GAMEBOARD
    for (let i = 0; i < width * 9; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.addEventListener('click', handleClick)
    }//END OF GAME BOARD GEN

    //hard code boats
    let boats = cells.slice(4, 7)
    boats.forEach((e) => {
      e.classList.add('boat')
    })
    //hard code loot
    let loot = [cells[1], cells[55], cells[32]]
    loot.forEach((e) => {
      e.classList.add('loot')
    })
    //hard code traps
    let trap = [cells[10], cells[110], cells[132]]
    trap.forEach((e) => {
      e.classList.add('trap')
    })

    //START PLAYER @ playerIdx
    cells[playerIdx].classList.add('player')
    

    //KEY DOWN LISTENER >> MOVE PLAYER
    document.addEventListener('keydown', (e) => {
      cells[playerIdx].classList.remove('player')
      const x = playerIdx % width
      const y = Math.floor(playerIdx / width)
      switch (e.keyCode) {
        //left
        case 37: if (x > 0) playerIdx -= 1
          break
        case 65: if (x > 0) playerIdx -= 1
          break
        // up  
        case 38: if (y > 0) playerIdx -= width
          break
        case 87: if (y > 0) playerIdx -= width
          break
        // right
        case 39: if (x < width - 1) playerIdx += 1
          break
        case 68: if (x < width - 1) playerIdx += 1
          break
        //down  
        case 40: if (y < 8) playerIdx += width
          break
        case 83: if (y < 8) playerIdx += width
          break
      }
      cells[playerIdx].classList.add('player')
    })//END OF KEY DOWN LISTENER

    // ATTACK!
    document.addEventListener('keydown', (e) => {

      if (e.keyCode === 32) {
        if (cells[playerIdx].classList === 'loot'){
          console.log('loot')
        } else {
          cells[playerIdx].classList.add('attack')
          console.log(playerIdx)
        }
        
      }

      // add if statement, if attack hit = true


    })//END OF ATTACK



  })

})
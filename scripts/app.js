console.log('javascript enabled')
document.addEventListener('DOMContentLoaded', () => {
  // vvvvv declare variables below vvvvv
  const modebutton = document.querySelectorAll('.mode')
  const stage0 = document.querySelector('.stage0')
  const stage1 = document.querySelector('.stage1')
  const stage2 = document.querySelector('.stage2')
  const stage3 = document.querySelector('.stage3')
  const cannon = document.querySelector('.cannon')
  const cannonballs = []
  const backButton = document.querySelector('button.left')
  const nextButton = document.querySelector('.right')
  const grid = document.querySelector('.grid')



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

  function GameQuickPlay() {
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage2.classList.remove('hide')
      cannon.classList.remove('hide')
      console.log('gamestart complete')
      //LOAD THE CANNONBALLS
      let cannonball = 0
      const timerId = setInterval(() => {

        const balls = document.createElement('div') //the object
        cannon.appendChild(balls) //the html object storing the array
        cannonballs.push(balls) //the array pushing the objects
        cannonballs.forEach((item) => {
          return item.classList.add('balls')
        })
      }, 150)
      setTimeout(() => {
        clearInterval(timerId)
        return
      }, 1500)
      //CANONBALLS READY
    }, 1500)
  }// end of setTimeout Function

  // **************************************//
  // ************** BUTTONS ***************//
  // **************************************//

  // back button
  backButton.addEventListener('click', e => {
    grid.innerHTML = ''

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
        console.log('quickplay starting')
        GameQuickPlay()
      }
    })//end of event listener
  )//end of modebutton

  // **************************************//
  // ************ GAME LOGIC **************//
  // **************************************//

  // **** USER INTERFACE **** //
  let score = 0
  const ui = document.querySelectorAll('.ui')
  window.addEventListener('keydown', () => {
    ui[0].textContent = `Doubloons \n ${score}`

  })
  let health = [1, 1, 1]
  ui[2].textContent = `${health}`





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

    const width = 18
    const cells = []
    let playerIdx = 81
    let gamestate = false
    console.log(gamestate)

    //GAME BOARD GEN >> GENERATE 9 x 18 GAMEBOARD
    if (gamestate === false) {

      for (let i = 0; i < width * 9; i++) {
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cells.push(cell)

        // cell.addEventListener('click', handleClick)
      } console.log('gamestate now active')
      gamestate = true
    } else {
      return
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
    //hard code siren
    let siren = [cells[102], cells[77]]
    siren.forEach((e) => {
      e.classList.add('siren')
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
    function attack() {
      //if the cell player is on has loot boats or trap, mark a hit and check for loot
      if (cells[playerIdx].classList.contains('loot', 'boat', 'trap')) {
        console.log('landed a hit..')
      } //if loot is the following, perform the loot check
      if (cells[playerIdx].classList.contains('loot')) {
        console.log('you found loot')
        cells[playerIdx].classList.remove('loot')
        cells[playerIdx].classList.add('hit')
        return score += 15
      } else if (cells[playerIdx].classList.contains('boat')) {
        console.log('you hit a boat')
        cells[playerIdx].classList.remove('boat')
        cells[playerIdx].classList.add('hit')
        return score += 5
      } else if (cells[playerIdx].classList.contains('trap')) {
        console.log('you hit trap and lost a life')
        cells[playerIdx].classList.remove('trap')
        cells[playerIdx].classList.add('hit')
        health.pop()
        return ui[2].textContent = `${health}`
      } else if (cells[playerIdx].classList.contains('siren')) {
        console.log('you hit a siren... she steals 5 Doubloons')
        cells[playerIdx].classList.remove('siren')
        cells[playerIdx].classList.add('hit')
        return score -= 5
      } else {
        console.log('you missed')
        cells[playerIdx].classList.add('miss')
        cells[playerIdx].classList.add('hit')
      }
    }
    function attackCheck() {
      //if the cell, the player is on has not been attacked and there are cannonballs
      if (cells[playerIdx].classList.contains('attack') === false && cannon.childNodes.length > 1) {
        let ammo = document.querySelector('.balls')
        cannon.removeChild(ammo)
        console.log(playerIdx)
        console.log('attack!..')
        attack()
        return cells[playerIdx].classList.add('attack')
      } else {
        console.log('cant attack here')
        return
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        attackCheck()
      }
    })

    //END OF ATTACK
  })
})
console.log('javascript enabled')
document.addEventListener('DOMContentLoaded', () => {
  // vvvvv declare variables below vvvvv
  const modebutton = document.querySelectorAll('.mode')
  const ready = document.querySelector('.readystate')
  const stage0 = document.querySelector('.stage0')
  const options = document.querySelector('#options')
  const inventory = document.querySelector('.inventory')
  const stage1 = document.querySelector('.stage1')
  const stage2 = document.querySelector('.stage2')
  const stage3 = document.querySelector('.stage3')
  const cannon = document.querySelector('.cannon')
  const cannonballs = []
  const backButton = document.querySelector('button.left')
  const nextButton = document.querySelector('.right')
  const grid = document.querySelector('.grid')
  const ambi = new Audio('seasong.mp3')
  const bgm = new Audio('bgm.mp3')
  let gamestate = false


  readyState()



  // ^^^^^ declare variables above ^^^^^

  // **************************************//
  // **** declare Game mode functions **** //
  // **************************************//

  // these hide existing UI and setup Game mode UI ...
  // select tutorial or play
  function readyState() {
    if (gamestate === false) {
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 32 && gamestate === false) {
          console.log('booting up...')
          ready.classList.add('hide')
          stage0.classList.remove('hide')
          ambi.play()
          bgm.play()
        } else if (gamestate !== false) {
          return
        }
      })
    }
  }//end of readyState

  function GameStartTutorial() {
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage1.classList.remove('hide')
      cannon.classList.remove('hide')
      console.log('gamestart complete')
      console.log('gamestate ' + gamestate)
    }, 1500)
  }// end of GameStartTutorial

  function GameQuickPlay() {
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage2.classList.remove('hide')
      cannon.classList.remove('hide')
      inventory.classList.remove('hide')
      console.log('gamestart complete')
      console.log('gamestate ' + gamestate)
      //LOAD THE CANNONBALLS
      const timerId = setInterval(() => {
        const balls = document.createElement('div') //the object
        cannon.appendChild(balls) //the html object storing the array
        cannonballs.push(balls) //the array pushing the objects
        cannonballs.forEach((item) => {
          return item.classList.add('balls')
        })
      }, 125)
      setTimeout(() => {
        clearInterval(timerId)
        return
      }, 2500)
      //CANONBALLS READY
    }, 1500)
  }// end of setTimeout Function

  // **************************************//
  // ************** BUTTONS ***************//
  // **************************************//

  // back button
  backButton.addEventListener('click', e => {
    grid.innerHTML = ''
    cannon.innerHTML = '<p>Cannonballs</p>'
    gamestate = false
    console.log('gamestate ' + gamestate)

    setTimeout(function () {
      stage1.classList.add('hide')
      stage2.classList.add('hide')
      stage3.classList.add('hide')
      cannon.classList.add('hide')
      inventory.classList.add('hide')
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
      } else if (e.target.id === 'options') {
        console.log('toggled music')
        bgm.paused ? options.innerHTML = 'Music On' : options.innerHTML = 'Music Off'
        bgm.paused ? bgm.play() : bgm.pause()
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

    //**** RULES OF THE GRID **** //

    const width = 20
    const cells = []
    let playerIdx = 81
    console.log('gamestate ' + gamestate)

    //GAME BOARD GEN >> GENERATE 9 x 18 GAMEBOARD
    if (gamestate === false) {

      for (let i = 0; i < width * 11; i++) {
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cells.push(cell)

        // cell.addEventListener('click', handleClick)
      } console.log('gamestate now active')
      gamestate = true
    } else {
      return
    }//END OF GAME BOARD GEN
  
     //  COMPUTER GENERATED OBJECTS
     function randomiseOne(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
    function retry() {
      // re call randomise on the const until condition is met
    }

    // **** OBJECT GENERATION **** //
    //GENERATE HORIZONTAL BOATS
    let boatH = []
    function makeBoatH() {
      boatH.length = 1
      boatH[0] = (randomiseOne(219))
      if (boatH[0] === (width % width < 2)){
        boatH[0].shift()
        boatH[0].push(randomiseOne(219)) 
        console.log(boatH) 
      } else {
        boatH.push(boatH[0] + 1)
        boatH.push(boatH[0] + 2)
        console.log(boatH)
      }
    }makeBoatH()
    boatH.forEach((e, index, arr) => {
      cells[e].classList.add('boat')
    })


    //GENERATE TRAPS
    let trap = []
    function makeTrap() {
      for (let i = 0; i < 7; i++) {
        let add = (randomiseOne(219))
        trap.push(add)
        if (trap.contains === trap.some) {
          this.pop()
          this.push(randomiseOne(219))
        }
      }
    } makeTrap()
    trap.forEach((e, index, arr) => {
      cells[e].classList.add('trap')
      console.log('traps ' + trap)
    })

    //GENERATE LOOT
    let loot = []
    function makeLoot() {
      for (let i = 0; i < 5; i++) {
        let add = (randomiseOne(219))
        loot.push(add)
        if (loot.contains === trap.some || loot.contains === loot.some) {
          this.pop()
          this.push(randomiseOne(219))
        }
      }
    } makeLoot()
    loot.forEach((e, index, arr) => {
      cells[e].classList.add('loot')
      console.log('loot ' + loot)
    })

    //GENERATE SIRENS
    let sirens = []
    function makeSirens() {
      for (let i = 0; i < 4; i++) {
        let add = randomiseOne(219)
        sirens.push(add)
        if (sirens.contains === loot.some || sirens.contains === trap.some || sirens.contains === sirens.some) {
          this.pop()
          this.push(randomiseOne(219))
        }
      }
    } makeSirens()
    sirens.forEach((e, index, arr) => {
      cells[e].classList.add('siren')
      console.log('sirens ' + sirens)
    })

    //START PLAYER @ playerIdx
    cells[playerIdx].classList.add('player')

    // **** KEY EVENTS **** //
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
        case 40: if (y < 10) playerIdx += width
          break
        case 83: if (y < 10) playerIdx += width
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
        console.log(health + 'health')
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
      if (cells[playerIdx].classList.contains('attack') === false && cannon.childNodes.length > 1 && health.length > 0) {
        let ammo = document.querySelector('.balls')
        cannon.removeChild(ammo)
        console.log(playerIdx)
        console.log('attack!..')
        attack()
        return cells[playerIdx].classList.add('attack')
      } else {
        console.log('unable to attack, check attack conditions')
        return
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        attackCheck()
        if (health.length === 0) {
          console.log('you lose!')
          alert('Avast ye swab! Ye dun out of ships! Better luck next time, eh?')
        }
      }
    })
  })
})
console.log('javascript enabled')
document.addEventListener('DOMContentLoaded', () => {
  // vvvvv declare variables below vvvvv
  const counterChild = document.createElement('div')
  const counterLeft = document.querySelector('.counterLeft')
  const win = document.querySelector('.stage2win')
  const lose = document.querySelector('.stage2lose')
  const p = document.querySelectorAll('.how')
  const bod = document.querySelector('.bod')
  const modebutton = document.querySelectorAll('.mode')
  const ready = document.querySelector('.readystate')
  const stage0 = document.querySelector('.stage0')
  const options = document.querySelector('#options')
  const inventory = document.querySelector('.inventory')
  const shop = document.querySelector('.shop')
  const shopButton = document.querySelectorAll('.store')
  const help1 = document.querySelector('.help1')
  const help2 = document.querySelector('.help2')
  const stage1 = document.querySelector('.stage1')
  const stage1b = document.querySelector('.stage1-2')
  const stage2 = document.querySelector('.stage2')
  const stage3 = document.querySelector('.stage3')
  const cannon = document.querySelector('.cannon')
  const counter = document.querySelector('.counter')
  const ships = document.getElementsByClassName('boat')
  const selectModeH = document.querySelector('.selectModeH')
  let cannonballs = []
  const backButton = document.querySelector('button.left')
  const nextButton = document.querySelector('.right')
  const grid = document.querySelector('.grid')
  const ambi = new Audio('audio/seasong2.mp3')
  ambi.loop = true
  const bgm = new Audio('audio/bgm.mp3')
  bgm.volume = 0.3
  bgm.loop = true
  const bgmNight = new Audio('audio/bgmnight.mp3')
  bgmNight.volume = 0.3
  bgmNight.loop = true
  const fire = new Audio('audio/cannon.mp3')
  const missMp3 = new Audio('audio/miss.mp3')
  const boatMp3 = new Audio('audio/boathit.mp3')
  const lootMp3 = new Audio('audio/loothit.mp3')
  lootMp3.volume = 0.6
  const trapMp3 = new Audio('audio/traphit.mp3')
  const sirenMp3 = new Audio('audio/sirenhit.mp3')
  const BuyLifeMp3 = new Audio('audio/buyLife.mp3')
  BuyLifeMp3.volume = 0.8
  const BuyAmmoMp3 = new Audio('audio/buyammo.mp3')
  const pirateMp3 = new Audio('audio/pirate.mp3')
  pirateMp3.volume = 0.5
  const alertMp3 = new Audio('audio/alert.mp3')
  const logo = document.querySelector('.logo')
  var doubloons = 0

  let gamestate = false
  const width = 20
  let cells = []
  let playerIdx = 110
  let keyLoaded = true
  let reloading = false

  var numb = 1

  var timerId


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
          backButton.classList.remove('stealth')
          const ui = document.querySelector('.ui-container')
          ui.classList.remove('stealth')
          ready.classList.add('hide')
          stage0.classList.remove('hide')
          ambi.play()
          bgm.play()
          if (grid.childElementCount < 1) {
            console.log('cant resume: no game grid')
            modebutton[2].classList.add('noResume')
            modebutton[2].disabled = true
          } else if (grid.childElementCount > 1) {
            modebutton[2].classList.remove('noResume')
            modebutton[2].disabled = false
          }
        } else if (gamestate !== false) {
          return
        }
      })
    }
  }//end of readyState


  // **** YE OLE SHOPPE **** //
  // BUY CANNONBALLS
  shopButton[1].addEventListener('click', (e) => {
    console.log(e)
    if (score >= 6) {
      shopButton[1].disabled = true
      console.log('shop testing - input receieved')
      BuyAmmoMp3.play()
      const newMsg = document.createElement('p')
      const msg = document.createTextNode('Bought 6x Cannonballs')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)

      setTimeout(function () {
        inventory.removeChild(newMsg)
        
      }, 8000)
      setTimeout(function () {
        shopButton[1].disabled = false
      },1000)

      const reloadTime = setInterval(() => {
        score--
        const balls = document.createElement('div') //the object
        cannon.appendChild(balls) //the html object storing the array
        cannonballs.push(balls) //the array pushing the objects
        ui[0].innerHTML = `Doubloons ${score}`
        cannonballs.forEach((item) => {
          item.classList.add('balls')
        })
        counter.innerHTML = `canonballs x ${cannonballs.length}`
      }, 250)
      setTimeout(() => {
        shopButton[1].blur()
        clearInterval(reloadTime)
        return
      }, 1500)

      //Canonballs Purchased
    } else {
      const newMsg = document.createElement('p')
      const msg = document.createTextNode('Not enough Doubloons')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 8000)
    }
  }, 500)


  //BUY LIVES
  shopButton[2].addEventListener('click', () => {
    if (score >= 10) {
      BuyLifeMp3.play()
      let newMsg = document.createElement('p')
      let msg = document.createTextNode('Bought an extra Life')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 5000)
      let reloadTime = setInterval(() => {
        score -= 10
        health.push(1)
        health.fill('⚓️')
        ui[2].innerHTML = `${health}`
        ui[0].textContent = `Doubloons \n ${score}`
      }, 100)
      setTimeout(() => {
        shopButton[2].blur()
        clearInterval(reloadTime)
        return
      }, 101)
      //Canonballs Purchased
    } else {
      let newMsg = document.createElement('p')
      let msg = document.createTextNode('Not enough Doubloons')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 8000)
    }
  })




  // end of shop button

  function GameStartTutorial() {

    stage2.classList.remove('fadeOut')
    inventory.classList.remove('fadeOut')
    shop.classList.remove('fadeOut')
    cannon.classList.remove('fadeOut')

    selectModeH.classList.add('animated', 'bounceOut')
    modebutton[0].classList.add('animated', 'bounceOut')
    setTimeout(() => {
      modebutton[1].classList.add('animated', 'bounceOut')
    }, 50)
    setTimeout(() => {
      modebutton[2].classList.add('animated', 'bounceOut')
    }, 100)
    setTimeout(() => {
      modebutton[3].classList.add('animated', 'bounceOut')
    }, 100)

    setTimeout(() => {
      modebutton.forEach(element => {
        element.classList.remove('bounceOut')
      })
    }, 1000)

    gamestate = true
    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage1.classList.remove('hide')
      console.log('gamestart complete')
      console.log('gamestate ' + gamestate)
    }, 1500)
  }// end of GameStartTutorial

  function GameQuickPlay() {
    stage2.classList.remove('fadeOut')
    inventory.classList.remove('fadeOut')
    shop.classList.remove('fadeOut')
    cannon.classList.remove('fadeOut')
    clearInterval(timerId)
    pirateMp3.play()
    keyPress()
    nextButton.classList.add('stealth')
    numb = 603
    health = [1, 1, 1]
    health.fill('⚓️')
    ui[2].textContent = `${health}`
    cells = []
    score = 6
    ui[0].textContent = `Doubloons \n ${score}`
    grid.innerHTML = ''
    cannon.innerHTML = ''
    cannonballs = []

    //animate buttons

    selectModeH.classList.add('animated', 'bounceOut')
    modebutton[0].classList.add('animated', 'bounceOut')
    setTimeout(() => {
      modebutton[1].classList.add('animated', 'bounceOut')
    }, 50)
    setTimeout(() => {
      modebutton[2].classList.add('animated', 'bounceOut')
    }, 100)
    setTimeout(() => {
      modebutton[3].classList.add('animated', 'bounceOut')
    }, 100)
    setTimeout(() => {
      modebutton.forEach(element => {
        element.classList.remove('bounceOut')
        selectModeH.classList.remove('fadeIn')
        stage2.classList.add('animated', 'fadeIn')
        inventory.classList.add('animated', 'fadeIn')
        shop.classList.add('animated', 'fadeIn')
        cannon.classList.add('animated', 'fadeIn')
      })
    }, 1000)

    setTimeout(function () {
      stage0.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage2.classList.remove('hide')
      cannon.classList.remove('hide')
      shop.classList.remove('hide')
      inventory.classList.remove('hide')
      // shop.classList.remove('hide')
      console.log('gamestart complete')
      console.log('gamestate ' + gamestate)
      cannon.appendChild(counterChild)
      counterChild.classList.add('counterLeft')
      counterChild.appendChild(counter)
      counter.classList.add('counter')
      
      //LOAD THE CANNONBALLS
      const timerId = setInterval(() => {
        const balls = document.createElement('div') //the object
        cannon.appendChild(balls) //the html object storing the array
        cannonballs.push(balls) //the array pushing the objects
        cannonballs.forEach((item) => {
          counter.innerHTML = `canonballs x ${cannonballs.length}`
          item.classList.add('balls')
        })
      }, 90)
      setTimeout(() => {
        clearInterval(timerId)
        return
      }, 1620)
      //CANONBALLS READY
    }, 1500)
  }// end of setTimeout Function

  function ResumePlay() {
    stage2.classList.remove('fadeOut')
    inventory.classList.remove('fadeOut')
    shop.classList.remove('fadeOut')
    cannon.classList.remove('fadeOut')
    selectModeH.classList.add('animated', 'bounceOut')
    modebutton[0].classList.add('animated', 'bounceOut')
    setTimeout(() => {
      modebutton[1].classList.add('animated', 'bounceOut')
    }, 50)
    setTimeout(() => {
      modebutton[2].classList.add('animated', 'bounceOut')
    }, 100)
    setTimeout(() => {
      modebutton[3].classList.add('animated', 'bounceOut')
    }, 100)

    setTimeout(() => {
      modebutton.forEach(element => {
        element.classList.remove('bounceOut')
      })
    }, 1000)

    gamestate = false

    setTimeout(function () {
      stage0.classList.add('hide')
      setTimeout(function () {
        stage2.classList.remove('hide')
        cannon.classList.remove('hide')
        shop.classList.remove('hide')
        inventory.classList.remove('hide')
        // shop.classList.remove('hide')
        console.log('gamestart complete')
        gamestate = true
        console.log('gamestate ' + gamestate)
        cannon.appendChild(counter)
        counter.classList.add('counter')
        cannonballs.forEach((item) => {
          counter.innerHTML = `canonballs x ${cannonballs.length}`
          item.classList.add('balls')
        })
      })
    }, 1000)

  }

  // **************************************//
  // ************** BUTTONS ***************//
  // **************************************//
  let dayFadeout
  let nightFadeout
  let nightMode = false
  // ^v^v making dark mode ^v^v
  logo.addEventListener('click', () => {
    if (nightMode === false) {
      p.forEach((element) => {
        console.log('changing a p color')
        element.style.color = 'white'
      })
      bod.classList.add('animated', 'fadeIn')
      bod.style.backgroundImage = ('url(./images/seanight.jpg)')
      bgmNight.play()
      bgmNight.volume = 0.3
      dayFadeout = setInterval(() => {
        bgm.volume -= .01
      }, 40)
      setTimeout(() => {
        clearInterval(dayFadeout)
      }, 1160)
      nightMode = true
      bod.classList.remove('fadeIn')
    } else if (nightMode === true) {
      p.forEach((element) => {
        console.log('changing a p color')
        element.style.color = 'black'
      })
      bod.classList.add('fadeIn')
      bod.style.backgroundImage = ('url(./images/sea.jpg)')
      bgm.play()
      bgm.volume = 0.3
      nightFadeout = setInterval(() => {
        bgmNight.volume -= .01
      }, 40)
      setTimeout(() => {
        clearInterval(nightFadeout)
      }, 1160)
      nightMode = false
      bod.classList.remove('fadeIn')
    }
  })

  //next help button
  help1.addEventListener('click', () => {
    setTimeout(function () {
      stage1.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage1b.classList.remove('hide')
      console.log('returned home')
    }, 1500)
  })
  //help back button
  help2.addEventListener('click', () => {
    setTimeout(function () {
      stage1b.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage1.classList.remove('hide')
      console.log('returned home')
    }, 1500)
  })

  // home button
  backButton.addEventListener('click', () => {
    selectModeH.classList.remove('bounceOut')
    stage2.classList.add('fadeOut')
    inventory.classList.add('fadeOut')
    shop.classList.add('fadeOut')
    cannon.classList.add('fadeOut')
    console.log('clicked')
    gamestate = false
    if (grid.childElementCount < 1) {
      console.log('cant resume: no game grid')
      modebutton[2].classList.add('noResume')
      modebutton[2].disabled = true
    } else if (grid.childElementCount > 1) {
      modebutton[2].classList.remove('noResume')
      modebutton[2].disabled = false
    }
    console.log('gamestate ' + gamestate)
    setTimeout(function () {
      win.classList.add('hide')
      lose.classList.add('hide')
      stage1b.classList.add('hide')
      stage1.classList.add('hide')
      stage2.classList.add('hide')
      stage3.classList.add('hide')
      cannon.classList.add('hide')
      shop.classList.add('hide')
      inventory.classList.add('hide')
    }, 1000)
    setTimeout(function () {
      stage0.classList.remove('hide')
      console.log('returned home')
    }, 1500)

  })// end of back button

  nextButton.addEventListener('click', () => {
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
      } else if (e.target.id === 'resume') {
        console.log('resuming play ')
        ResumePlay()
      } else if (e.target.id === 'options') {
        if (nightMode === false) {
          console.log('toggled music')
          bgm.paused ? options.innerHTML = 'Music On' : options.innerHTML = 'Music Off'
          bgm.paused ? bgm.play() : bgm.pause()
        } else if (nightMode === true) {
          console.log('toggled music')
          bgmNight.paused ? options.innerHTML = 'Music On' : options.innerHTML = 'Music Off'
          bgmNight.paused ? bgmNight.play() : bgmNight.pause()
        }
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
  health.fill('⚓️')
  ui[2].textContent = `${health}`


  function loser() {
    lose.classList.remove('hide')
    const newMsg = document.createElement('p')
    const msg = document.createTextNode('you lose!')
    newMsg.appendChild(msg)
    lose.appendChild(newMsg)
    setTimeout(() => {
      lose.removeChild(newMsg)
    }, 30000)
    console.log('you lose')

  }

  modebutton[1].addEventListener('click', () => {
    timerId = setInterval(() => {
      var seconds = numb % 60
      var minutes = Math.floor(numb / 60)
      if (numb === 0) {
        setTimeout(() => {
          clearInterval(timerId)
          ui[1].innerHTML = `${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} : ${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
          return loser()
        }, 0)
      } else if (gamestate === true) {
        numb--
        // console.log(numb)
        ui[1].innerHTML = `${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} : ${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
      } else if (gamestate === false) {

        // console.log(numb)
        ui[1].innerHTML = `${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} : ${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
      }
    }, 1000)
  })



  const play = document.querySelector('#play')
  //SHOW WHERE THE PLAYER IS BY UPDATING CLASS


  // function handleClick(e) {
  //   e.target.classList.add('player')
  // }

  //CHECK GAME HAS STARTED BEFORE LOADING GRID AND
  //BEFORE RECORDING MOVES AND ATTACKS
  play.addEventListener('click', () => {
    console.log('game script enabled')
    console.log('gamestate = ' + gamestate)

    //**** RULES OF THE GRID **** //

    //GAME BOARD GEN >> GENERATE 20 x 11 GAMEBOARD
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
    }//**** END OF GRID GEN **** //


    // **** OBJECT GENERATION **** //

    //  COMPUTER GENERATED OBJECTS
    function randomiseOne(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    //GENERATE HORIZONTAL BOATS
    const boatH = []

    function check() {
      boatH[0] = randomiseOne(216)
      console.log('outside the while', boatH[0] % width)
      while ((boatH[0] % width) > width - 3) {
        boatH[0] = randomiseOne(216)
        console.log('inside', boatH[0] % width)
      }
    }

    for (let i = 0; i < 3; i++) {
      check()
      makeBoatH()
    }

    function makeBoatH() {
      boatH.push(boatH[0] + 1)
      boatH.push(boatH[0] + 2)
      console.log('boat h = ' + boatH)
      boatH.forEach((e) => {
        cells[e].classList.add('boat')
      })
    } //END OF GENERATE HORIZONTAL BOAT

    // GENERATE VERTICAL BOATS
    const boatV = []
    function makeBoatV() {
      boatV.length = 1
      boatV[0] = (randomiseOne(179))
      boatV.push(boatV[0] + 20)
      boatV.push(boatV[0] + 40)
    }
    for (let i = 0; i < 3; i++) {
      makeBoatV()
      boatV.forEach((e) => {
        cells[e].classList.add('boat')
      })
    }


    // GENERATE SIRENS
    // CREATE PLACEMENT CHECK
    const sirens = []
    function checkSirens() {
      sirens.pop()
      console.log('removing bad siren')
      makeSirens()
      console.log('calling sirens again')
    }
    function makeSirens() {
      // console.log('attempting to make a siren')
      const add = randomiseOne(219)

      if (cells[add].classList.length < 1) {
        // console.log('found a tile')
        sirens.push(add)
        // console.log('adding siren to ' + sirens)
      } else {
        // console.log(add + ' was in use')
        checkSirens()
      }
    }
    for (let i = 0; i < 6; i++) {
      makeSirens()
    }
    sirens.forEach((e) => {
      cells[e].classList.add('siren')
      // console.log('sirens ' + sirens)
    })

    // GENERATE TRAPS
    // CREATE PLACEMENT CHECK
    const trap = []
    function checkTrap() {
      trap.pop()
      // console.log('removing bad trap from array')
      makeTrap()
      // console.log('calling trap again')
    }
    function makeTrap() {
      console.log('attempting to make trap')
      const add = (randomiseOne(219))
      if (cells[add].classList.length < 1) {
        // console.log('found a tile')
        trap.push(add)
        // console.log('adding trap to ' + trap)
      } else {
        (trap + ' was in use, running check')
        checkTrap()
      }
    }
    for (let i = 0; trap.length < 8; i++) {
      makeTrap()
    }
    trap.forEach((e) => {
      cells[e].classList.add('trap')
      // console.log('traps ' + trap)
    })

    // GENERATE LOOT
    // CREATE PLACEMENT CHECK

    const loot = []
    function checkLoot() { //remove loot and make again
      loot.pop()
      // console.log('removing bad loot from array')
      makeLoot()
      // console.log('calling loot again')
    }
    function makeLoot() { //make the loot
      console.log('attempting to make loot')
      const add = (randomiseOne(219)) //choose a tile
      if (cells[add].classList.length < 1) { //if tile is available
        // console.log('found a tile')
        loot.push(add) //add to loot
        // console.log('adding loot to ' + add)
      } else {
        // console.log(add + ' was in use, running check')
        checkLoot() //run check
      }
    }
    for (let i = 0; loot.length < 20; i++) {
      // while there is less than 20 loot, make loot
      makeLoot()
    }
    loot.forEach((e) => { //style every loot there is
      cells[e].classList.add('loot')
      console.log('loot ' + loot)
    })

    loot.forEach((e) => { //show proximity of loot
      function proxRoll() {
        const roll = Math.floor(randomiseOne(10))
        if (roll === 1) {
          if (cells[e + 19]) {
            cells[e + 19].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 2) {
          if (cells[e + 20]) {
            cells[e + 20].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 3) {
          if (cells[e + 21]) {
            cells[e + 21].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 4) {
          if (cells[e - 1]) {
            cells[e - 1].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 5) {
          if (cells[e + 1]) {
            cells[e + 1].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 6) {
          if (cells[e + 19]) {
            cells[e + 19].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 7) {
          if (cells[e + 20]) {
            cells[e + 20].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 8) {
          if (cells[e + 21]) {
            cells[e + 21].classList.add('loot-prox')
          } else {
            proxRoll()
          }
        } else if (roll === 9 || roll === 10) {
          if (cells[e]) {
            cells[e].classList.add('loot-prox')
          } else {
            proxRoll()
          }
        }
      }
      proxRoll()
    })

    //CHANCE FOR SWEET ITEMS
    function extraHealth() {
      health.push(1)
      health.fill('⚓️')
      ui[2].textContent = `${health}`
      const newMsg = document.createElement('p')
      const msg = document.createTextNode('You gained 1 Health')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 8000)
    }

    // function kegPowder() {
    //   //make next attack hit adjacent tiles
    // }
    // function spyGlass() {
    //   //reveal whats under the cursor for 15 seconds
    // }
    function extraAmmo() {
      const newMsg = document.createElement('p')
      const msg = document.createTextNode('You found 4x cannonballs!')
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 8000)
      for (let i = 0; i < 5; i++) {
        const balls = document.createElement('div')
        cannon.appendChild(balls)
        cannonballs.push(balls)
        cannonballs.forEach((item) => {
          counter.innerHTML = `canonballs x ${cannonballs.length}`
          return item.classList.add('balls')
        })
      }
    }

    function itemRoll() {
      const roll = Math.ceil(Math.random() * 12)
      console.log(' ')
      console.log('you rolled a ' + roll)
      if (roll === 1 || roll === 3) {
        console.log('you found extra life!')
        extraHealth()
      } else if (roll === 5) {
        console.log('youve found a Keg o Powder')
      } else if (roll === 11) {
        console.log('you found a spyglass!')
      } else if (roll % 2 === 0) {
        console.log('you found more cannonballs!')
        extraAmmo()
      }
    }


    //START PLAYER @ playerIdx
    cells[playerIdx].classList.add('player')


    // **** KEY EVENTS **** //
    //KEY DOWN LISTENER >> MOVE PLAYER

    // ATTACK!

    function attack() {
      const rad = [
        playerIdx + 1,
        playerIdx - 1,
        playerIdx + 19,
        playerIdx + 20,
        playerIdx + 21,
        playerIdx - 19,
        playerIdx - 20,
        playerIdx - 21
      ]
      rad.map((tile) => {
        if (cells[tile]) {
          if (cells[tile].classList.contains('trap')) {
            console.log('FOUND A TRAP')
            alertMp3.play()
            cells[tile].classList.add('trap-prox')
            cells[playerIdx].innerHTML = '!'
          }
        } else {
          return
        }
      })


      console.log('you attacked', rad)

      //if the cell player is on has loot boats or trap, mark a hit and check for loot
      if (cells[playerIdx].classList.contains('loot', 'boat', 'trap')) {
        console.log('landed a hit..')

      } //if loot is the following, perform the loot check
      if (cells[playerIdx].classList.contains('loot')) {

        setTimeout(() => {
          console.log('you found loot')
          lootMp3.play()
          const newMsg = document.createElement('p')
          const msg = document.createTextNode('You found 6 Dubloons!')
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 8000)
          cells[playerIdx].classList.remove('loot')
          cells[playerIdx].classList.remove('loot-prox')

          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('lootHit')
          score += 6
          doubloons += 6
          ui[0].textContent = `Doubloons \n ${score}`
        }, 850)

      } else if (cells[playerIdx].classList.contains('boat')) {
        setTimeout(() => {
          boatMp3.play()
          console.log('you hit a boat')
          const newMsg = document.createElement('p')
          const msg = document.createTextNode('You hit a boat!')
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 8000)
          cells[playerIdx].classList.remove('boat')
          cells[playerIdx].classList.remove('loot-prox')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('boatHit')
          itemRoll()
        }, 850)

      } else if (cells[playerIdx].classList.contains('trap')) {
        setTimeout(() => {
          trapMp3.play()
          console.log('you hit trap and lost a life')
          const newMsg = document.createElement('p')
          const msg = document.createTextNode('You just lost a life!')
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 8000)
          cells[playerIdx].classList.remove('trap')
          cells[playerIdx].classList.remove('loot-prox')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('trapHit')
          health.pop()
          console.log(health + 'health')
          health.fill('⚓️')
          return ui[2].textContent = `${health}`
        }, 850)

      } else if (cells[playerIdx].classList.contains('siren') && score > 4) {
        setTimeout(() => {
          sirenMp3.play()
          console.log('you hit a siren... she steals 5 Doubloons')
          const newMsg = document.createElement('p')
          const msg = document.createTextNode('You hit a siren! Lose 5 Dubloons')
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 8000)
          cells[playerIdx].classList.remove('siren')
          cells[playerIdx].classList.remove('loot-prox')
          cells[playerIdx].classList.add('sirenHit')
          return score -= 5
        }, 850)

      } else if (cells[playerIdx].classList.contains('siren') && score < 5) {
        sirenMp3.play()
        console.log('you hit a siren... she steals a life!')
        const newMsg = document.createElement('p')
        const msg = document.createTextNode('You hit a siren! \rShe stole a life!')
        newMsg.appendChild(msg)
        inventory.appendChild(newMsg)
        setTimeout(function () {
          inventory.removeChild(newMsg)
        }, 8000)
        cells[playerIdx].classList.remove('siren')
        cells[playerIdx].classList.remove('loot-prox')
        cells[playerIdx].classList.add('sirenHit')
        health.pop()
        health.fill('⚓️')
        return ui[2].textContent = `${health}`

      } else {
        setTimeout(() => {
          missMp3.play()
          console.log('you missed')
          const newMsg = document.createElement('p')
          const msg = document.createTextNode('You didnt hit anything...')
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 8000)
          cells[playerIdx].classList.add('miss')
          cells[playerIdx].classList.add('hit')
        }, 850)
      }
    }

    // LET THE CANNON RELOAD 
    function reload() {
      reloading = true
      setTimeout(() => {
        reloading = false
      }, 1500)
      console.log('firing cannon...')
    }

    function attackCheck() {
      console.log(health)
      if (cannonballs.length === 0 && score < 6) {
        loser()
      }

      //if the cell, the player is on has not been attacked and there are cannonballs
      if (cells[playerIdx].classList.contains('attack') === false && cannon.childNodes.length > 1 && health.length > 0 && reloading === false) {
        reload()
        setTimeout(() => {
          const ammo = document.querySelector('.balls')
          cannon.removeChild(ammo)
          cannonballs.pop()
          console.log(playerIdx)
          console.log('attack!..')
          attack()
          counter.innerHTML = `canonballs x ${cannon.childElementCount - 1}`
          return cells[playerIdx].classList.add('attack')

        }, 500)
      } else {
        console.log('unable to attack, check attack conditions')
      }
    }
    function loser() {
      setTimeout(() => {
        gamestate = false
        lose.classList.remove('hide')
        const newMsg = document.createElement('p')
        const msg = document.createTextNode('you lose!')
        newMsg.appendChild(msg)
        lose.appendChild(newMsg)
        console.log('you lose')
      }, 250)
    }
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32 && gamestate === true) {
        fire.play()
        console.log(ships.length)
        if (ships.length === 1) {
          var seconds = numb % 60
          var minutes = Math.floor(numb / 60)
          win.classList.remove('hide')
          const timeWon = document.createElement('p')
          let msg = document.createTextNode(`You won with ${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })} : ${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })} left!`)
          timeWon.appendChild(msg)
          win.appendChild(timeWon)

          const doubloonWon = document.createElement('p')
          msg = document.createTextNode(`You discovered a total of ${doubloons} doubloons!`)
          doubloonWon.appendChild(msg)
          win.appendChild(doubloonWon)

          const ballsWon = document.createElement('p')
          msg = document.createTextNode(`You finished with ${cannonballs.length} cannonballs left`)
          ballsWon.appendChild(msg)
          win.appendChild(ballsWon)

          const healthWon = document.createElement('p')
          msg = document.createTextNode(`You finished with ${health.length} health`)
          healthWon.appendChild(msg)
          win.appendChild(healthWon)

          const totalWon = document.createElement('p')
          msg = document.createTextNode(`Your total score is ${Math.ceil(Number(numb / 10) +  doubloons + Math.ceil((cannonballs.length) - 1) + (health.length * 10))}`)
          totalWon.appendChild(msg)
          win.appendChild(totalWon)
          console.log('you win')
          console.log(numb / 10)
          console.log(doubloons)
          console.log(cannonballs.length)
          console.log(health.length * 10)
          gamestate = false
          setTimeout(() => {
            win.removeChild(timeWon)
            win.removeChild(doubloonWon)
            win.removeChild(ballsWon)
            win.removeChild(healthWon)
            win.removeChild(totalWon)
          }, 45000)
        }

        attackCheck()
        if (health.length === 0) {
          loser()
        }
      }
    })
  })

  function keyPress() {
    if (keyLoaded === true) {
      document.addEventListener('keydown', (e) => {
        if (!reloading && gamestate === true) {
          console.log('key pressed')
          cells[playerIdx].classList.remove('player', 'animated', 'pulse', 'infinite')
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
        }

        cells[playerIdx].classList.add('player', 'animated', 'pulse', 'infinite')
        keyLoaded = false
      })//END OF KEY DOWN LISTENER
    }
  }
})

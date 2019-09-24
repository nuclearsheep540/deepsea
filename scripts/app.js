console.log('javascript enabled')
document.addEventListener('DOMContentLoaded', () => {
  // vvvvv declare variables below vvvvv
  const modebutton = document.querySelectorAll('.mode')
  const ready = document.querySelector('.readystate')
  const stage0 = document.querySelector('.stage0')
  const options = document.querySelector('#options')
  const inventory = document.querySelector('.inventory')
  const shop = document.querySelector('.shop')
  const shopButton = document.querySelectorAll('.store')
  const stage1 = document.querySelector('.stage1')
  const stage2 = document.querySelector('.stage2')
  const stage3 = document.querySelector('.stage3')
  const cannon = document.querySelector('.cannon')
  const counter = document.querySelector('.counter')
  const balls = document.createElement('div')
  const ships = document.getElementsByClassName('boat')
  let cannonballs = []
  const backButton = document.querySelector('button.left')
  const nextButton = document.querySelector('.right')
  const grid = document.querySelector('.grid')
  const ambi = new Audio('seasong2.mp3')
  const bgm = new Audio('bgm.mp3')
  bgm.volume = 0.3
  const fire = new Audio('cannon.mp3')
  const missMp3 = new Audio('miss.mp3')
  const boatMp3 = new Audio('boathit.mp3')
  const lootMp3 = new Audio('loothit.mp3')
  lootMp3.volume = 0.6
  const trapMp3 = new Audio('traphit.mp3')
  const sirenMp3 = new Audio('sirenhit.mp3')
  const BuyLifeMp3 = new Audio('buyLife.mp3')
  BuyLifeMp3.volume = 0.8
  const BuyAmmoMp3 = new Audio('buyammo.mp3')
  
  let gamestate = false
  const width = 20
  let cells = []
  let playerIdx = 110
  let keyLoaded = true
  let reloading = false

  // const cellRad = cells.map(function(playerIdx)  {
  //   cells[playerIdx + 1]
  //   cells[playerIdx - 1]
  //   cells[playerIdx - 19]
  //   cells[playerIdx - 20]
  //   cells[playerIdx - 21]
  //   cells[playerIdx + 19]
  //   cells[playerIdx + 20]
  //   cells[playerIdx + 21]
  // })

  
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
          nextButton.classList.remove('stealth')
          const ui = document.querySelector('.ui-container')
          ui.classList.remove('stealth')
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
    keyPress()
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
      cannon.appendChild(counter)
      counter.classList.add('counter')
      //LOAD THE CANNONBALLS
      let timerId = setInterval(() => {

        const balls = document.createElement('div') //the object
        cannon.appendChild(balls) //the html object storing the array
        cannonballs.push(balls) //the array pushing the objects
        cannonballs.forEach((item) => {
          counter.innerHTML = `canonballs x ${cannonballs.length}`
          item.classList.add('balls')
        })
      }, 50)
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
  backButton.addEventListener('click', (e) => {
    console.log('clicked')
    health = [1,1,1]
    health.fill('⚓️')
    ui[2].textContent = `${health}`
    cells = []
    score = 0
    ui[0].textContent = `Doubloons \n ${score}`
    grid.innerHTML = ''
    cannon.innerHTML = ''
    cannonballs = []
    gamestate = false
    console.log('gamestate ' + gamestate)
    setTimeout(function () {
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
  health.fill('⚓️')
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

    for (let i = 0; i < 4; i++) {
      check()
      makeBoatH()
    }

    function makeBoatH() {
      boatH.push(boatH[0] + 1)
      boatH.push(boatH[0] + 2)
      console.log('boat h = ' + boatH)
      boatH.forEach((e, index, arr) => {
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
      boatV.forEach((e, index, arr) => {
        cells[e].classList.add('boat')
      })
    }
    


    // GENERATE SIRENS
    // CREATE PLACEMENT CHECK
    let sirens = []
    function checkSirens() {
      sirens.pop()
      console.log('removing bad siren')
      makeSirens()
      console.log('calling sirens again')
    }
    function makeSirens() {
      console.log('attempting to make a siren')
      let add = randomiseOne(219)

      if (cells[add].classList.length < 1) {
        console.log('found a tile')
        sirens.push(add)
        console.log('adding siren to ' + sirens)
      } else {
        console.log(add + ' was in use')
        checkSirens()
      }
    }
    for (let i = 0; i < 6; i++) {
      makeSirens()
    }
    sirens.forEach((e, index, arr) => {
      cells[e].classList.add('siren')
      console.log('sirens ' + sirens)
    })

    // GENERATE TRAPS
    // CREATE PLACEMENT CHECK
    const trap = []
    function checkTrap() {
      trap.pop()
      console.log('removing bad trap from array')
      makeTrap()
      console.log('calling trap again')
    }
    function makeTrap() {
      console.log('attempting to make trap')
      let add = (randomiseOne(219))
      if (cells[add].classList.length < 1) {
        console.log('found a tile')
        trap.push(add)
        console.log('adding trap to ' + trap)
      } else {
        (trap + ' was in use, running check')
        checkTrap()
      }
    }
    for (let i = 0; trap.length < 12; i++) {
      makeTrap()
    }
    trap.forEach((e, index, arr) => {
      cells[e].classList.add('trap')
      console.log('traps ' + trap)
    })

    // GENERATE LOOT
    // CREATE PLACEMENT CHECK

    const loot = []
    function checkLoot() { //remove loot and make again
      loot.pop()
      console.log('removing bad loot from array')
      makeLoot()
      console.log('calling loot again')
    }
    function makeLoot() { //make the loot
      console.log('attempting to make loot')
      const add = (randomiseOne(219)) //choose a tile
      if (cells[add].classList.length < 1) { //if tile is available
        console.log('found a tile')
        loot.push(add) //add to loot
        console.log('adding loot to ' + add)
      } else {
        console.log(add + ' was in use, running check')
        checkLoot() //run check
      }
    }
    for (let i = 0; loot.length < 10; i++) {
      // while there is less than 20 loot, make loot
      makeLoot()
    }
    loot.forEach((e) => { //style every loot there is
      cells[e].classList.add('loot')
      console.log('loot ' + loot)
    })
    loot.forEach((e) => {
      function proxRoll() {
        const roll = Math.ceil(Math.random() * 4)
        if (roll === 1) {
          if (cells[e + 20]) {
            cells[e + 20].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 2) {
          if (cells[e - 20]) {
            cells[e - 20].classList.add('loot-prox')
          } else {
            proxRoll()
          }

        } else if (roll === 3) {
          if (cells[e + 1]) {
            cells[e + 1].classList.add('loot-prox')
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
          cells[e].classList.add('loot-prox')
        }
      }
      proxRoll()
      proxRoll()
    })


    //CHANCE FOR SWEET ITEMS
    function extraHealth() {
      //add 3 health
      health.push(1)
      health.fill('⚓️')
      ui[2].textContent = `${health}`
      let newMsg = document.createElement('p')
      let msg = document.createTextNode(`You gained 1 Health`)
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 5000)
    }
    function kegPowder() {
      //make next attack hit adjacent tiles
    }
    function spyGlass() {
      //reveal whats under the cursor for 15 seconds
    }
    function extraAmmo() {
      let newMsg = document.createElement('p')
      let msg = document.createTextNode(`You found 4x cannonballs!`)
      newMsg.appendChild(msg)
      inventory.appendChild(newMsg)
      setTimeout(function () {
        inventory.removeChild(newMsg)
      }, 5000)
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
      if (roll === 1 || roll === 3 || roll === 9 || roll === 7) {
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
    // **** YE OLE SHOPPE **** //
    // BUY CANNONBALLS
    shopButton[1].addEventListener('click', () => {
      if (score >= 5){
        BuyAmmoMp3.play()
        let newMsg = document.createElement('p')
        let msg = document.createTextNode(`Bought 6x Cannonballs`)
        newMsg.appendChild(msg)
        inventory.appendChild(newMsg)
        setTimeout(function () {
          inventory.removeChild(newMsg)
        }, 5000)
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
          clearInterval(reloadTime)
          return
        }, 1500)
        //Canonballs Purchased
      } else {
        let newMsg = document.createElement('p')
        let msg = document.createTextNode(`Not enough Doubloons`)
        newMsg.appendChild(msg)
        inventory.appendChild(newMsg)
        setTimeout(function () {
          inventory.removeChild(newMsg)
        }, 5000)
      }
    }, 500)

    //BUY LIVES
    shopButton[2].addEventListener('click', () => {
      if (score >= 6){
        BuyLifeMp3.play()
        const newMsg = document.createElement('p')
        const msg = document.createTextNode('Bought an extra Life')
        newMsg.appendChild(msg)
        inventory.appendChild(newMsg)
        setTimeout(function () {
          inventory.removeChild(newMsg)
        }, 5000)
        let reloadTime = setInterval(() => {
          score -= 6
          health.push(1)
          health.fill('⚓️')
          ui[2].innerHTML = `${health}`
          ui[0].textContent = `Doubloons \n ${score}`
        }, 100)
        setTimeout(() => {
          clearInterval(reloadTime)
          return
        }, 101)
        //Canonballs Purchased
      } else {
        let newMsg = document.createElement('p')
        let msg = document.createTextNode(`Not enough Doubloons`)
        newMsg.appendChild(msg)
        inventory.appendChild(newMsg)
        setTimeout(function () {
          inventory.removeChild(newMsg)
        }, 5000)
      }
    })
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
        if (cells[tile]){
          if (cells[tile].classList.contains('trap')){
            console.log('FOUND A TRAP')
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
          let newMsg = document.createElement('p')
          let msg = document.createTextNode(`You found 6 Dubloons!`)
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 5000)
          cells[playerIdx].classList.remove('loot')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('lootHit')
          score += 6
          ui[0].textContent = `Doubloons \n ${score}`
        }, 850)

      } else if (cells[playerIdx].classList.contains('boat')) {

        setTimeout(() => {
          boatMp3.play()
          console.log('you hit a boat')
          let newMsg = document.createElement('p')
          let msg = document.createTextNode(`You hit a boat!`)
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 5000)
          cells[playerIdx].classList.remove('boat')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('boatHit')
          itemRoll()
        }, 850) 

      } else if (cells[playerIdx].classList.contains('trap')) {
        setTimeout(() => {
          trapMp3.play()
          console.log('you hit trap and lost a life')
          let newMsg = document.createElement('p')
          let msg = document.createTextNode(`You just lost a life!`)
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 5000)
          cells[playerIdx].classList.remove('trap')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('trapHit')
          health.pop()
          console.log(health + 'health')
          health.fill('⚓️')
          return ui[2].textContent = `${health}`
        }, 850)

      } else if (cells[playerIdx].classList.contains('siren')) {
        setTimeout(() => {
          sirenMp3.play()
          console.log('you hit a siren... she steals 5 Doubloons')
          let newMsg = document.createElement('p')
          let msg = document.createTextNode(`You hit a siren! \rLose 5 Dubloons`)
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 5000)
          cells[playerIdx].classList.remove('siren')
          // cells[playerIdx].classList.add('hit')
          cells[playerIdx].classList.add('sirenHit')
          return score -= 5
        },850)
        // if the cell the playerIdx is +/- 1 or +/- 20 from a cell that contains'trap'
        //mark the tile '!'
      } else {
        setTimeout(() => {
          missMp3.play()
          console.log('you missed')
          let newMsg = document.createElement('p')
          let msg = document.createTextNode(`You didnt hit anything...`)
          newMsg.appendChild(msg)
          inventory.appendChild(newMsg)
          setTimeout(function () {
            inventory.removeChild(newMsg)
          }, 5000)
          cells[playerIdx].classList.add('miss')
          cells[playerIdx].classList.add('hit')
        },850) 
      }
    }

    // LET THE CANNON RELOAD 
    function reload() {
      reloading = true
      setTimeout(() => {
        reloading = false
      }, 2000)
      console.log('firing cannon...')
    }

    function attackCheck() {
      
      //if the cell, the player is on has not been attacked and there are cannonballs
      if (cells[playerIdx].classList.contains('attack') === false && cannon.childNodes.length > 1 && health.length > 0 && reloading === false) { 
        reload()
        setTimeout(() => {
          let ammo = document.querySelector('.balls')
          cannon.removeChild(ammo)
          cannonballs.pop()
          console.log(playerIdx)
          console.log('attack!..')
          attack()
          counter.innerHTML = `canonballs x ${cannon.childElementCount - 1}`
          return cells[playerIdx].classList.add('attack')
          
        }, 1000)  
      } else {
        console.log('unable to attack, check attack conditions')
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        fire.play()
        // console.log(ships)
        if (ships.length === 1){
          setTimeout(()=>{
            window.alert('you win')
          },250)
        }
        attackCheck()
        if (health.length === 0) {
          console.log('you lose!')
          alert('Avast ye swab! Ye dun out of ships! Better luck next time, eh?')
        }
      }
    })
  })

  function keyPress() {
    if (keyLoaded === true) {
      document.addEventListener('keydown', (e) => {
        if (!reloading){
          console.log('key pressed')
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
        }
      
        cells[playerIdx].classList.add('player')
        keyLoaded = false
      })//END OF KEY DOWN LISTENER
    }
  }
})

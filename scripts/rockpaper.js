window.addEventListener('load', () => {
  console.log('listener active')
  //store audio
  const muse = new Audio('https://freesound.org/data/previews/321/321045_5447459-lq.mp3')
  const evl = new Audio('https://freesound.org/data/previews/322/322459_5061679-lq.mp3')
  const hiya = new Audio('https://freesound.org/data/previews/323/323376_5061679-lq.mp3')

  //declare variables
  console.log('select game mode')


  const button = document.querySelectorAll('.mode')
  const solo = document.querySelector('.solo')
  const multi = document.querySelector('.multi')
  const mode = document.querySelectorAll('.mode')
  const flex = document.querySelector('.flex-wrap')

  
  flex.style.display = 'none'
  setTimeout(function () {
    flex.style.display = 'flex'
    flex.classList.add('animated', 'zoomIn')
  }, 1900)

 

  //define what starting a solo player game looks like + set stage + add animations
  function GameStartSolo() {
    console.log('setting up solo stage')
    evl.play()
    setTimeout(function () {
      mode[0].classList.add('animate', 'bounceOut')
    }, 200)
    setTimeout(function () {
      mode[1].classList.add('animate', 'bounceOut')
    }, 400)
    setTimeout(function () {
      solo.classList.add('animate', 'bounceIn')
    }, 1200)
    setTimeout(function () {
      solo.style.display = 'block'
    }, 1200)
    setTimeout(function () {
      mode[1].style.display = 'none'
    }, 900)
    setTimeout(function () {
      mode[0].style.display = 'none'
      console.log('setup complete')
    }, 900)
  } //end of solo play setup

  //define what starting a multi player game looks like + set stage + add animations
  function GameStartMulti() {
    console.log('setting up multi stage')
    evl.play()
    setTimeout(function () {
      mode[0].classList.add('animate', 'bounceOut')
    }, 200)
    setTimeout(function () {
      mode[1].classList.add('animate', 'bounceOut')
    }, 400)
    setTimeout(function () {
      multi.classList.add('animate', 'bounceIn')
    }, 1200)
    setTimeout(function () {
      multi.style.display = 'block'
    }, 1200)
    setTimeout(function () {
      mode[1].style.display = 'none'
    }, 900)
    setTimeout(function () {
      mode[0].style.display = 'none'
      console.log('setup complete')
    }, 900)
  } //end of multi play setup

  //select single or multiplayer
  button.forEach(element =>
    element.addEventListener('click', e => {
      muse.play()
      if (e.target.id === 'solo') {
        console.log('solo play enabled ')
        GameStartSolo()
      } else if (e.target.id === 'multi') {
        console.log('multi player enabled ')
        GameStartMulti()
      }
    })
  )//end of stage select

  // ** FOOD LOGIC **  //
  //  eggs = 0 //rock
  //  bacon = 1 //paper
  //  beans = 2 //scissors

  //  **  NUMBER TO FOOD  ** //
  const attack = ['eggs', 'bacon', 'beans']

  // ** SINGLE PLAYER ** //
  const select = document.querySelector('#soloSelect')
  const cpu = document.querySelector('#cpuSelect')
  const soloWin = document.querySelector('#soloWin')
  const P1healthBAR = document.querySelector('#p1health')
  const P2healthBAR = document.querySelector('#p2health')

  //************** GAME START **********
  //************************************
  // ** ROUND START ** //
  // let oneup = 0
  // let twoup = 0
  let player = 0
  let computer = 0
  let P1health = 3
  let P2health = 3


  // RESET GAME
  const reset = document.querySelector('#reset')
  reset.addEventListener('click', resetGame)
  function resetGame() {
    console.log('starting reset...')
    console.log('removing play again button...')
    soloWin.classList.remove('animate', 'bounceIn')
    console.log('removing plays...')
    soloWin.innerHTML = ''
    select.innerHTML = ''
    cpu.innerHTML = ''
    reset.style.display = 'none'
    console.log('attempting hp restore...')
    P1health = 3
    P1healthBAR.src = 'assets/health/1up100.png'
    P2health = 3
    P2healthBAR.src = 'assets/health/2up100.png'
    console.log('ready to do battle!')
  }

  const soloPlay = document.querySelectorAll('.soloplay')
  soloPlay.forEach((element, index) => {
    element.addEventListener('click', e => {

      hiya.play()
      soloWin.classList.remove('animate', 'bounceIn')
      soloWin.innerHTML = ''
      select.innerHTML = ''
      cpu.innerHTML = ''


      //POST MATCH CHECKS
      //ENABLE RESET LOGIC
      //CHECK HEALTH P1+ 
      if (P1health === 3) {
        P1healthBAR.src = 'assets/health/1up100.png'
      } else if (P1health === 2) {
        P1healthBAR.src = 'assets/health/1up66.png'
      } else if (P1health === 1) {
        P1healthBAR.src = 'assets/health/1up33.png'
      } else if (P1health === 0) {
        P1healthBAR.src = 'assets/health/1up0.png'
      }
      //CHECK HEALTH P2+ 
      if (P2health === 3) {
        P2healthBAR.src = 'assets/health/2up100.png'
      } else if (P2health === 2) {
        P2healthBAR.src = 'assets/health/2up66.png'
      } else if (P2health === 1) {
        P2healthBAR.src = 'assets/health/2up33.png'
      } else if (P2health === 0) {
        P2healthBAR.src = 'assets/health/2up0.png'
      }

      //HEALTH CHECK AND UPDATE HEALTHBAR
      if (P1health > 0 && P2health > 0) {
        doBattle()
      } else if (P1health === 0) {
        P1healthBAR.src = 'assets/health/1up0.png'
        soloWin.innerHTML = 'YOU LOSE!'
        reset.style.display = 'block'
      } else if (P2health === 0) {
        P2healthBAR.src = 'assets/health/2up0.png'
        soloWin.innerHTML = 'VICTORY'
        reset.style.display = 'block'
      }
      function doBattle() {
        //PLAYER = INDEX VALUE OF BUTTON CHOSEN
        player = (index)
        console.log(player)
        select.innerHTML = `You have selected ${attack[player]}`

        //CPU = ROLLS RANDOM MATH 0 - 3
        computer = Math.floor((Math.random() * 2))
        setTimeout(function () {
          console.log(computer)
          cpu.innerHTML = `Your opponent selected ${attack[computer]}`
        }, 1000)


        //DO BATTLE
        if (player === computer || computer === player || player === '') {
          console.log('its a draw')
          setTimeout(function () {
            soloWin.classList.add('animate', 'bounceIn')
            soloWin.innerHTML = 'DRAW!'
            return
          }, 2000)
        } else if (
          player === 0 && computer === 1 ||
          player === 1 && computer === 2 ||
          player === 2 && computer === 0) {
          console.log('you lose')
          setTimeout(function () {
            soloWin.classList.add('animate', 'bounceIn')
            soloWin.innerHTML = 'ROUND LOST!'
            return P1health--
          }, 2000)
        } else {
          setTimeout(function () {
            console.log('player wins!')
            soloWin.classList.add('animate', 'bounceIn')
            soloWin.innerHTML = 'ROUND WON!'
            return P2health--
          }, 2000)

        }
      }//end of doBattle
    })
  })


  // ** !! DID NOT COMPLETE !! ** //
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!! //
  // ** MULTI PLAYER ** // 
  // ** 1 UP ** //
  const player1 = document.querySelectorAll('.p1')
  player1.forEach((element, index) => {
    element.addEventListener('click', e => {
      console.log(index)
    })
  })
  // ** 2 UP ** //
  const player2 = document.querySelectorAll('.p2')
  player2.forEach((element, index) => {
    element.addEventListener('click', e => {
      console.log(index)
    })
  })
}) // closes the 'load' event
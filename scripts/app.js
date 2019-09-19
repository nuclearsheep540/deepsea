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

})
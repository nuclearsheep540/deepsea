document.addEventListener('DOMContentLoaded', () => {

  console.log('game script enabled')


  const grid = document.querySelector('.grid')
  const width = 18
  const cells = []
  let playerIdx = 81
  let column = 0




  //GENERATE 9 x 18 GAMEBOARD
  for (let i = 0; i < width * 9; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
    cell.addEventListener('click', handleClick)
    document.querySelectorAll('div').forEach((elem, index ) => {
      if (index %width === 0){
        console.log(index)
        elem.style.background = 'red'
      }
    })
  }//END OF GAME BOARD GEN
  //if cell index is % width === 0



  //SHOW WHERE THE PLAYER IS BY UPDATING CLASS
  function handleClick(e) {
    e.target.classList.add('player')
  }

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

})

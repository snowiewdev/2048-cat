document.addEventListener('DOMContentLoaded', () => {

  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('#score');
  const bestScoreDisplay = document.querySelector('#bestScore');

  const width = 4;
  const totalcells = width * width; // 16
  let cells = [];
  let score = 0;
  let prevScore;
  const colorPalette = {
    0: '#e5e5e5',
    2: 'url("./media/paw1.png")', 
    4: 'url("./media/paw2.png")', 
    8: 'url("./media/paw3.png")',
    16: 'url("./media/paw4.png")',
    32: 'url("./media/paw5.png")',
    64: 'url("./media/paw6.png")',
    128: 'url("./media/paw7.png")',
    256: 'url("./media/paw8.png")',
    512: 'url("./media/paw9.png")',
    1024: 'url("./media/paw10.png")',
    2048: 'url("./media/paw11.png")',
    4096: 'url("./media/cat1.png")',
    8192: 'url("./media/cat1.png")',
    16384: 'url("./media/cat1.png")'
  }

  // sound effects
  const meowOne = new Audio('./media/meow1.wav');
  const meowTwo = new Audio('./media/meow2.wav');
  const meowThree = new Audio('./media/meow3.wav');
  const meowFour = new Audio('./media/meow4.wav');
  const meowFive = new Audio('./media/meow5.wav');
  const bgm = new Audio('./media/bgm.mp3');

  // showValue
  function showValue(){
    for (let i = 0; i < totalcells; i++) {
      if (cells[i].value == 0) {
        cells[i].innerHTML = "";
        cells[i].style.backgroundImage = "";
      } else {
        cells[i].innerHTML = cells[i].value;
      }
      coloring(cells[i]);
    }
  }

  // change color according to value
  function coloring(cell){
    let value = cell.value;
    let color = colorPalette[value];
    cell.style.backgroundImage = "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), " + color; //229
  }

  //create a 4x4 board
  function createBoard(){ 
    for (let i = 0; i < totalcells; i++) {
      cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.value = 0;
      gridDisplay.appendChild(cell);
      cells.push(cell);
    }
    generate();
    generate();
    showValue();
  }

  //reset game
  function reset(){
    gridDisplay.innerHTML = ''; // clear grid cells
    cells = [];
    score = 0;
    scoreDisplay.innerHTML = 0;
    createBoard();
    document.addEventListener('keydown', control); // enable 
  }

  //generate number randomly 
  function generate() {
    let randomNumber = Math.floor(Math.random() * cells.length);
    if (cells[randomNumber].value == 0) { 
      cells[randomNumber].value = 2;
      cells[randomNumber].classList.add('flip-vertical-left');
      setTimeout(()=>{
        cells[randomNumber].classList.remove('flip-vertical-left');
      }, 500);
      checkForGameOver();
    } else generate();
  }

  //swipe right
  function moveRight() {
    for (let i=0; i< totalcells; i++) {
      if (i % width === 0) { 
        let cellOne = cells[i].value;
        let cellTwo = cells[i+1].value;
        let cellThree = cells[i+2].value;
        let cellFour = cells[i+3].value;
        let row = [parseInt(cellOne), parseInt(cellTwo), parseInt(cellThree), parseInt(cellFour)]; // as value is stored in form of string, needs convert to number
        
        let filteredRow = row.filter(num => num);   // contain row with number
        let missing = width - filteredRow.length;   // find number of empty grid
        let zeros = Array(missing).fill(0);         // generate number of zeros 
        let newRow = zeros.concat(filteredRow);     // reposition the cells

        cells[i].value = newRow[0];
        cells[i+1].value = newRow[1];
        cells[i+2].value = newRow[2];
        cells[i+3].value = newRow[3];

      }
    }
  }

  //swipe left
  function moveLeft() {
    for (let i=0; i< totalcells; i++) {
      if (i % width === 0) { 
        let cellOne = cells[i].value;
        let cellTwo = cells[i+1].value;
        let cellThree = cells[i+2].value;
        let cellFour = cells[i+3].value;
        let row = [parseInt(cellOne), parseInt(cellTwo), parseInt(cellThree), parseInt(cellFour)]; 
        
        
        let filteredRow = row.filter(num => num);   // contain row with number
        let missing = width - filteredRow.length;   // find number of empty cell
        let zeros = Array(missing).fill(0);         // generate number of zeros 
        let newRow = filteredRow.concat(zeros);     // reposition the cells

        cells[i].value = newRow[0];
        cells[i+1].value = newRow[1];
        cells[i+2].value = newRow[2];
        cells[i+3].value = newRow[3];

      }
    }
  }

  //swipe down
  function moveDown(){
    for (let i = 0; i < width; i++) {
      let cellOne = cells[i].value;
      let cellTwo = cells[i+width].value;
      let cellThree = cells[i+(width*2)].value;
      let cellFour = cells[i+(width*3)].value;
      let column = [parseInt(cellOne), parseInt(cellTwo), parseInt(cellThree), parseInt(cellFour)]; // change them into integer

      let filteredColumn = column.filter(num => num); // contain colum with number
      let missing = width - filteredColumn.length;   // find number of empty cell
      let zeros = Array(missing).fill(0);         // generate number of zeros 
      let newColumn = zeros.concat(filteredColumn);     // reposition the cells

      cells[i].value = newColumn[0];
      cells[i+width].value = newColumn[1];
      cells[i+(width*2)].value = newColumn[2];
      cells[i+(width*3)].value = newColumn[3];
    }
  }

  //swipe up
  function moveUp(){
    for (let i = 0; i < width; i++) {
      let cellOne = cells[i].value;
      let cellTwo = cells[i+width].value;
      let cellThree = cells[i+(width*2)].value;
      let cellFour = cells[i+(width*3)].value;
      let column = [parseInt(cellOne), parseInt(cellTwo), parseInt(cellThree), parseInt(cellFour)]; // change them into integer

      let filteredColumn = column.filter(num => num); // contain colum with number
      let missing = width - filteredColumn.length;   // find number of empty cell
      let zeros = Array(missing).fill(0);         // generate number of zeros 
      let newColumn = filteredColumn.concat(zeros);     // reposition the cells

      cells[i].value = newColumn[0];
      cells[i+width].value = newColumn[1];
      cells[i+(width*2)].value = newColumn[2];
      cells[i+(width*3)].value = newColumn[3];
    }
  }

  // combine functions - row & column
  function combineRowCells(){
    let matched = [];
    let max;
    for (let i=0; i< totalcells-1; i++) {
      if ((i % width !== (width-1)) && cells[i].value === cells[i+1].value){
        let combinedTotal = parseInt(cells[i].value) + parseInt(cells[i+1].value);
        cells[i].value = combinedTotal;
        cells[i+1].value = 0;
        matched.push(combinedTotal);
        updateScore(combinedTotal);   //add combinedTotal to score
      }
    }
    max = Math.max(...matched);
    meowSound(max);
    checkForWin();
  }

  function combineColumnCells(){
    let matched = [];
    let max;
    for (let i=0; i< width*(width-1); i++) {
      if (cells[i].value === cells[i+width].value){
        let combinedTotal = parseInt(cells[i].value) + parseInt(cells[i+width].value);
        cells[i].value = combinedTotal;
        cells[i+width].value = 0;
        matched.push(combinedTotal);
        updateScore(combinedTotal);   //add combinedTotal to score
      }
    }
    max = Math.max(...matched);
    meowSound(max);
    checkForWin();
  }

  // update score after combination 
  function updateScore(combinedTotal){
    score += combinedTotal;
    scoreDisplay.innerHTML = score;
  }

  //assign keycodes (arrows & wasd) 
  function control(e){
    switch(e.keyCode){
      case 39:
      case 68:
        e.preventDefault();
        keyRight();
        break;
      case 40:
      case 83:
        e.preventDefault();
        keyDown();
        break;
      case 37:
      case 65:
        e.preventDefault();
        keyLeft();
        break;
      case 38:
      case 87:
        e.preventDefault();
        keyUp();
        break;
    }
  }


  // what happens when move to diff direction
  function keyRight(){
    moveRight();
    combineRowCells();
    moveRight();
    generate();
    showValue();
  }

  function keyLeft(){
    moveLeft();
    combineRowCells();
    moveLeft();
    generate();
    showValue();
  }

  function keyUp(){
    moveUp();
    combineColumnCells();
    moveUp();
    generate();
    showValue();
  }

  function keyDown(){
    moveDown();
    combineColumnCells();
    moveDown();
    generate();
    showValue();
  }

  // swiping to diff direction in mobile
  function detectSwipe(){
    gridDisplay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
    gridDisplay.addEventListener('swiped-left', keyLeft);
    gridDisplay.addEventListener('swiped-right', keyRight);
    gridDisplay.addEventListener('swiped-up', keyUp);
    gridDisplay.addEventListener('swiped-down', keyDown);
  }

  // pop-up msg box 
  function msgBox(resultMsg){
    let msgContent = 
      `<div id="result">
        <h2 id="msg"> ${resultMsg} </h3>
        <button class="againBtn"> Try Again </button>
      </div>`;
    gridDisplay.innerHTML += msgContent;
    let againBtn = document.querySelector('.againBtn');
    againBtn.addEventListener('click', (e)=> {
      e.preventDefault();
      reset();
    });
  }

  //check for number 2048 to win
  function checkForWin(){
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].value === 2048) {
        showValue();
        document.removeEventListener('keydown', control);
        let resultMsg = "Wow, You Win! :D";
        msgBox(resultMsg);
        recordBestScore();
      }
    }
  }

  // check for game over (no zero on board & no more combination available)
  function checkForGameOver() {
    // check for available space
    let zeros = 0;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].value == 0) {
        zeros++
      }
    }

    // Check there's still available moves/ combination 
    let availableMoves = true;
    function checkCombination() {
      // check for any horizontal moves
      for (let i=0; i< totalcells-1; i++) {
        if ((i % width !== (width-1)) && cells[i].value === cells[i+1].value){
          return;     // stop checking as horizontal move is available
        }
      }
      // check for any vertical moves
      for (let i=0; i< width*(width-1); i++) {
        if (cells[i].value === cells[i+width].value){
          return;     // stop checking as vertical move is available
        }
      }
      availableMoves = false;
    }
    
    if (zeros === 0) {
      checkCombination();
      if (availableMoves == true) {
        return;
      } else {
        showValue(); // show last generated grid
        document.removeEventListener('keydown', control);
        let resultMsg = "Game Over! :(";
        msgBox(resultMsg);
        recordBestScore();
      }
    }

  }

  // sound effects when matched tiles
  function meowSound(score){

    if (score < 4) { return; } // no combination no meow meow sound!!

    if (score <= 8) { 
      meowOne.currentTime = 0;
      meowOne.play();
    } else if (score <= 64) {
      meowTwo.currentTime = 0;
      meowTwo.play();
    } else if (score <= 512) {
      meowThree.currentTime = 0;
      meowThree.play();
    } else if (score == 2048){
      meowFive.currentTime = 0;
      meowFive.play();
    } else {
      meowFour.currentTime = 0;
      meowFour.play();
    }

  }
  
  //start bgm music
  function bgmStart() {
    bgm.loop = true;
    bgm.play();
  }

  // Bestscore get & store in localStorage
  function recordBestScore(){
    if (prevScore == 0 || score > prevScore) {
      window.localStorage.setItem('bestscore', score.toString());
    }
  }

  function getBestScore(){
    prevScore = parseInt(window.localStorage.getItem('bestscore'));
    if (!prevScore) {
      prevScore = 0;
    }
    bestScoreDisplay.innerHTML = prevScore;
  }

  //main
  createBoard();
  getBestScore();
  document.addEventListener('keydown', control);
  document.body.addEventListener("mousemove", function () {
    bgmStart();
  });
  detectSwipe();
});

// further development:
// Increase sound effect when match continuously
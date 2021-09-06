<template>
  <div class="board">
    <div class="title">
    <div class="yellowBall"></div>
    <h1>  Puissance 4  </h1>
    <div class="redBall"></div>
    </div>
    <!-- key:turn to force refresh after each click -->
    <table :key="turn">
      <tr v-for="row in 6" :key="row">
        <cell 
          v-for="column in 7"
          :key="7*(row-1)+column-1"
          @cell-clicked="playMove(row,column)"
          :color="getClassName(row,column)"
        />
      </tr>
    </table>
    <audio class="audioPlay" preload="auto"> 
      <source :src="moveSound" type="audio/mpeg">
    </audio>
    <audio class="audioWin" preload="auto"> 
      <source :src="moveSoundWin" type="audio/mpeg">
    </audio>
    <div class="timer">
      <timer
        v-bind:currentPlayer="currentPlayer"
        v-bind:isActive="isActive"
        @time-out="timeIsOut"
        v-bind:resetTimer="resetTimer"
      />
    </div>
    <div>
      <score :currentScore="score"/>
    </div>
    <buttonaction 
      @last-play-click="lastPlay" 
      @new-game-click="newGame" 
      @active-sound-click="powerSound" 
      v-bind:activeSound="activeSound"
    />
  </div>
</template>

<script>
import Cell from './Cell'
import Timer from './Timer'
import getNewPawn from '../main'
import checkWin from '../compute'
import ButtonActions from './Button'
import Score from './Score'

const rows = 6;
const cols = 7;
let boardArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => 0)
      );

export default {
  name: 'Board',
  data() {
    return {
      boardArray,
      activeSound:true,
      turn: 1,
      currentPlayer: 1,
      isActive: false,
      gameOver:false,
      isDraw: false,
      score:{1: 0, 2: 0},
      history: [],
      lastMove: {row: undefined, col: undefined},
      moveSound: require('../assets/media/CoinsDrop.mp3'),
      moveSoundWin: require('../assets/media/sucess.mp3'),
      backgroundIcons: {1:"fab fa-angellist",2:"fas fa-battery-full",3:"fas fa-beer",4:"fas fa-bomb",5:"fas fa-bolt",6:"fas fa-book-open",7:"fas fa-camera",8:"fas fa-chess-board",9:"fas fa-chess-king",10:"fas fa-cloud",11:"fas fa-code",12:"fas fa-cookie-bite",13:"fas fa-database",14:"fas fa-dice-d20",15:"fas fa-desktop",16:"fab fa-discord",17:"fas fa-envelope",18:"fab fa-ethereum",19:"fas fa-file-code"},
      resetTimer: false
    }
  },
  components: {
    'cell': Cell,
    'timer': Timer,
    'score': Score,
    'buttonaction': ButtonActions
  },
  methods: {
    playMove(row, col) {
      // détermine la rangée sur laquelle se placera le jeton
      row = getNewPawn(this.boardArray, --col);      
      

      // full column, can't play
      if (row === -1) return;
      if (this.gameOver) return;

      this.resetTimer = false;

      // change la couleur de la cellule sur laquelle on clique
      this.boardArray[row][col] = this.currentPlayer;
      
      this.lastMove = {row, col};
      this.history.push({player: this.currentPlayer, row, col});

      // play sound
      let audio = document.querySelector('.audioPlay')
      let audioVictory = document.querySelector(".audioWin");
      if (!this.activeSound) {
        audio.volume=0;
        audioVictory.volume=0;
      }
      else
      {
        audio.volume=1;
        audioVictory.volume=0.06;
      }
      audio.play()
      
      this.turn++;
      
      if(this.turn>=3){
        this.isActive=true;
      }
      
      //check victory
      const position = [col, row];
      this.gameOver = checkWin(this.boardArray, position, this.currentPlayer)

      if (this.gameOver) {
        this.score[this.currentPlayer]++;
        audioVictory.play();

        // Arrête le timer
        this.isActive = false;
      }
      
      // toggle player
      this.togglePlayer();
    },
    
    generateBoard(turn) {
      let board = this.initBoard();
      for (let i = 0; i < turn-1; i++) {
        const state = this.history[i];
        board[state['row']][state['col']] = state['player'];
      }
      this.history = this.history.slice(0, turn-1);
      return board
    },

    initBoard() {
      const rows = 6;
      const cols = 7;
      return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => 0)
      );
    },

    getClassName(row, col) {
      const colorCode = [null, 'yellowBall', 'redBall'];
      let color = this.boardArray[--row][--col];
      color = colorCode[color];
      
      // On ajoute une animation au dernier coup joué
      if (this.lastMove.row === row && this.lastMove.col === col) {
        color += ' lastMove';
      }
      return color;
    },

    lastPlay(){
      if (this.gameOver) return;
      if (this.turn<2) return;
      
      this.turn--;
      this.lastMove = {row: undefined, col: undefined};
      this.boardArray = this.generateBoard(this.turn);
      this.togglePlayer();
    },
    
    newGame(pause=false) {
      this.turn = 1;
      this.currentPlayer = 1;
      this.isActive = false;
      this.gameOver = false;
      this.isDraw = false;
      if (!pause) {
        this.boardArray = this.initBoard();
      }
      this.history = [];
      this.lastMove = {row: undefined, col: undefined};
      this.resetTimer = true;
    },

    togglePlayer() {
      if (this.currentPlayer==1) {
        this.currentPlayer=2;
      } else {
        this.currentPlayer=1;
      }
    },

    powerSound() {
      // Active ou désactive le son
      this.activeSound = !this.activeSound;
    },

    timeIsOut() {
      if (this.gameOver) return;
      this.gameOver = true;
      this.isActive = false;
      this.score[~this.currentPlayer+4]++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  body {
    text-align: center;
    margin:0 auto;
    font-family : 'Allison', cursif;
}
h1 {
    text-shadow: 0.1em 0.1em 0.2em black;
    color:goldenrod;
    margin: 10px;
    font-family : 'Allison', cursif;
    font-size: 3em;
}
h3 {
    font-size:1.2em;
    color: goldenrod;
    animation: lumiere2 2s infinite linear;
    font-family : 'Allison', cursif;

}
.actions {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
.button {
    font-size:3em;
    font-weight:bold;
    color: goldenrod;
    animation: lumiere 2s infinite linear;
    margin-left: 2em;
    margin-right: 2em;
    cursor:pointer;
    margin-top: 5px;
}
h3::after {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f2f2";
  }
h3::before {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f2f2";
  }
.score h3::after {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f091";
  }
.score h3::before {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f091";
  }
.board {
  margin:auto;
  position:absolute;
  top:200px;
  left:0;
  right: 0px;
  bottom: 0px;
  z-index:1;
}
table {
    margin: auto;
    width: 430px;
    border: 2px blue outset;
    background-color: blue;
    border-radius: 15px;
    background: linear-gradient(blue, darkblue);
}
.board td {
    width: 55px;
    height: 55px;
    margin: 0px;
    padding: 0px;
    border: 2px blue inset;
    border-radius: 55px;
    background-color: lightgrey;
}
.redBall {
    
    height: 59px;
    width: 59px;
    border-radius: 50%;
    margin: 0;
    background: radial-gradient(circle at 10px 10px, #f91e00, #000);
}
.redBall2 {
    
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0;
    background: radial-gradient(circle at 10px 10px, #f91e00, #000);

}
.yellowBall {
    
    height: 59px;
    width: 59px;
    border-radius: 50%;
    margin: 0;
    background: radial-gradient(circle at 10px 10px, #fffb02, #000);
}
.yellowBall2 {
    
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin: 0;
    background: radial-gradient(circle at 10px 10px, #fffb02, #000);

}
.title {
    display:flex;
    text-align:center;
    margin:auto;
    justify-content: center;
    margin-bottom: 15px;
    margin-top: 15px;
}
.topleft {
  color:white;
  font-size: 2em;
  position: absolute;
  top: 220px;
  left: 400px;
}
#player1 {
  margin-bottom: 5px;
  font-size: 1em;
  color:white;
  font-weight: bold;
  display:flex;
  justify-content: space-evenly;
}
#player2 {
  font-size: 1em;
  color: white;
  font-weight: bold;
  display:flex;
  justify-content: space-evenly;
}
.title {
  display:flex;
  margin-bottom: 16px;

}
.flex {
  display:flex;
  flex-direction: column;
  margin:auto;
}
.lastMove {
  animation:grow 1s;
}
@keyframes grow {
 0% {
  transform: scale( 0 );
  -moz-transform: scale( 0 );
  -o-transform: scale( 0 );
  -ms-transform: scale( 0 );
  transform: scale( 0 );
  }
  100% {
  transform: scale( 1 );
  -moz-transform: scale( 1 );
  -o-transform: scale( 1 );
  -ms-transform: scale( 1 );
  transform: scale( 1 );
  }
}
@keyframes lumiere {
  0%{
  text-shadow:
  0 0 7px rgb(0,0,255),
  0 0 10px rgb(0,0,255),
  0 0 32px rgb(0,0,255),
  0 0 87px rgb(0,0,255),
  0 0 150px rgb(0,0,255);
  }
  50%{
  text-shadow:
  0 0 7px rgb(0,0,255),
  0 0 10px rgb(0,0,255),
  0 0 32px rgb(0,0,255),
  0 0 87px rgb(0,0,255),
  0 0 150px rgb(0,0,255);
  }
}

@keyframes lumiere2 {
  0%{
  text-shadow:
  0 0 7px rgb(252, 1, 1),
  0 0 10px rgb(252, 1, 1),
  0 0 32px rgb(252, 1, 1),
  0 0 87px rgb(252, 1, 1),
  0 0 150px rgb(252, 1, 1);
  }
  50%{
  text-shadow:
  0 0 7px rgba(252, 1, 1, 0.878),
  0 0 10px rgba(252, 1, 1, 0.878),
  0 0 32px rgba(252, 1, 1, 0.878),
  0 0 87px rgba(252, 1, 1, 0.878),
  0 0 150px rgba(252, 1, 1, 0.878);
  }
}

.fa-volume-up {
    font-size: 1em;
} 
.score {
  font-size: 2em;
  position: absolute;
  top: 200px;
  right: 400px;
}
</style>





<template>
  <div class="board">
    <h1>Puissance 4</h1>
    
    <table>
      <tr v-for="row in 6" :key="row">
        <td 
          v-for="column in 7"
          :key="column"
          v-on:click="playMove(row, column)"
          v-bind:class="getClassName(row, column)"
        />
      </tr>
    </table>
    
  </div>
  
</template>

<script>
//import Cell from './Cell'

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
      turn: 1,
      currentPlayer: 1,
    }
  },
  //components: {
    //'cell': Cell
  //},
  methods: {
    playMove(row, col) {
      // change la couleur de la cellule sur laquelle on clique
      this.boardArray[--row][--col] = this.currentPlayer;
    },
    getClassName(row, col) {
      console.log(this.boardArray[--row][--col]);
      //return "yellowBall";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    text-align: center;
    margin:0 auto;
    background: linear-gradient(black, white, black);
}


h1 {
    text-shadow: 0.1em 0.1em 0.2em black;
    color:white;
    margin-top: 9px;
}
h3 {
    font-size: 1.5em;
    font-weight: bold;
    float:right;
    padding-right: 165px;
    padding-top: 75px;
    color:white;
    text-shadow: 0.1em 0.1em 0.2em black;
}


button {
    padding:1em;
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
.board {
    margin: auto;
    width: 430px;
    border: 2px blue outset;
    background-color: blue;
    border-radius: 15px;
    background: linear-gradient(blue, lightblue, blue);
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


.actions {
    text-shadow: 0.1em 0.1em 0.2em black;
    color:white;
}

.scores {
    margin:100px;
    text-shadow: 0.1em 0.1em 0.2em black;
    float:left;
    color:white;
    border:1px solid black;
    width:250px;
    text-align: center;
}
.scores td{
    border:1px solid black;
    border-radius:5px;
}
.scores th{

    text-align: center;
    
}

.redBall {
    height: 59px;
    width: 59px;
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

.playerico::before {
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f007";
}
.title {
    display:flex;
    padding-left: 542px;
}
</style>

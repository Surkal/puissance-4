<template>
    <div class="topleft">
      <h3> Temps Restant </h3>
      <div class="flex">
        <div class="yellowBall2"></div>
        <div id="player1">Player 1 : <div class="beRed">{{ seconds['1'] }} sec</div></div>
        <div class="redBall2"></div>
        <div id="player2">Player 2 : <div class="beRed">{{ seconds['2'] }} sec</div></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Timer',
  props: ["currentPlayer", "isActive"],
  data() {
    return {
      seconds: {1: 10, 2: 10}
      
    }
  },
  mounted() {
    this.handleTime();
  },
  watch: {
    isActive: function() {
      this.handleTime();
    }
  },
  methods: {
    handleTime() {
      let interval = null;
      if (this.isActive) {
        interval = setInterval(() => {
          if (!this.seconds[this.currentPlayer]) {
            this.$emit('time-out');
          }
          if (!this.isActive || !this.seconds[this.currentPlayer]) {
            return () => clearInterval(interval);
          }
          this.seconds[this.currentPlayer]--;
          console.log(this.seconds);
        }, 1000);
      }
      return () => clearInterval(interval);
    },
    toMinutes(secondes){
      let fdsfsdfds = Math.floor(secondes/60)/10
      return fdsfsdfds.toFixed(2)
    },
    toSecondes(secondes){
      if(secondes>60)
      {
        let nb = Math.floor(secondes/60)
        let result = secondes-(nb*60)
        return result
      }
      else
      {
        return secondes
      }
    },
    resetTimer() {
      console.log('timer resetté');
      this.seconds = {1: 10, 2: 10};
    }
  }
}
</script>

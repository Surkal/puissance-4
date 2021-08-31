<template>
  <div id="app">
    <Board/>
    <Timer/>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Board,
    Timer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

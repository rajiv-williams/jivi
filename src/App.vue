<template>
  <MainPageView/>
</template>

<script>
import MainPageView from './components/MainPageView.vue'

export default {
  name: 'App',
  components: {
    MainPageView
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
}



#overlay{
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
  pointer-events: none;
}

#overlay.active{
  pointer-events: all;
  opacity: 1;
}
</style>

<template>
    <!--PLAY BOX-->
    <div id="playBox">
      <img id="displayAlbum" alt="Album Cover" src="../assets/Black_Box.png" class="grid-item">  
      <a id="songPlaying" class="grid-item"></a>
      <audio id="musicPlayer" class="grid-item"></audio>
      <button id="nextButton">NEXT</button>
      <button id="shuffleButton" class="grid-item playerButton">SHUFFLE ON</button>
    </div>
  
</template>

<script>

export default {
  name: 'PlayBoxView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">

#displayAlbum{
  max-width: 80px;
  max-height: 80px;
  margin: auto;
}
#songPlaying{
  width: 150px;
  color: rgb(225, 225, 225);
}
#albumTracks{
  overflow-y: scroll;
  width: 350px;
  height: 70px;
}
#playBox{
  height: 100px;

  background-color: black;
  display: grid;
  grid-template-columns: 10% 15% auto 8% 17%;
}
#musicPlayer{
  width: 100%;
  margin-top: 20px;
}
#musicPlayer::-webkit-media-controls-panel {
  background-color: #e3e3e3;
  
}
.grid-item{
  margin:auto;
}
.playerButton{
  max-width: 50%;
  max-height: 50%;
  margin: auto;
}
#nextButton{
  margin: auto;
}
</style>

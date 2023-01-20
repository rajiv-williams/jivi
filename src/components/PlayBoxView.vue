<template>
    <!--PLAY BOX-->
    <div id="playBox">
      <img id="displayAlbum" alt="Album Cover" src="">  
      <a id="songPlaying"></a>
      
      <p id="prevButton"></p>
      <audio id="musicPlayer"></audio>
      <p id="nextButton"></p>
      <img id="shuffleButton" alt="Shuffle" src="">
      
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
  visibility: hidden;
}
#songPlaying{
  margin: auto;
  width: 150px;
  color: rgb(225, 225, 225);
}
#albumTracks{
  overflow-y: scroll;
  width: 350px;
  height: 70px;
}
#playBox{
  height: 20%;
  position: fixed;
  bottom: 0%;
  right: 0%;
  width: 100%;
  margin: auto;
  background-color: black;
  display: grid;
  grid-template-columns: 10% 10% 5% auto 5% 17%;
}


#musicPlayer{
  width: 100%;
  margin: auto;
}
#musicPlayer::-webkit-media-controls-panel {
  background-color: #e3e3e3;
  
}

#prevButton{
  height: 40%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/PREV.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#prevButton:hover{
  height: 40%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/PREV_H.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#nextButton{
  height: 40%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NEXT.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#nextButton:hover{
  height: 40%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NEXT_H.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#shuffleButton{
  height: 70%;
  width: 70%;
  margin: auto;
}

</style>

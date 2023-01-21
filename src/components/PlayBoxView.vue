<template>
    <!--PLAY BOX-->
    <div id="playBox">
      <div class="songDetails">
        <img id="displayAlbum" alt="Album Cover" src=""> 
        <a id="songPlaying"></a>
      </div>
      
      
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
  width: 100px;
  height: 100px;
  margin: auto;
  visibility: hidden;
}
#songPlaying{
  margin: auto;
  margin-left: 50%;
  width: 100%;
  color: rgb(225, 225, 225);
  font-size: 100%;
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
  grid-template-columns: 20% 20% 20% 20% 20%;
}

.songDetails{
  padding: 10px;
  display: grid;
  margin: auto;
  grid-template-columns:  auto 150px;
}

#musicPlayer{
  max-width: 100%;
  margin: auto;
}
#musicPlayer::-webkit-media-controls-panel {
  background-color: #e3e3e3;
  
}

#prevButton{
  height: 40%;
  width: 40%;
  margin: auto;
  margin-left: 50%;
  background-image: url("../assets/PREV.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#prevButton:hover{
  background-image: url("../assets/PREV_H.png");
}
#nextButton{
  height: 40%;
  width: 40%;
  margin: auto;
  margin-right: 50%;
  background-image: url("../assets/NEXT.png");
  background-size: 80%;
  background-repeat:no-repeat;
  background-position: center;
}
#nextButton:hover{
  background-image: url("../assets/NEXT_H.png");
}
#shuffleButton{
  height: 70%;
  width: 70%;
  margin: auto;
}

</style>

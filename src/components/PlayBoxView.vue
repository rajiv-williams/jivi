<template>
    <!--PLAY BOX-->
    <div id="playBox">
      <div class="songDetails">
        <img id="displayAlbum" alt="Album Cover" src=""> 
        <a id="songPlaying"></a>
      </div>
      
      <div></div>

      <!--PLAYBACK CONTROLS-->
        <!-- PREVIOUS BUTTON -->
        <font-awesome-icon id="prevButton" class="playbox-button" icon="fa-solid fa-backward-step" />
        
        <!-- MUSIC PLAYER -->
        <audio id="musicPlayer"></audio>

        <!-- NEXT BUTTON -->
        <font-awesome-icon id="nextButton" class="playbox-button" icon="fa-solid fa-forward-step" />
      
      <div></div>

      <!--EXTRA CONTROLS-->
      <!-- <div class="extra-controls playbox-button">     
      </div> -->
    
      <!-- SHUFFLE BUTTON -->
        <font-awesome-icon id="shuffleButton" class="playbox-button shuffleOff" icon="fa-solid fa-shuffle" />

        <!-- SAMPLE LINK -->
        <font-awesome-icon id="copyrightButton" class="playbox-button hide" icon="fa-solid fa-copyright" href=""/>  
      
      
      
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
  width: 80px;
  height: 80px;
  margin-right: 50%;
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
  grid-template-columns: 15% 15% 7% 26% 7% 4% 13% 13%;
}

.songDetails{
  padding: 10px;
  display: grid;
  margin: auto;
  grid-template-columns:  20% auto;
}


.extra-controls{
  padding: 10px;
  display: grid;
  margin: auto;
  grid-template-columns:  50% 50%;
}

#musicPlayer{
  max-width: 100%;
  margin: auto;
}
#musicPlayer::-webkit-media-controls-panel {
  background-color: #e3e3e3;
  
}
.playbox-button{
  height: 25%;
  width: 25%;
  margin: auto;
  text-align: center;
}
.playbox-button{
  height: 25%;
  width: 25%;
  margin: auto;
  color: #cacaca;
}
.playbox-button:hover{
  height: 25%;
  width: 25%;
  margin: auto;
  color: #aaaaaa;
}
#prevButton{
  margin-left: 50%;
}

/* .button-link{
  color: #cacaca;
}
.button-link:hover{
  color: #aaaaaa;
}
.playback-control-button{
  color: #cacaca;
}
.playback-control-button:hover{
  color: #aaaaaa;
} */
/* #prevButton:hover{
  color: #aaaaaa;
} */

#nextButton{
  margin-right: 50%;
}

/* #nextButton:hover{
   color: #aaaaaa;
} */

.shuffleOff{
  color: #cacaca;
}

.shuffleOn{
  color: rgb(210, 156, 255);
}

#shuffleButton{
   height: 25%;
  width: 25%;
  margin: auto;
}
/*purple: 210 156 255 */
#shuffleButton:hover{
  color: #aaaaaa;
}
.show{
  visibility: visible;
}
.hide{
  visibility: hidden;
}
</style>

<template>
   
    <!--PLAY BOX-->
    <div id="playBox">
      <!--SONG DETAILS-->
      <div class="songDetails">
        <img id="displayAlbum" alt="Album Cover" src=""> 
        
      </div>
      
      <a id="songPlaying"></a>

      <div></div>

      <!-- SHUFFLE BUTTON -->
      <font-awesome-icon id="shuffleButton" class="playbox-button shuffleOff" icon="fa-solid fa-shuffle" />

      <!--PLAYBACK CONTROLS-->
        <!-- PREVIOUS BUTTON -->
        <font-awesome-icon id="prevButton" class="playbox-button" icon="fa-solid fa-backward-step" />
        
        <!-- MUSIC PLAYER -->
        <audio id="musicPlayer"></audio>

        <!-- NEXT BUTTON -->
        <font-awesome-icon id="nextButton" class="playbox-button" icon="fa-solid fa-forward-step" />
      
       

      <!--EXTRA CONTROLS-->
      
      

      <!-- COPYIGHT CREDITS -->
      <font-awesome-icon id="copyrightButton" class="playbox-button hide" icon="fa-solid fa-copyright" href=""/>

      <!-- SAMPLE LINK -->
      <font-awesome-icon id="sampleLink" class="playbox-button hide" icon="fa-solid fa-up-right-from-square" href=""/>



        <!-- MODAL VERSION
        <font-awesome-icon data-modal-target="#credits-popup" id="copyrightButton" class="playbox-button hide" icon="fa-solid fa-copyright" href=""/>   -->

        <!--CREDITS POPUP-->
        <!-- <div class="modal" id="credits-popup">
          <div class="modal-header">
            <div class="title" id="credits-title">SONG NAME CREDITS</div>
            <button data-close-button class="close-button">&times;</button>
          </div>
          <div class="modal-body"></div>
        </div> -->

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
  grid-template-columns: 4% 12% 6% 8% 5% 30% 5% 8% 8% 14%;
}
/* grid-template-columns: 15% 15% 7% 26% 7% 3% 9% 9% 9%; */
.songDetails{
  padding: 10px;
  display: grid;
  margin: auto;
}


.extra-controls{
  padding: 10px;
  display: grid;
  margin: auto;
  grid-template-columns:  50% 50%;
}

#musicPlayer{
  max-width: 100%;
  width: 100%;
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

.modal{
  position: fixed;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) scale(0);
  -ms-transform: translate(-50%, -50%) scale(0);
  transition: 200ms ease-in-out;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 2;
  background-color: white;
  /* 500px */
  max-width: 80%;
  height: 500px;
  width: 100%;
  max-height: 100%;
  display: inline-block;
}

.modal .active{
  transform: translate(-50%,-50%) scale(1);
   -ms-transform: translate(-50%, -50%) scale(1);
}

.modal-header{
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}

.modal-header .title{
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-header .close-button{
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-body{
  padding: 10px 15px;
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

.show{
  visibility: visible;
}
.hide{
  visibility: hidden;
}
</style>

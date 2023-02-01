<template>
    <!-- <h1 class="albumTitle">ALBUM TITLE</h1> -->
    <div id="albumNavigation">
      <p id="leftArrow" class="navigation"></p>
        <div id="albumContainer" class="playable">
          <img alt="Album Cover" id="albumCover" src="">
          <img class="playButton" src="">
          <!-- <div id="albumTrackContainer"></div> -->
        </div>
      
      
      <!-- <img alt="Loading..." id="loadingScreen" src=""> -->
      <p id="lScreen" ></p>
      <p id="rightArrow" class="navigation"></p>
    </div>  
</template>

<script>
export default {
  name: 'AlbumView'
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
.albumTitle{
  margin: auto;
  height: 5%;
  font-size: 30px;
  color: white;
  text-shadow: 1px 0 black,0 1px black, 1px 0 black, 0 -1px black;
}
#albumContainer{
  max-width: 70%;
  margin: auto;
  border:  1px solid black;
  border-collapse: collapse;
  box-shadow: 10px 10px black;
  visibility: hidden;
  /* background-color: black; */
}
/* https://www.w3schools.com/howto/howto_css_button_on_image.asp */
.playButton{
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  width: 30%;
  border: none;
  display: none;
  pointer-events: none;
}
/* .playable::before{
  background-image: url("../assets/bunny.gif");
  position: absolute;
  content: '';
  margin: auto;
  width: 200px;
  height: 200px;
  pointer-events: none;
}
.playable:hover{
  opacity: 100%;
} */
#albumCover{
  max-width: 100%;
  max-height: 100%;
}

#albumCover:hover{
  cursor: pointer;
  opacity: 80%;
}

/* #albumTrackContainer{
  overflow-y: scroll;
  width: 100%;
  max-height: 100%;
} */

#loadingScreen{
  max-height: 50%;
  max-width: 50%;
  margin: auto;
  display: none;
}
#lScreen{
  height: 100%;
  width: 100%;
  margin: auto;
  display: none;
  background-image: url("../assets/panda.gif");
  background-size: 150px;
  background-repeat:no-repeat;
  background-position: center;
}
.navigation{
  margin-top: 200px;
}
#leftArrow{
  height: 30%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NAV_BUTTON_L.png");
  background-size: 300%;
  background-repeat:no-repeat;
  background-position: center;
}
#leftArrow:hover{
  /* border-right: 50px solid rgb(11, 11, 11); */
  opacity: 30%;
  background-size: 330%; 
}

#rightArrow{
  height: 30%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NAV_BUTTON_R.png");
  background-size: 300%;
  background-repeat:no-repeat;
  background-position: center;
}
#rightArrow:hover{
  /* border-left: 50px solid rgb(100, 100, 100);  */
  opacity: 30%; 
  background-size: 330%;
}
#albumNavigation{
  width: 50%;
  height: 65%;
  left: 25%;
  right: 25%;
  position: absolute;
  display: grid;
  grid-template-columns: 10% auto 10%;
  margin-bottom: 10%;
}

</style>

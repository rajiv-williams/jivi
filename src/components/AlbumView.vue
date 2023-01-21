<template>
    <h1 class="albumTitle">ALBUM TITLE</h1>
    <div id="albumNavigation">
      <p id="leftArrow" class="navigation"></p>
      
        
        <div id="albumContainer">
          <img alt="Album Cover" id="albumCover" src="">
          <div id="albumTrackContainer"></div>
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
  max-width: 65%;
  margin: auto;
  border:  1px solid black;
  border-collapse: collapse;
  box-shadow: 10px 10px black;
  visibility: hidden;
  /* background-color: black; */
}
#albumCover{
  max-width: 100%;
  max-height: 100%;
}
#albumTrackContainer{
  overflow-y: scroll;
  width: 100%;
  max-height: 90px;
}

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
  height: 20%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NAV_BUTTON_L.png");
  background-size: 200px;
  background-repeat:no-repeat;
  background-position: center;
}
#leftArrow:hover{
  /* border-right: 50px solid rgb(11, 11, 11); */
  opacity: 30%; 
}

#rightArrow{
  height: 20%;
  width: 100%;
  margin: auto;
  background-image: url("../assets/NAV_BUTTON_R.png");
  background-size: 200px;
  background-repeat:no-repeat;
  background-position: center;
}
#rightArrow:hover{
  /* border-left: 50px solid rgb(100, 100, 100);  */
  opacity: 30%; 
}
#albumNavigation{
  width: 50%;
  height: 50%;
  left: 25%;
  right: 25%;
  position: absolute;
  display: grid;
  grid-template-columns: 10% auto 10%;
  margin-bottom: 10%;
}

</style>

<template>
    <h1 class="albumTitle">ALBUM TITLE</h1>
    <div id="albumNavigation">
      <a id="leftArrow" class="navigation"></a>
      
        
        <div id="albumContainer">
          <img alt="Album Cover" id="albumCover" src="">
          <div id="albumTrackContainer"></div>
        </div>
      
      
      <!-- <img alt="Loading..." id="loadingScreen" src=""> -->
      <p id="lScreen" ></p>
      <a id="rightArrow" class="navigation"></a>
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
}
#albumCover{
  max-width: 100%;
  max-height: 100%;
}
#albumTrackContainer{
  overflow-y: scroll;
  width: 100%;
  max-height: 70px;
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
  width: 0;
	height: 0;
  margin: auto;
	border-top: 35px solid transparent;
	border-right: 50px solid rgb(11, 11, 11);
	border-bottom: 35px solid transparent;
}
#leftArrow:hover{
  border-right: 50px solid rgb(147, 147, 147); 
}

#rightArrow{
  width: 0;
	height: 0;
  margin: auto;
	border-top: 35px solid transparent;
	border-left: 50px solid rgb(11, 11, 11);
	border-bottom: 35px solid transparent;
}
#rightArrow:hover{
  border-left: 50px solid rgb(100, 100, 100); 
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

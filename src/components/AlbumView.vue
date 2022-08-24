<template>
    <h1 class="albumTitle">ALBUM TITLE</h1>
    <div id="albumNavigation">
      <a id="leftArrow" class="navigation"></a>
      
      <div id="album">
        <img alt="Album Cover" id="albumCover" src="">
        <div id="albumTracks"></div>
      </div>

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
#album{
  max-width: 350px;
  margin: auto;
  border:  1px solid black;
  border-collapse: collapse;
  box-shadow: 10px 10px black;
}
#albumCover{
  max-width: 100%;
  max-height: 100%;
}
#albumTracks{
  overflow-y: scroll;
  width: 100%;
  height: 70px;
}
.navigation{
  margin-top: 200px;
}
#leftArrow{
  width: 0;
	height: 0;
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
	border-top: 35px solid transparent;
	border-left: 50px solid rgb(11, 11, 11);
	border-bottom: 35px solid transparent;
}
#rightArrow:hover{
  border-left: 50px solid rgb(100, 100, 100); 
}
#albumNavigation{
  max-width: 50%;
  margin: auto;
  display: grid;
  grid-template-columns: 10% auto 10%;
}

</style>

<template>
  <p id="print">
  </p>
</template>

<script>
import $ from 'jquery';
import path from 'path-browserify';
export default {
  name: 'AlbumView',
  mounted(){
    
      $(document).ready(function(){
        //var mainDir = "./";
        //  var path = require('path');
        //var path = require('path');
        //var albums = path.parse(mainDir);
        //document.getElementById("print").innerHTML = albums;
        //console.log(path.format(albums));

        // var fs = require('fs');
        // fs.readdir(mainDir, (error,files) =>{
        //   if(error){
        //     console.log(error);
        //   }
        //   else{
        //     console.log("\nCurrent directory filenames:");
        //     files.forEach(file =>{
        //       console.log(file);
        //     })
        //   }
        // });
        
        var allSongs = require.context('@/music', true, /\.(mp3)$/).keys();
        var albumCovers = require.context('@/music', true, /\.(png|jpg)$/).keys();
        console.log(path.parse(allSongs[0]));
        console.log(albumCovers);

        //Getting the list of albums
        var allAlbums = []; 
        for(var i=0; i<allSongs.length;i++){
          var song = path.parse(allSongs[i]);
          var album = song.dir;

          if(!find(album,allAlbums)){
            allAlbums[allAlbums.length] = album;
            //add to track list
            
          }
        }
        console.log("allAlbums: " + allAlbums);

        //Getting the track lists for each album
        var trackLists = [];
        for(i=0;i<allAlbums.length;i++){
          var tracks = [];

          for(var j=0;j<allSongs.length;j++){
            song = path.parse(allSongs[j]);
            //console.log(song.dir + " vs " + allAlbums[i]);
            if(song.dir == allAlbums[i]){
              
              tracks[tracks.length] = song.name;
              trackLists[i] = tracks;
            }
          }
        }
        document.getElementById("print").innerHTML = trackLists;
        console.log("trackLists: " + trackLists);


        /*
          TODO: 
            -Write code to dynamically build table of first album with track list
            -Make track list playable
            -Then write a loop for all albums
            -Make it so only one album is shown at a time with css
            -Make right and left arrows functional to switch between each album
        */

        
      })

      function find(x,list){
        for(var i=0;i<list.length; i++){
          if(list[i] == x){
            return  true
          }
        }
        return false;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

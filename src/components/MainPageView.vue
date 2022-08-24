<template>
  
  <div id="background">
    <album-view/>
    <br>
    <!--PLAY BOX-->
    <play-box-view/>
  </div>
  
  
</template>

<script>
import $ from 'jquery';
import albumList from '../scripts/data.js'
import path from 'path-browserify';
import PlayBoxView from '@/components/PlayBoxView.vue';
import AlbumView from '@/components/AlbumView.vue'
export default {
  name: 'MainPageView',
  components: {PlayBoxView,AlbumView},
  mounted(){
    
      $(document).ready(function(){

        //INCLUDE IN README, PROGRAM WORKS BEST IN CHROME

        //how to change data in JSON FILE
        // fetch('test_data.json')
        // .then((resp) => resp.json())
        // .then(function(data) { // success
        //     var firstName = document.getElementById('jsonFirstName');
        //     var lastName = document.getElementById('jsonLastName');
        //     firstName.setAttribute('value', data['firstName']);
        //     lastName.setAttribute('value', data['lastName']);
        // })
        // .catch(function(error) { // error
        //     console.log(error);
        // });  
        
        /*
         * If I ever make a JSON file with the albumList, then the require
         * must go into a String. To convert it back in the code to get the
         * value, convert to Object. If that doesn't work idk what will
        */
        
        

        
        //console.log(JSON.parse('"require('+ "../music/album1/album1.jpg" + ')"'))
        //albumList[0].tracks[0].src = require(news);
        var allSongs = require.context('../music', true, /\.(mp3)$/).keys();
        var albumCovers = require.context('../music', true, /\.(png|jpg)$/).keys();
        // console.log(path.parse(allSongs[0]));
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
        var trackLists = getTrackLists();
        
        
        console.log("trackLists: " + trackLists[1]);


        /*
          TODO: 
            +Write code to dynamically build table of first album's track list
            +Make track list playable
            +Make right and left arrows functional to switch between each album using albumIndex (+/-)
            +Make it so only one album is shown at a time with css
        */

        //EVERY TIME AN ALBUM IS SELECTED REPEAT THIS ENTIRE THING BELOW
        //HAVE AN EVENT HANDLER FOR WHEN A NEXT ARROW IS CLICKED
        //REMEMBER WHERE IN THE LIST OF ALBUMS YOU ARE

        
        // let test = '../music/album1/album1.jpg'; 
        currAlbumCover.attr("src",albumList[albumIndex].cover);
        
        
        buildAlbum(currAlbum,trackLists,albumIndex);

        $("#leftArrow").click(function(){

          if(albumIndex != 0){
            // unloadAlbum(trackLists,albumIndex);
            removeAlbum(currAlbum,trackLists,albumIndex);
            albumIndex -= 1;
            buildAlbum(currAlbum,trackLists,albumIndex);
            currAlbumCover.attr("src",albumList[albumIndex].cover);
            albumTitle.text(albumList[albumIndex].name);
          }
          
        });
        $("#rightArrow").click(function(){

          if(albumIndex < albumList.length -1){
            // unloadAlbum(trackLists,albumIndex);
            removeAlbum(currAlbum,trackLists,albumIndex);
            albumIndex+=1;
            buildAlbum(currAlbum,trackLists,albumIndex);
            currAlbumCover.attr("src",albumList[albumIndex].cover);
            albumTitle.text(albumList[albumIndex].name);
          }
          
        });
        //var cunny = require('../music/album1/./nolimit.mp3');
        //for(i=0; i<trackLists[albumIndex].length;i++){
          //var currTrack = $("tr");
          //var bruh = require('../music/album1/./nolimit.mp3')
          //musicPlayer.src = require(currTrack.attr("src"));
          //console.log(String(currTrack.attr("src")));
          
        $("#shuffleButton").click(function(){
          var shuffleButton = $(this);
          if(isShuffle){
            isShuffle = false;
            shuffleButton.text("SHUFFLE OFF");
          }
          else{
            isShuffle = true;
            shuffleButton.text("SHUFFLE ON");
          }
          
        });  
          
          //change tr to a class maybe idk
          // $(".tracks").click(playTrack);
        //}
        
        
        //var isShuffle = false;
          

      });
      let albumIndex = 0;
      
      let currAlbum = $("#albumTracks");
      let currAlbumCover = $("#albumCover");
      let albumTitle = $(".albumTitle");
      albumTitle.text(albumList[albumIndex].name);
      var isShuffle = true;
      // let shuffleButton = document.getElementById("shuffleButton")
      let queue = [];
      let queueIndex = 0;
      let musicPlayer = document.getElementById("musicPlayer");
      let trackNum = 0;
      let defaultClass = "tracks grid-container";
      musicPlayer.controls = true;

      
      

      function playTrack(){
        
          $(".trackNumber").attr("class","trackNumber play");
          // console.log($(this).attr("id"));
          defaultClass = "tracks grid-container";
          $(".playing").attr("class",defaultClass );
          var currTrack = $(this);
          trackNum = currTrack.attr("id").split("track")[1]
          var trackList = albumList[albumIndex].tracks;
          
          musicPlayer.src = trackList[parseInt(trackNum)-1].src;//require(currTrack.attr("src")); 
          currTrack.attr("class","playing "+ defaultClass);

          musicPlayer.play();
          $("#songPlaying").text($("#track"+trackNum).attr("display"));
          $("#displayAlbum").attr("src",albumList[albumIndex].cover);
          //Display pause button whenever track Number is hovered over
          //$("#controls"+trackNum).attr("class","trackNumber play");
          $("#controls"+trackNum).attr("class","trackNumber");
          // document.getElementById("print").innerHTML = currTrack.duration;
          queueIndex = 0;
          queue = getQueue(musicPlayer.getAttribute("src"),trackList,isShuffle);

          // $("#nextButton").click(playNext);

          musicPlayer.onended = playNext;
        
      }
      function playNext(){

          //Display play button whenever track number is hovered over
          $("#controls"+trackNum).attr("class","trackNumber play");
          
          //console.log("queue: " + queue)
          
          if(queueIndex < queue.length){
              $(".playing").attr("class",defaultClass);
              musicPlayer.src = queue[queueIndex][0];
              trackNum = queue[queueIndex][1];
              musicPlayer.play();
              $("#track"+trackNum).attr("class","playing " + defaultClass);

              //Display pause button whenever track Number is hovered over
              $("#controls"+trackNum).attr("class","trackNumber pause");
              $("#songPlaying").text($("#track"+trackNum).attr("display"));
              queueIndex++;
          }
          else{
              musicPlayer.src = "";
              $(".playing").attr("class",defaultClass );
              $("#songPlaying").text("");
              $("#displayAlbum").attr("src",require("../assets/Black_Box.png"));
              queueIndex = 0;
          }
          
            
        
      }
      function removeAlbum(album,trackLists,albumIndex){
        for(var i=0; i<trackLists[albumIndex].length; i++){
            album.children()[0].remove();
            
        }
      }
      
      function buildAlbum(album,trackLists,albumIndex){
        
        for(var i=0; i<trackLists[albumIndex].length; i++){
            var tr = $('<a>');
            var song = trackLists[albumIndex][i];
            

            // var songName = path.parse(songPath).name;
            tr.attr('id', 'track' + (i+1));
            tr.attr("src",song.src);
            tr.attr("display", song.name + " - " + song.artist);
            tr.attr("class","tracks grid-container");
            tr.click(playTrack);
            
            for(var j=0; j<2; j++){
                var td = $('<b>');
                if(j==0){
                  //print number of track in album
                  td.text(i+1);
                  td.attr("id","controls"+(i+1));
                  td.attr("class","trackNumber play");
                }
                if(j==1){
                  td.text(song.name);
                  td.attr("class","songTitle");
                }
                tr.append(td);
                
            }
            album.append(tr);
        }
      }
      function getTrackLists(){
        var trackLists = [];
        // for(var i=0;i<allAlbums.length;i++){
        //   var tracks = [];

        //   for(var j=0;j<allSongs.length;j++){
        //     var song = path.parse(allSongs[j]);
        //     //console.log(song.dir + " vs " + allAlbums[i]);
        //     if(song.dir == allAlbums[i]){
              
        //       // console.log("i:"+i+" j:"+j);
        //       tracks[tracks.length] = "../music/" + song.dir + "/" + song.base;
        //       // tracks[tracks.length] = require("../music/album1/nolimit.mp3");
        //       trackLists[i] = tracks;
        //     }
        //   }
        // }
        for(var i=0;i<albumList.length;i++){
          var tracks = [];
          var album = albumList[i].tracks;
          for(var j=0;j<album.length;j++){
            var song = album[j];
            //console.log(song.dir + " vs " + allAlbums[i]);
            // if(song.dir == allAlbums[i]){
              
            //   // console.log("i:"+i+" j:"+j);
            //   tracks[tracks.length] = "../music/" + song.dir + "/" + song.base;
            //   // tracks[tracks.length] = require("../music/album1/nolimit.mp3");
            //   trackLists[i] = tracks;
            // }
            tracks[tracks.length] = song;
            trackLists[i] = tracks;
          }
        }

        return trackLists;
      }

      function find(x,list){
        for(var i=0;i<list.length; i++){
          if(list[i] == x){
            return  true
          }
        }
        return false;
      }

      /*
        Returns a queue based on the current track, 
        its album (trackList) and whether shuffle is on or not
      */
      function getQueue(currTrackPath,trackList,isShuffle){    
          var queue = [];
          //when shuffle is off
          if(!isShuffle){
              var audioFound = false;
              
              for(var i = 0; i < trackList.length; i++){
                  if(trackList[i].src.match(currTrackPath) && !audioFound){
                      audioFound = true;
                      // console.log("ffffff");
                      continue;
                  }
                  if(audioFound){
                      //create a queue in chronological order
                      queue[queue.length] = [trackList[i].src,i+1];
                  }
              }
              return queue;
          }

          //when shuffle is on
          if(isShuffle){
              var ignoredIndexes = [];
              for(i = 0; i < trackList.length; i++){
                  //Initially clicked on song is ignored in the queue
                  if(trackList[i].src.match(currTrackPath)){
                      console.log(i)
                      ignoredIndexes.push(i);
                      break;
                  }
              }
              
              //queue ignores the current track
              while(queue.length < trackList.length - 1){
                  var randSongIndex = Math.floor(Math.random() * trackList.length);

                  //makes sure each song in the queue is unique
                  if(queue.indexOf(randSongIndex) == -1 && !ignoredIndexes.includes(randSongIndex)){
                      //add random song from trackList to the queue
                      queue.push([trackList[randSongIndex].src,randSongIndex+1]);
                      ignoredIndexes.push(randSongIndex);
                  }
              }  
              return queue;  
          }
          
      }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
body{
  background-image: url("../assets/background.jpg");
}

.tracks{
    max-width: 400px;
    background-color: white;
    font-size: 30px;
  
}
.tracks:hover{
    opacity: 0.9;
    background-color: rgb(230, 230, 230);
}
.playing{
    opacity: 0.9;
    background-color: rgb(195, 242, 174);
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
}
.trackNumber{
  text-align: left;
  margin-left: 10px;
}
.trackNumber:hover.play{
  text-indent: -9999px;
  width: 0;
	height: 0;
	border-top: 15px solid transparent;
	border-left: 25px solid rgb(11, 11, 11);
	border-bottom: 15px solid transparent;
  white-space: nowrap;
}
.trackNumber:hover.pause{
  text-indent: -9999px;
  width: 0px;
	height: 30px;
  border-style: double;
  border-width: 0px 0px 0px 25px;
  border-color: solid rgb(11, 11, 11);
  white-space: nowrap;
}
/* .songTitle{
   text-align: justify;
} */

body, html {
  height: 10%;
}

* {
  box-sizing: border-box;
}

</style>

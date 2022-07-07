<template>
  <p id="print">
  </p>
  <button id="leftArrow">LEFT</button>
  <button id="rightArrow">RIGHT</button>
  <div id="album">
    <img alt="Album Cover" id="albumCover" class="grid-item" src="">
    <div id="albumTracks"></div>
  </div>
  <br>
  <!--PLAY BOX-->
  <div id="playBox" class="grid-container">
    <button id="loopButton" class="grid-item playerButton">LOOP</button>
    <audio id="musicPlayer" class="grid-item"></audio>
    <button id="shuffleButton" class="grid-item playerButton">SHUFFLE</button>
  </div>
  
</template>

<script>
import $ from 'jquery';
import path from 'path-browserify';
export default {
  name: 'AlbumView',
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
        var trackLists = getTrackLists(allAlbums,allSongs);
        
        
        console.log("trackLists: " + trackLists[1]);


        /*
          TODO: 
            +Write code to dynamically build table of first album's track list
            +Make track list playable
            -Make right and left arrows functional to switch between each album using albumIndex (+/-)
            -Make it so only one album is shown at a time with css
        */

        //EVERY TIME AN ALBUM IS SELECTED REPEAT THIS ENTIRE THING BELOW
        //HAVE AN EVENT HANDLER FOR WHEN A NEXT ARROW IS CLICKED
        //REMEMBER WHERE IN THE LIST OF ALBUMS YOU ARE

        
        // let test = '../music/album1/album1.jpg'; 
        currAlbumCover.attr("src",require('../music/album1/album1.jpg'));
        
        
        buildAlbum(currAlbum,trackLists,albumIndex);

        $("#leftArrow").click(function(){

          if(albumIndex != 0){
            // unloadAlbum(trackLists,albumIndex);
            removeAlbum(currAlbum,trackLists,albumIndex);
            albumIndex -= 1;
            buildAlbum(currAlbum,trackLists,albumIndex);
            
          }
          
        });
        $("#rightArrow").click(function(){

          if(albumIndex < albumList.length -1){
            // unloadAlbum(trackLists,albumIndex);
            removeAlbum(currAlbum,trackLists,albumIndex);
            albumIndex+=1;
            buildAlbum(currAlbum,trackLists,albumIndex);
            
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
            shuffleButton.text("NO SHUFFLE");
          }
          else{
            isShuffle = true;
            shuffleButton.text("SHUFFLE");
          }
          
        });  
          
          //change tr to a class maybe idk
          $(".tracks").click(playTrack);
        //}
        
        
        //var isShuffle = false;
          

      });
      let albumIndex = 0;
      let currAlbum = $("#albumTracks");
      let currAlbumCover = $("#albumCover");
      var isShuffle = true;
      // let shuffleButton = document.getElementById("shuffleButton")
      let queue = [];
      let musicPlayer = document.getElementById("musicPlayer");
      musicPlayer.controls = true;

      
      var albumList =
      [
        {"name":"NOSTALGIA","artist":"Rajiv",
          "tracks": 
            [
              {"name":"NO LIMIT",
              "artist":"Rajiv",
              "src": require('../music/album1/nolimit.mp3'),
              },
              {"name":"NOSTALGIA",
              "artist":"Rajiv",
              "src": require('../music/album1/nostalgia.mp3')
              }
            ],
          "cover": "require('../music/album1/album1.jpg')"
        },
        {"name":"Album 2","artist":"Rajiv",
          "tracks": 
            [
              {"name":"CARTI",
              "artist":"Rajiv, Playboi Carti",
              "src": require('../music/album2/Gameboy beat acapella.mp3')
              },
              {"name":"GHOST",
              "artist":"Rajiv",
              "src": require('../music/album2/ghost.mp3')
              }
            ]
        }
      ];

      function playTrack(){
        // console.log($(this).attr("id"));
        var defaultClass = "tracks grid-container";
        $(".playing").attr("class",defaultClass );
        var currTrack = $(this);
        var trackNum = currTrack.attr("id").split("track")[1]
        var trackList = albumList[albumIndex].tracks;
        
        musicPlayer.src = trackList[parseInt(trackNum)-1].src;//require(currTrack.attr("src")); 
        currTrack.attr("class","playing "+ defaultClass);
        musicPlayer.play();
        // document.getElementById("print").innerHTML = currTrack.duration;
        var index = 0;
        musicPlayer.onended = function(){
          
          queue = getQueue(musicPlayer.getAttribute("src"),trackList,isShuffle);
          console.log("queue: " + queue)
          
          if(index < queue.length){
              $(".playing").attr("class",defaultClass);
              musicPlayer.src = queue[index][0];
              musicPlayer.play();
              $("#track"+queue[index][1]).attr("class","playing " + defaultClass);
              index++;
          }
          else{
              musicPlayer.src = "";
              $(".playing").attr("class",defaultClass );
          }
          
            
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
            var songPath = trackLists[albumIndex][i];
            //musicPlayer.src = require(songPath);
            // song.controls = true;
            var song = path.parse(songPath);

            // var songName = path.parse(songPath).name;
            tr.attr('id', 'track' + (i+1));
            $("#track"+(i+1)).text("fffsqsah");
            tr.attr("src",songPath);
            tr.attr("class","tracks grid-container")
            for(var j=0; j<2; j++){
                var td = $('<b>');
                if(j==0){
                  //print number of track in album
                  td.text(i+1);
                  td.attr("id","controls"+(i+1));
                  td.attr("class","trackNumber");
                }
                if(j==1){
                  td.text(song.name);
                }
                tr.append(td);
                
            }
            album.append(tr);
        }
        $(".tracks").click(playTrack);
      }
      function getTrackLists(allAlbums,allSongs){
        var trackLists = [];
        for(var i=0;i<allAlbums.length;i++){
          var tracks = [];

          for(var j=0;j<allSongs.length;j++){
            var song = path.parse(allSongs[j]);
            //console.log(song.dir + " vs " + allAlbums[i]);
            if(song.dir == allAlbums[i]){
              
              // console.log("i:"+i+" j:"+j);
              tracks[tracks.length] = "../music/" + song.dir + "/" + song.base;
              // tracks[tracks.length] = require("../music/album1/nolimit.mp3");
              trackLists[i] = tracks;
            }
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
#album{
  max-width: 400px;
  margin: auto;
  
  box-shadow: 10px 10px black;
}
#albumCover{
  max-width: 400px;
  max-height: 400px;
}
#albumTracks{
  width: 400px;
  
}
.tracks{
    max-width: 400px;
    
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
#playBox{
  height: 100px;

  background-color: rgb(19, 19, 20);
}
#musicPlayer{
  width: 100%;
  margin-top: 20px;
}
#musicPlayer::-webkit-media-controls-panel {
  background-color: #bc3131;
  
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
}
.trackNumber{
  text-align: left;
  margin-left: 20%;
}

.playerButton{
  max-width: 50%;
  max-height: 50%;
  margin: auto;
}
</style>

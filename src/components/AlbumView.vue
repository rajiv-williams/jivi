<template>
  <p id="print">
  </p>
  <div id="album">
      <img alt="Album Cover" id="albumCover" src="">
    <table id="albumTracks"></table>
  </div>
  <!--PLAY BOX-->
  <audio id="musicPlayer"></audio>
</template>

<script>
import $ from 'jquery';
import path from 'path-browserify';
export default {
  name: 'AlbumView',
  mounted(){
    
      $(document).ready(function(){
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
              ]
          },
          {"name":"Album 2","artist":"Rajiv",
            "tracks": 
              [
                {"name":"GHOST",
                "artist":"Rajiv",
                "src": require('../music/album2/ghost.mp3')
                },
                {"name":"CARTI",
                "artist":"Rajiv, Playboi Carti",
                "src": require('../music/album2/Gameboy beat acapella.mp3')
                }
              ]
          }
        ];

        
        //albumList[0].tracks[0].src = require(news);
        var allSongs = require.context('../music', true, /\.(mp3)$/).keys();
        var albumCovers = require.context('../music', true, /\.(png|jpg)$/).keys();
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
        var trackLists = getTrackLists(allAlbums,allSongs);
        
        
        console.log("trackLists: " + trackLists);


        /*
          TODO: 
            +Write code to dynamically build table of first album's track list
            -Make track list playable
            -Make right and left arrows functional to switch between each album using albumIndex (+/-)
            -Make it so only one album is shown at a time with css
        */

        //EVERY TIME AN ALBUM IS SELECTED REPEAT THIS ENTIRE THING BELOW
        //HAVE AN EVENT HANDLER FOR WHEN A NEXT ARROW IS CLICKED
        //REMEMBER WHERE IN THE LIST OF ALBUMS YOU ARE
        let albumIndex = 0;
        let currAlbum = $("#albumTracks");
        let currAlbumCover = $("#albumCover");
        currAlbumCover.attr("src",require("../music/album1/album1.jpg"));
        let musicPlayer = document.getElementById("musicPlayer");
        musicPlayer.controls = true;
        buildAlbum(currAlbum,trackLists,albumIndex);
        //var cunny = require('../music/album1/./nolimit.mp3');
        //for(i=0; i<trackLists[albumIndex].length;i++){
          //var currTrack = $("tr");
          //var bruh = require('../music/album1/./nolimit.mp3')
          //musicPlayer.src = require(currTrack.attr("src"));
          //console.log(String(currTrack.attr("src")));
          
          var isShuffle = false;
          
          //change tr to a class maybe idk
          $(".tracks").click(function(){
            var trackNum = $(this).attr("id").split("track")[1]
            var trackList = albumList[albumIndex].tracks;
            var currTrack = trackList[parseInt(trackNum)-1];
            musicPlayer.setAttribute("src",currTrack.src);//require(currTrack.attr("src")); 
            musicPlayer.set
            musicPlayer.play();
            document.getElementById("print").innerHTML = currTrack.duration;

            musicPlayer.onended = function(){
              
              var queue = getQueue(musicPlayer.getAttribute("src"),trackList,isShuffle);
              var index = 0;
              if(index < queue.length){
                  musicPlayer.src = queue[index];
                  musicPlayer.play();
                  index++;
              }
              else{
                  musicPlayer.src = "";
              }
              
                
            }
          });
        //}
        
        
        //var isShuffle = false;
          

      });

      // function unloadAlbum(album,trackLists,albumIndex){
      //   //remover all id attributes so it is not confused
      // }
      
      function buildAlbum(album,trackLists,albumIndex){
        for(var i=0; i<trackLists[albumIndex].length; i++){
            var tr = $('<tr>');
            var songPath = trackLists[albumIndex][i];
            //musicPlayer.src = require(songPath);
            // song.controls = true;
            var song = path.parse(songPath);

            // var songName = path.parse(songPath).name;
            tr.attr('id', 'track' + (i+1));
            tr.attr("src",songPath);
            tr.attr("class","tracks")
            for(var j=0; j<3; j++){
                var td = $('<td>');
                if(j==0){
                  //print number of track in album
                  td.text(i+1);
                  td.attr("id","controls"+(i+1));
                }
                if(j==1){
                  td.text(song.name);
                }
                tr.append(td);
                
            }
            album.append(tr);
        }
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

          //when shuffle is off
          if(!isShuffle){
              var audioFound = false;
              var queue = [];
              for(var i = 0; i < trackList.length; i++){
                  if(trackList[i].src.match(currTrackPath) && !audioFound){
                      audioFound = true;
                      console.log("ffffff");
                      continue;
                  }
                  if(audioFound){
                      //create a queue in chronological order
                      queue[queue.length] = trackList[i].src;
                  }
              }
              return queue;
          }

          //when shuffle is on
          if(isShuffle){
              var ignoredIndex = 0;
              queue = [];
              for(i = 0; i < trackList.length; i++){
                  if(trackList[i].src.match(currTrackPath)){
                      ignoredIndex = i;
                      break;
                  }
              }
              
              //queue ignores the current track
              while(queue.length < trackList.length - 1){
                  var randSongIndex = -1;

                  //case where the first song in the album is the current track (not included in queue)
                  if(ignoredIndex == 0){
                      randSongIndex = Math.floor(Math.random() * trackList.length + 1);
                  }
                  //cases where the first song is included in the queue
                  else{
                      randSongIndex = Math.floor(Math.random() * trackList.length);
                  }
                  if(queue.indexOf(randSongIndex) === -1){
                      //add random song from trackList to the queue
                      queue.push(trackList[randSongIndex].src);
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
#albumTracks{
  margin: auto;
  box-shadow: 10px 10px black;
}
.tracks{
    width: 400px;
    margin: auto;
    font-size: 50px;
  
}
.tracks:hover{
    opacity: 0.9;
    background-color: rgb(230, 230, 230);
}
</style>

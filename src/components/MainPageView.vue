<template>
  
  <div id="background">
    
  </div>
  
  <album-view/>
  <!--PLAY BOX-->
  <play-box-view />
  <!-- <input type="file" ref="myfile">
  <button id="addButton" @click="upload">ADD</button> -->
  
</template>

<script>
import $ from 'jquery';
import PlayBoxView from '@/components/PlayBoxView.vue';
import AlbumView from '@/components/AlbumView.vue'
import { storage } from "@/firebase/firebase"
import {ref,listAll,getDownloadURL,getMetadata} from "firebase/storage"
import "firebase/storage"

export default {
  name: 'MainPageView',
  components: {PlayBoxView,AlbumView},
  mounted(){
      
      let albumList = [];
      let trackContainer = $("#albumTrackContainer");
      //let currAlbumCover = $("#albumCover");
      let currTrackList = [];
      let currTrackInfo = null;

      let albumIndex = 0;
      let albumTitle = $(".albumTitle");
      let albumCoverSRC = "";
      let isShuffle = false;
      let shuffleButton = $("#shuffleButton");
      // let shuffleButton = document.getElementById("shuffleButton")
      let queue = {"queue":[],"albumCoverSRC":""};
      //let queue = [];
      let queueIndex = 0;
      let musicPlayer = document.getElementById("musicPlayer");
      let trackNum = 0;
      let defaultClass = "tracks grid-container";
      musicPlayer.controls = true;
      let songIsPlaying = false;
      
      
      
      $(document).ready(async function(){

        //TODO: INCLUDE IN README, PROGRAM WORKS BEST IN CHROME
        //getCloudImages();
        await getAlbums();
        buildTrackList(albumTitle.text());
        // initialize Shuffle button
        shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
        /*
        ---COMPLETED---
          TODO: 
            +Write code to dynamically build table of first album's track list
            +Make track list playable
            +Make right and left arrows functional to switch between each album using albumIndex (+/-)
            +Make it so only one album is shown at a time with css
        */

        //EVERY TIME AN ALBUM IS SELECTED REPEAT THIS ENTIRE THING BELOW
        //HAVE AN EVENT HANDLER FOR WHEN A NEXT ARROW IS CLICKED
        //REMEMBER WHERE IN THE LIST OF ALBUMS YOU ARE        

        $("#leftArrow").click(function(){

          if(albumIndex != 0){
            resetAlbum();
            albumIndex -= 1;
            albumTitle.text(albumList[albumIndex]);
            buildTrackList(albumTitle.text());
          }
          
        });
        $("#rightArrow").click(function(){

          if(albumIndex < albumList.length -1){
            resetAlbum()
            albumIndex+=1;
            albumTitle.text(albumList[albumIndex]);
            buildTrackList(albumTitle.text());
          }
          
        });
        

        $("#shuffleButton").click(function(){
          if(!songIsPlaying){
            if(isShuffle){
              isShuffle = false;
              shuffleButton.text("SHUFFLE OFF");
              shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
            }
            else{
              isShuffle = true;
              shuffleButton.text("SHUFFLE ON");
              // document.getElementById("shuffleButton").style.backgroundImage = "url("+ imagePath2 +")";
              shuffleButton.attr("src",require("../assets/SHUFFLE_ON.png"));
            }
          }
        }); 
        
     
        $("#shuffleButton").hover(function(){
          shuffleButton.attr("src",require("../assets/SHUFFLE_H.png"));
        },function(){
          if(isShuffle){
            shuffleButton.attr("src",require("../assets/SHUFFLE_ON.png"));
          }
          else{
            shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
          } 
        })  

        $("#nextButton").click(playNextOrPrev);      
        $("#prevButton").click(playNextOrPrev);      

      });

      // function getCloudImages(){
        
      //   const listRef = ref(storage, "images");

      //   listAll(listRef).then((res) =>{
    
      //     //https://thumbs.gfycat.com/DisgustingSameAfricanfisheagle-size_restricted.gif
      //     const image = res.items.find((imageRef) => imageRef.name.match("panda.gif"));
      //     getDownloadURL(image).then((url) => {
      //       $("#loadingScreen").attr("src",url);
              
      //     });
      //     console.log(res.items)
      //   }).catch((error) => {
      //     // An error occurred
      //     console.log(error);
      //   });

      // }
      async function getAlbums(){

        // get all folders in the root
        const listRef = ref(storage, "");

        await listAll(listRef).then((res) =>{

          res.prefixes.forEach((folderRef) => {
            console.log("FOLDER NAME:"+folderRef.name)
            albumList.push(folderRef.name);
          });
        }).catch((error) => {
          // An error occurred
          console.log(error);
        });

        if(albumList.length > 0){
          albumTitle.text(albumList[0]);
        }

      }
      //https://firebase.google.com/docs/storage/web/list-files
      async function buildTrackList(albumDirectory){

        // SHOW CIRCULAR PROGRESS INDICATOR

        currTrackList = [];
        
        const listRef = ref(storage, albumDirectory);

        await listAll(listRef).then((res) =>{

          var index = 0;
          res.items.forEach(async (songRef) => {          
            
            await getDownloadURL(songRef).then(async (url) => {
              var songName = ""
              await getMetadata(songRef)
                .then((metadata) => {
                  songName = metadata.name.split(".")[0].toUpperCase().replace("_"," ")
                  if(url.match(".mp3")){
                    currTrackList.push({"src":url,"name":songName});
                  }
                  else{
                    $("#albumCover").attr("src",url);
                    albumCoverSRC = url;
                    document.getElementById("background").style.backgroundImage = "url("+url+")";
                  }
                  
                  if(res.items.length > 0 && res.items.length - 1 == index){
                    console.log("SONGS MainPage: "+currTrackList);

                    // HIDE CIRCULAR PROGRESS INDICATOR

                    buildAlbum(trackContainer);
                    console.log(url);
                  }
                  index += 1;
                })
                .catch((error) => {
                  // An error occurred
                  console.log(error);
                });
              
            });
          });
        }).catch((error) => {
          // An error occurred
          console.log(error);
        });

      }

      function playTrack(){

          // reset of symbol displayed when you hover over track number
          // $(".trackNumber").attr("class","trackNumber play");
          
          // previous track that was playing is unhighlighted (reset)
          $(".playing").attr("class",defaultClass );

          // previous track that was playing has play button show
          // when hovered over (reset)
          $("#controls"+trackNum).attr("class","trackNumber play");

          var currTrackElement = $(this);
          trackNum = currTrackElement.attr("id").split("track")[1]
          
          // change music player to current track
          currTrackInfo = currTrackList[parseInt(trackNum)-1];
          musicPlayer.src = currTrackInfo.src;

          // currently playing track is highlighted
          currTrackElement.attr("class","playing "+ defaultClass);

          musicPlayer.play();

          

          // Display pause button whenever track Number is hovered over
          $("#controls"+trackNum).attr("class","trackNumber pause");

          console.log("CURRENT SONG: " + musicPlayer.getAttribute("src"))
          
          // initialize queue index to first song in queue
          queueIndex = 0;

          queue = getQueue(musicPlayer.getAttribute("src"),isShuffle);

          // display currently playing track info in PlayBox
          $("#songPlaying").text(queue.queue[0].trackName);
          document.getElementById("displayAlbum").style.visibility = "visible";
          $("#displayAlbum").attr("src",queue.albumCoverSRC);

          // play next track by default
          musicPlayer.onended = playNextOrPrev;
        
      }

      /* 
        Function by default plays next track in queue.
        If the element id contains 'prev', it plays the previous
        track in the queue.
      */
      function playNextOrPrev(){

          // Display play button whenever track number is hovered over
          $("#controls"+trackNum).attr("class","trackNumber play");
          
          
          if($(this).attr("id").match("prev")){
            // make current track the previous track in the queue
            queueIndex--;
          }
          else{
            // make current track the next track in the queue
            queueIndex++;
          }

          for(var i = 0; i < queue.queue.length; i++){
            console.log("QUEUE["+i+"]: " + queue.queue[i].trackName);
          }
          
          
          // if queueIndex is within range of the queue
          if(queueIndex < queue.queue.length && queueIndex >= 0){
              // previous track that was playing is unhighlighted (reset)
              $(".playing").attr("class",defaultClass);

              // play the next track in the queue
              musicPlayer.src = queue.queue[queueIndex].src;
              trackNum = queue.queue[queueIndex].trackNumber;
              musicPlayer.play();

              $("#track"+trackNum).attr("class","playing " + defaultClass);

              // Display pause button whenever track Number is hovered over
              $("#controls"+trackNum).attr("class","trackNumber pause");

              // display currently playing track info in PlayBox
              $("#songPlaying").text(queue.queue[queueIndex].trackName);
              $("#displayAlbum").attr("src",queue.albumCoverSRC);
          }
          else{
              // reset PlayBox and queue
              musicPlayer.src = "";
              $(".playing").attr("class",defaultClass );
              $("#songPlaying").text("");
              document.getElementById("displayAlbum").style.visibility = "hidden";
              queueIndex = 0;
              queue.queue = [];
          }
        
      }
      // function playPrev(){          
      //     queueIndex--;
      //     if(queueIndex >= 0){
      //         $(".playing").attr("class",defaultClass);
      //         musicPlayer.src = queue[queueIndex].src;
      //         trackNum = queue[queueIndex].trackNumber;
      //         musicPlayer.play();

      //         $("#track"+trackNum).attr("class","playing " + defaultClass);

      //         //Display pause button whenever track Number is hovered over
      //         $("#controls"+trackNum).attr("class","trackNumber pause");
      //         $("#songPlaying").text($("#track"+trackNum).attr("display"));
      //         $("#displayAlbum").attr("src",currAlbumCover.attr("src"));
      //     }
      //     else{
      //         musicPlayer.src = "";
      //         $(".playing").attr("class",defaultClass );
      //         $("#songPlaying").text("");
      //         //$("#displayAlbum").attr("src",require("../assets/Black_Box.png"));
      //         document.getElementById("displayAlbum").style.visibility = "hidden";
      //         queueIndex = 0;
      //         queue = [];
      //     }
        
      // }

      function resetAlbum(){
        document.getElementById("albumContainer").style.display = "none";
        //document.getElementById("loadingScreen").style.display = "block";
        document.getElementById("lScreen").style.display = "block";
        for(var i=0; i<currTrackList.length; i++){
            trackContainer.children()[0].remove();        
        }
        // queue = [];
      }

      function buildAlbum(album){
        

        
        for(var i=0; i<currTrackList.length; i++){
            var tr = $('<div>');
            var song = currTrackList[i];
            

            // var songName = path.parse(songPath).name;
            tr.attr('id', 'track' + (i+1));
            tr.attr("src",song.src);
            tr.attr("display", song.name + " - " + "RAJIV");
            tr.attr("class","tracks grid-container");
            tr.click(playTrack);
            
            for(var j=0; j<2; j++){
                var td = $('<b>');
                td.attr("style","color: black;");
                if(j==0){
                  //print number of track in album
                  td.text(i+1);
                  td.attr("id","controls"+(i+1));
                  td.attr("class","trackNumber play");
                }
                if(j==1){
                  td.text(song.name);
                  // if(currTrackInfo != null && song.name == currTrackInfo.name){
                  //   alert(song.name);
                  //   tr.attr("class","tracks grid-container playing");
                  //   queue = getQueue(currTrackInfo.src,isShuffle);
                  // }
                  // else{
                  //   td.attr("class","songTitle");
                  // }
                  td.attr("class","songTitle");
                  

                }
                tr.append(td);
                
            }
            album.append(tr);
        }
        document.getElementById("albumContainer").style.display = "block";
        document.getElementById("albumContainer").style.visibility = "visible";
        //document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("lScreen").style.display = "none";
      }
     
      /*
        Returns a queue based on the current track, 
        its album (trackList) and whether shuffle is on or not
      */
      function getQueue(currTrackPath,isShuffle){    
          queue.queue = [];
          queue.albumCoverSRC = albumCoverSRC;
          //when shuffle is off
   
          if(!isShuffle){
              var currTrackIndex = 0;
              for(var i = 0; i < currTrackList.length; i++){
                  console.log("TRACKLIST : " + currTrackList[i].name)
                  if(currTrackList[i].src == currTrackPath){
                      //skip current track from adding it to the queue
                      console.log("if loop: " + currTrackList[i].name)
                      queue.queue.push({"src":currTrackList[i].src,"trackNumber":i+1,"trackName":currTrackList[i].name});
                      currTrackIndex = i;
                  }
                  // if track is after current track and 
                  // current track is not the last track in the tracklist
                  if(i > currTrackIndex && trackNum != currTrackList.length){
                    //create a queue in chronological order
                    queue.queue.push({"src":currTrackList[i].src,"trackNumber":i+1,"trackName":currTrackList[i].name});
                    console.log("if loop: " + currTrackList[i].name)
                  }
              }
              console.log(queue);
              return queue;
          }

          //when shuffle is on
          if(isShuffle){
              var ignoredIndexes = [];
              for(i = 0; i < currTrackList.length; i++){
                  //add current track to the front of the start of the queue
                  if(currTrackList[i].src == currTrackPath){
                    queue.queue.push({"src":currTrackList[i].src,"trackNumber":i+1,"trackName":currTrackList[i].name});
                      ignoredIndexes.push(i);
                      break;
                  }
              }
              
          
              while(queue.length <= currTrackList.length -1){
                  var randSongIndex = Math.floor(Math.random() * currTrackList.length);

                  //makes sure each song in the queue is unique
                  if(queue.queue.indexOf(randSongIndex) == -1 && !ignoredIndexes.includes(randSongIndex)){
                      //add random song from trackList to the queue
                      queue.queue.push({"src":currTrackList[randSongIndex].src,"trackNumber":randSongIndex+1,"trackName":currTrackList[randSongIndex].name});
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
/* body{
  background-image: url("../assets/background.jpg");
} */
#background{
  position: fixed;
  bottom: 0%;
  right: 0%;
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.jpg");
  background-position: center;
  filter: blur(8px);
  -webkit-filter: blur(8px);  
}

.tracks{
    max-width: 100%;
    max-height: 45px;
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
  grid-template-columns: 20% 70% 10%;
}
.trackNumber{
  text-align: left;
  margin-left: 10px;
}
/* .trackNumber:hover.play{
  text-indent: -9999px;
  width: 0;
  height:0;
  margin-left: 10px;
  margin: auto;
	border-top: 15px solid transparent;
	border-left: 25px solid rgb(11, 11, 11);
	border-bottom: 15px solid transparent;
  white-space: nowrap;
}

.trackNumber:hover.pause{
  text-indent: -9999px;
  width: 0px;
	height: 30px;
  margin-left: 10px;
  border-style: double;
  border-width: 0px 0px 0px 25px;
  border-color: solid rgb(11, 11, 11);
  white-space: nowrap;
} */
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

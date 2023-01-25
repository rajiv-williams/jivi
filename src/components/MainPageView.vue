<template>

  <div id="background">
  </div>
  <home-menu-view/>
  <side-queue/>  
  <album-view/>   
  <play-box-view />
  <!-- <input type="file" ref="myfile">
  <button id="addButton" @click="upload">ADD</button> -->
  
  
</template>

<script>
import $ from 'jquery';
import PlayBoxView from '@/components/PlayBoxView.vue';
import AlbumView from '@/components/AlbumView.vue'
import SideQueue from '@/components/SideQueue.vue';
import HomeMenuView from '@/components/HomeMenuView.vue'
import { storage } from "@/firebase/firebase"
import {ref,listAll,getDownloadURL,getMetadata} from "firebase/storage"
import "firebase/storage"

export default {
  name: 'MainPageView',
  components: {PlayBoxView,AlbumView,SideQueue,HomeMenuView},
  mounted(){
      
      let albumList = [];
      let albumListElement = $("#albumList");
      // let trackContainer = $("#albumTrackContainer");
      //let currAlbumCover = $("#albumCover");
      let currTrackList = [];
      let currTrackSRC = null;

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
      let defaultClass = "tracks";
      musicPlayer.controls = true;
      let songIsPlaying = false;
      let sideQueue = $("#sideQueueContainer");
      let playAlbumAutomatically = false;
      
      
      
      $(document).ready(async function(){

        //TODO: INCLUDE IN README, PROGRAM WORKS BEST IN CHROME
        //getCloudImages();
        loadFirebaseData();
        // initialize Shuffle button
        shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
        $(".playButton").attr("src",require("../assets/PLAY_BUTTON.png"))
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

        $("#leftArrow").click(showPrevAlbum);
        $("#rightArrow").click(showNextAlbum);

        shuffleButton.click(function(){
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
     
        shuffleButton.hover(function(){
          shuffleButton.attr("src",require("../assets/SHUFFLE_H.png"));
        },function(){
          if(isShuffle){
            shuffleButton.attr("src",require("../assets/SHUFFLE_ON.png"));
          }
          else{
            shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
          } 
        })  

        $(".playable").hover(function(){
          var children = document.getElementById($(this).attr("id")).children;
          console.log(children.length)
          // show play button overlay
          for(var i = 0; i < children.length; i++){
            if(children[i].className != null && children[i].className.match("playButton")){
              //alert("test")
              children[i].style.display = "block";
            }
          }
        }, function(){
          var children = document.getElementById($(this).attr("id")).children;
          // show play button overlay
          for(var i = 0; i < children.length; i++){
            if(children[i].className != null && children[i].className.match("playButton")){
              children[i].style.display = "none";
            }
          }
        })

        $("#nextButton").click(playNextOrPrev);      
        $("#prevButton").click(playNextOrPrev);   
        
        $("#albumCover").click(playTrack);

      });

      async function loadFirebaseData(){
        await getAlbums();
        buildTrackList(albumTitle.text());
      }

      function showPrevAlbum(){
        if(albumIndex != 0){
          resetAlbum();
          albumIndex -= 1;
          albumTitle.text(albumList[albumIndex]);
          buildTrackList(albumTitle.text());
        }
        
      }

      function showNextAlbum(){
        
        if(albumIndex < albumList.length -1){
          resetAlbum()
          albumIndex+=1;
          albumTitle.text(albumList[albumIndex]);
          buildTrackList(albumTitle.text());
        }
        
      }

      function showIndicationOfCurrentlyPlayingAlbum(){
        var listItems = document.getElementById("albumList").children;
        
        for(var i = 0; i < listItems.length; i++){
          var albumListMenuItems = listItems[i].children;
          var albumVinyl = null;
          for(var j = 0; j < albumListMenuItems.length; j++){

            // First element in children
            // if(albumListMenuItems[j].classList.contains("vinylContainer")){
            //   albumVinyl = albumListMenuItems[j].children[0];  
            // }

            albumVinyl = albumListMenuItems[j].children[0];

            // Reset previous album playing
            if(albumListMenuItems[j].classList.contains("albumPlaying") && albumVinyl!=null){
              albumListMenuItems[j].classList.remove("albumPlaying");
              albumVinyl.setAttribute("src",""); 
            }

            if(albumListMenuItems[j].innerText == albumList[albumIndex] && albumVinyl!=null){
              albumListMenuItems[j].classList.add("albumPlaying");

              // make this shown as the currently playing album
              albumVinyl.setAttribute("src",require("../assets/vinyl.gif"));
            }      
            
            
          }
        }
      }

      function addAlbumToMenu(albumName){
        // adds an album to the home menu > albums
        albumListElement.append(
          '<li>'+
            // '<div class="vinylContainer grid-container"></div>'+
            '<div class="albumMenuItem"><img class="vinyl" src="">'+albumName+'</div>'+
          '</li>'
        );
      }

      async function getAlbums(){

        // get all folders in the root
        const listRef = ref(storage, "");

        await listAll(listRef).then((res) =>{

          res.prefixes.forEach((folderRef) => {
            console.log("FOLDER NAME:"+folderRef.name)
            albumList.push(folderRef.name);
            addAlbumToMenu(folderRef.name);
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
                    currTrackList.push({"src":url,"name":songName,"order":index+1});
                  }
                  else{
                    $("#albumCover").attr("src",url);
                    albumCoverSRC = url;
                    document.getElementById("background").style.backgroundImage = "url("+url+")";
                  }
                  
                  if(res.items.length > 0 && res.items.length - 1 == index){
                    console.log("SONGS MainPage: "+currTrackList);

                    // HIDE CIRCULAR PROGRESS INDICATOR

                    // buildAlbum(trackContainer);
                    buildAlbum();

                    if(playAlbumAutomatically){
                      playTrack();
                      playAlbumAutomatically = false;
                    }
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
          $(".trackPlaying").attr("class",defaultClass );

          // previous track that was playing has play button show
          // when hovered over (reset)
          $("#controls"+trackNum).attr("class","trackNumber play");

          var htmlElement = $(this);

          // play all tracks from when you open the album
          var playFromAlbumCover = true; 
          if(htmlElement.attr("id") != undefined){
            playFromAlbumCover = htmlElement.attr("id").match("albumCover");
          }      

          // if album cover is clicked
          if(playFromAlbumCover || htmlElement.attr("id") == undefined){

            //document.getElementById("albumList").children[0].children[0].classList.add("playing");
            // start with first track in album
            trackNum = "1";

            // change music player to current track
            currTrackSRC = currTrackList[parseInt(trackNum)-1].src;
            //alert(currTrackList[parseInt(trackNum)-1].name)
            musicPlayer.src = currTrackSRC;
          }
          // if an actual track is clicked
          else{
            trackNum = htmlElement.attr("id").split("track")[1];

            currTrackSRC = htmlElement.attr("src");
            musicPlayer.src = currTrackSRC;
          }
          
          
          
          

          // Display pause button whenever track Number is hovered over
          $("#controls"+trackNum).attr("class","trackNumber pause");

          console.log("CURRENT SONG: " + musicPlayer.getAttribute("src"))
          
          // initialize queue index to first song in queue
          queueIndex = 0;

          // if you pressed on the queue itself, generate a new queue based on theh queue
          if(queue.queue.length > 0 && !playFromAlbumCover){
            trackNum = 1;  
            queue = getQueue(currTrackSRC,isShuffle,queue.queue);          
          }
          else{
            queue = getQueue(currTrackSRC,isShuffle,currTrackList);
          }

          currTrackSRC = queue.queue[0].src;
          musicPlayer.src = currTrackSRC;
          musicPlayer.play();
          showIndicationOfCurrentlyPlayingAlbum();
          buildSideQueue(sideQueue);      
          
          //alert(currTrackSRC)
          

          // currently playing track is highlighted
          $("#track"+queue.queue[0]["order"]).attr("class","trackPlaying "+ defaultClass);
          //alert("t:"+trackNum + " vs q:" + queue.queue[0]["order"])

          // display currently playing track info in PlayBox
          $("#songPlaying").text(queue.queue[0].name);
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
          
          var isPrev = $(this).attr("id").match("prev");
          if(isPrev){
            // make current track the previous track in the queue
            queueIndex--;
          }
          else{
            // make current track the next track in the queue
            queueIndex++;
          }

          for(var i = 0; i < queue.queue.length; i++){
            console.log("QUEUE["+i+"]: " + queue.queue[i].name);
          }
          
          
          // if queueIndex is within range of the queue
          if(queueIndex < queue.queue.length && queueIndex >= 0){
              // previous track that was playing is unhighlighted (reset)
              $(".trackPlaying").attr("class",defaultClass);

              // play the next track in the queue
              musicPlayer.src = queue.queue[queueIndex].src;
              trackNum = queue.queue[queueIndex].order;
              musicPlayer.play();

              $("#track"+trackNum).attr("class","trackPlaying " + defaultClass);

              // Display pause button whenever track Number is hovered over
              $("#controls"+trackNum).attr("class","trackNumber pause");

              // display currently playing track info in PlayBox
              $("#songPlaying").text(queue.queue[queueIndex].name);
              $("#displayAlbum").attr("src",queue.albumCoverSRC);
          }
          else{
              // reset PlayBox and queue
              musicPlayer.src = "";
              $(".trackPlaying").attr("class",defaultClass );
              $("#songPlaying").text("");
              document.getElementById("displayAlbum").style.visibility = "hidden";
              queueIndex = 0;
              queue.queue = [];
              resetSideQueue();
              playAlbumAutomatically = true;

              if(isPrev){
                showPrevAlbum();
              }
              else{
                showNextAlbum();
              }
              
          }
        
      }

      // function deleteChildren(element){
      //   var numChildren = element.children().length;
      //   for(var i=0; i<numChildren; i++){
      //       element.children()[0].remove();        
      //   }
      // }

      function resetAlbum(){
        document.getElementById("albumContainer").style.display = "none";
        //document.getElementById("loadingScreen").style.display = "block";
        document.getElementById("lScreen").style.display = "block";
        // for(var i=0; i<currTrackList.length; i++){
        //     trackContainer.children()[0].remove();        
        // }
        // queue = [];
      }

      function buildAlbum(){
        
        /* DOES NOTHING FOR NOW SINCE TRACKCONTAINER DNE RN */
        // for(var i=0; i<currTrackList.length; i++){
        //     var tr = $('<div>');
        //     var song = currTrackList[i];
            

        //     // var songName = path.parse(songPath).name;
        //     // tr.attr('id', 'track' + (i+1));
        //     tr.attr("src",song.src);
        //     tr.attr("display", song.name + " - " + "RAJIV");
        //     tr.attr("class","tracks grid-container");
        //     tr.click(playTrack);
            
        //     for(var j=0; j<2; j++){
        //         var td = $('<b>');
        //         td.attr("style","color: white;");
        //         if(j==0){
        //           //print number of track in album
        //           td.text(i+1);
        //           td.attr("id","controls"+(i+1));
        //           td.attr("class","trackNumber play");
        //         }
        //         if(j==1){
        //           td.text(song.name);
        //           td.attr("class","songTitle");
        //         }
        //         tr.append(td);
                
        //     }
        //     album.append(tr);
        // }

        /* SHOWS ALBUM VIEW */
        document.getElementById("albumContainer").style.display = "block";
        document.getElementById("albumContainer").style.visibility = "visible";
        document.getElementById("lScreen").style.display = "none";
      }

      function resetSideQueue(){
        console.log("CHILDREN: "+sideQueue.children().length)
        if(sideQueue.children().length == 2){
          for(var i = 0; i < 2; i++){
            sideQueue.children()[0].remove();
          }
        }        

        // close sideQueue
        document.getElementById("sideQueue").checked = false;
 
      }
      function buildSideQueue(sideQueue){
        
        
        resetSideQueue();

        // open sideQueue
        document.getElementById("sideQueue").checked = true;
        
        var ul = $("<ul>");
        ul.attr("class","listView");
        sideQueue.append('<label class="menu-toggle" for="sideQueue"><span>Toggle</span></label>');

        for(var i=0; i<queue.queue.length; i++){
            
            var song = queue.queue[i];
            
            var li = $("<li>");
            var div = $("<div>");
            // var songName = path.parse(songPath).name;
            div.attr('id', 'track' + (i+1));
            div.attr("src",song.src);
            div.attr("class","tracks "+ 'track' + (i+1));
            div.text(song.name);
            div.click(playTrack);
            
            li.append(div);
            ul.append(li);
        }

        sideQueue.append(ul);
      }
     
      /*
        Returns a queue based on the current track, 
        its album (trackList) and whether shuffle is on or not
      */
      function getQueue(currTrackPath,isShuffle,tracklist){    
          queue.queue = [];
          queue.albumCoverSRC = albumCoverSRC;
          //when shuffle is off
   
          if(!isShuffle){
              var currTrackIndex = 0;
              for(var i = 0; i < tracklist.length; i++){
                  console.log("TRACKLIST : " + tracklist[i].name)
                  if(tracklist[i].src == currTrackPath){
                      //skip current track from adding it to the queue
                      console.log("if loop: " + tracklist[i].name)
                      queue.queue.push({"src":tracklist[i].src,"order":queue.queue.length+1,"name":tracklist[i].name});
                      currTrackIndex = i;
                  }
                  // if track is after current track and 
                  // current track is not the last track in the tracklist
                  if(i > currTrackIndex){
                    //create a queue in chronological order
                    queue.queue.push({"src":tracklist[i].src,"order":queue.queue.length+1,"name":tracklist[i].name});
                    console.log("if loop: " + tracklist[i].name)
                  }
              }
              console.log(queue);
              return queue;
          }

          //when shuffle is on
          if(isShuffle){
              var ignoredIndexes = [];
              // for(i = 0; i < tracklist.length; i++){
              //     //add current track to the front of the start of the queue
              //     if(tracklist[i].src == currTrackPath){
              //       queue.queue.push({"src":tracklist[i].src,"order":queue.queue.length+1,"name":tracklist[i].name});
              //         ignoredIndexes.push(i);
              //         break;
              //     }
              // }
              
          
              while(queue.queue.length < tracklist.length){
                  var randSongIndex = Math.floor(Math.random() * tracklist.length);

                  //makes sure each song in the queue is unique
                  if(queue.queue.indexOf(randSongIndex) == -1 && !ignoredIndexes.includes(randSongIndex)){
                      //add random song from trackList to the queue
                      queue.queue.push({"src":tracklist[randSongIndex].src,"order":queue.queue.length+1,"name":tracklist[randSongIndex].name});
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
#albumList{
 top: 0; 
}

.tracks{
    max-width: 100%;
    max-height: 45px;
    background-color: black;
    font-size: 30px;
    color: white;
}
.tracks:hover{
    opacity: 0.9;
    background-color: rgb(34, 34, 34);
}
.trackPlaying{
    background-color: rgba(218, 174, 242, 0.301);
}
.albumPlaying{
  background-color: rgb(23, 23, 23);
  text-align: left;
  border: 1px dashed rgb(18, 18, 18) ;
  border-collapse: collapse;
}
.vinyl{
  width: 15%;

}
.grid-container {
  background-color: red;
  display: grid;
  grid-template-columns: auto auto;

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

/* .grid{
  height: 100%;
  padding: auto;
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
} */

body, html {
  height: 10%;
}

* {
  box-sizing: border-box;
}

</style>

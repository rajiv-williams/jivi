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
      let queue = {"queue":[],"albumCoverSRC":"","albumIndex":0};
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

        // --- Initialization ---

        // Database for Music
        loadFirebaseData();

        // Images 
        shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
        $(".playButton").attr("src",require("../assets/PLAY_BUTTON.png"))
        $(".jivi_logo").attr("src",require("../assets/JIVI_LOGO.png"))
        $("#instagramLogo").attr("src",require("../assets/IG.png"))
        $("#youtubeLogo").attr("src",require("../assets/YT.png"))
        $("#linkedinLogo").attr("src",require("../assets/IN.png"))


        // --- Event Listeners ---

        // Album Navigation
        $("#leftArrow").click(showPrevAlbum);
        $("#rightArrow").click(showNextAlbum);

        // When an album cover is clicked, play the tracks in the album
        $("#albumCover").click(playTrack);

        // Queue Navigation
        $("#nextButton").click(playNextOrPrev);      
        $("#prevButton").click(playNextOrPrev); 

        // Shuffle Toggling
        shuffleButton.click(function(){
          if(!songIsPlaying){
            isShuffle = !isShuffle;
            toggleShuffleStyling();
          }
        }); 
     
        shuffleButton.hover(function(){
          shuffleButton.attr("src",require("../assets/SHUFFLE_H.png"));
        },toggleShuffleStyling)  


        // [TEMPORARY FIX] 
        // fix styling with button so it doesn't display over "jivi" logo
        var albumToggleMenu = document.getElementById("albumMenu")
        var albumMenuIcon = document.getElementById("albumMenuIcon");

        if(albumToggleMenu.checked){
            albumMenuIcon.style.display = "none";
        }
        albumToggleMenu.addEventListener('change', function(){
          if(this.checked){
            albumMenuIcon.style.display = "none";
          }
          else{
            albumMenuIcon.style.display = "block";
          }
        })

        var socialToggleMenu = document.getElementById("socialMenu");
        var socialMenuIcon = document.getElementById("socialMenuIcon");

        if(socialToggleMenu.checked){
            socialMenuIcon.style.display = "none";
        }
        socialToggleMenu.addEventListener('change', function(){
          if(this.checked){
            socialMenuIcon.style.display = "none";
          }
          else{
            socialMenuIcon.style.display = "block";
          }
        })

        // Whenever you hover a playable element like an album, playlist, etc
        // it shows a play button as an overlay
        $(".playable").hover(function(){
          // get children of this playable element
          var children = document.getElementById($(this).attr("id")).children;
          console.log(children.length)
          
          for(var i = 0; i < children.length; i++){
            // get the element where the image of the overlay is
            if(children[i].className != null && children[i].className.match("playButton")){
              // show play button overlay
              children[i].style.display = "block";
            }
          }
        }, function(){
          var children = document.getElementById($(this).attr("id")).children;
          
          for(var i = 0; i < children.length; i++){
            if(children[i].className != null && children[i].className.match("playButton")){
              // hide play button overlay
              children[i].style.display = "none";
            }
          }
        })
      });

      /**
       * Function toggles the shuffle button's styling
       */
      function toggleShuffleStyling(){
        if(isShuffle){   
          shuffleButton.attr("src",require("../assets/SHUFFLE_OFF.png"));
        }
        else{
          shuffleButton.attr("src",require("../assets/SHUFFLE_ON.png"));
        }
      }

      /**
       * Initially loads albums and builds initial tracklist
       * from Firebase Cloud Storage
       */
      async function loadFirebaseData(){
        await getAlbums();
        buildTrackList(albumList[albumIndex]);

        // after albums are loaded, make them clickable
        $(".albumMenuItem").click(playAlbum);
      }

      /**
       * When an album is clicked, its album name is noted
       * and it searches the album list to play the album's
       * track list
       */
      function playAlbum(){

        var albumName = $(this).text();
        // find out if album being played is to the left or right of current album

        // find new album index
        for(var i =0; i < albumList.length; i++){
          if(albumList[i] == albumName){
            albumIndex = i;
          }
        }

        playAlbumAutomatically = true;
        switchAlbum();
        
      }

      /**
       * Resets the album view, then displays the album at the current album index
       */
      function switchAlbum(){
        resetAlbum();
        albumTitle.text(albumList[albumIndex]);
        buildTrackList(albumList[albumIndex]);
      }

      /**
       * Decrements album index, then switches to that album
       */
      function showPrevAlbum(){
        if(albumIndex != 0){
          albumIndex -= 1;
          switchAlbum();
        }
      }

      /**
       * Increments album index, then switches to that album
       */
      function showNextAlbum(){
        if(albumIndex < albumList.length -1){
          albumIndex += 1;
          switchAlbum();
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

      /**
       * While the current album is playing, it shows a vinyl .gif
       * next to the album name in the album menu
       */
      function showIndicationOfCurrentlyPlayingAlbum(){

        /**
         * gets album list items in album menu (this element is dynamically 
         * appended to in addAlbumToMenu() function)
         * 
         * essentially gets all the <li>
         */
        var listItems = document.getElementById("albumList").children;
        
        for(var i = 0; i < listItems.length; i++){

          // gets all the <div>'s in the current <li>
          var albumListMenuItems = listItems[i].children;
          var albumVinyl = null;

          for(var j = 0; j < albumListMenuItems.length; j++){

            // gets the <img> in the current <div>
            albumVinyl = albumListMenuItems[j].children[0];

            // Reset previous album playing
            if(albumListMenuItems[j].classList.contains("albumPlaying") && albumVinyl!=null){
              albumListMenuItems[j].classList.remove("albumPlaying");
              albumVinyl.setAttribute("src",""); 
            }

            // Set the current album playing
            if(albumListMenuItems[j].innerText == albumList[queue.albumIndex] && albumVinyl!=null){
              albumListMenuItems[j].classList.add("albumPlaying");
              albumVinyl.setAttribute("src",require("../assets/vinyl.gif"));
            }      
  
          }
        }
      }

      /**
       * Get all album names from Firebase Storage in order to
       * retrieve their information.
       * 
       * REFERENCE: https://firebase.google.com/docs/storage/web/list-files
       */
      async function getAlbums(){

        // get all folders in the root of the bucket on Firebase Storage
        const listRef = ref(storage, "");

        await listAll(listRef).then((res) =>{

          res.prefixes.forEach((folderRef) => {
            albumList.push(folderRef.name);
            addAlbumToMenu(folderRef.name);
            console.log("Successfully loaded '"+folderRef.name+"' to album list.")
          });
        }).catch((error) => {
          // An error occurred
          console.log(error);
        });

        // Initialize album title to first album in album list
        if(albumList.length > 0){
          albumTitle.text(albumList[0]);
        }

      }
      
      /**
       * Get all album tracks and album cover from Firebase Storage
       * 
       * REFERENCE: https://firebase.google.com/docs/storage/web/list-files
       */
      async function buildTrackList(albumDirectory){

        //TODO: SHOW CIRCULAR PROGRESS INDICATOR

        currTrackList = [];
        
        const listRef = ref(storage, albumDirectory);

        // list all songs in albumDirectory
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
                    // set album cover
                    $("#albumCover").attr("src",url);
                    albumCoverSRC = url;

                    // set background as album cover
                    document.getElementById("background").style.backgroundImage = "url("+url+")";
                  }
                  
                  if(res.items.length > 0 && res.items.length - 1 == index){

                    //TODO: HIDE CIRCULAR PROGRESS INDICATOR

                    buildAlbum();

                    if(playAlbumAutomatically){
                      playTrack();
                      playAlbumAutomatically = false;
                    }
 
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

      /**
       * Plays track based on many different contexts:
       * 
       * -whether you play from an album cover
       * -whether you play from the queue
       * -etc.
       */
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
        
        // currently playing track is highlighted
        $("#track"+queue.queue[0]["order"]).attr("class","trackPlaying "+ defaultClass);
        //alert("t:"+trackNum + " vs q:" + queue.queue[0]["order"])

        // display currently playing track info in PlayBox
        $("#songPlaying").text(queue.queue[0].name + " - RAJIV");
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
              $("#songPlaying").text(queue.queue[queueIndex].name + " - RAJIV");
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
     
      /**
       * Hides currently displaying album to make room for
       * the new one. Shows loading animation
       */
      function resetAlbum(){
        document.getElementById("albumContainer").style.display = "none";
        document.getElementById("lScreen").style.display = "block";
        // for(var i=0; i<currTrackList.length; i++){
        //     trackContainer.children()[0].remove();        
        // }
        // queue = [];
      }

      /**
       * Displays current album and hides the loadin screen
       */
      function buildAlbum(){
        /* SHOWS ALBUM VIEW */
        document.getElementById("albumContainer").style.display = "block";
        document.getElementById("albumContainer").style.visibility = "visible";
        document.getElementById("lScreen").style.display = "none";
      }

      /**
       * Resets the side queue to make room to build a new one
       */
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

      /**
       * Makes a side queue consisting of songs of the current
       * album's tracklist, in queue form, the sequence in which
       * they will be played
       */
      function buildSideQueue(sideQueue){
        
        resetSideQueue();

        // open sideQueue
        document.getElementById("sideQueue").checked = true;
        
        var ul = $("<ul>");
        ul.attr("class","listView");

        // menu toggle button for the sideQueue
        sideQueue.append('<label class="menu-toggle" for="sideQueue"><span>Toggle</span></label>');

        for(var i=0; i<queue.queue.length; i++){
            
            var song = queue.queue[i];
            
            var li = $("<li>");
            var div = $("<div>");
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
          queue.albumIndex = albumIndex;
          
          //when shuffle is off
          if(!isShuffle){
              var currTrackIndex = 0;
              // loop going from first song to last song in tracklist
              for(var i = trackNum-1; i < tracklist.length; i++){
                  console.log("TRACKLIST : " + tracklist[i].name)
                  if(tracklist[i].src == currTrackPath){
                      //skip current track from adding it to the queue
                      console.log("if loop: " + tracklist[i].name)
                      queue.queue.push({"src":tracklist[i].src,"order":queue.queue.length+1,"name":tracklist[i].name});
                      currTrackIndex = i;
                      console.log("Order: " + queue.queue.length+1 + "Song: " + queue.queue[queue.queue.length-1].name)
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
    text-overflow: clip;
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

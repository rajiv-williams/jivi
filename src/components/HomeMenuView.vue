<template>
    <input type="checkbox" id="homeMenu" name="homeMenu" class="menu-checkbox">
    <div class="homeMenu" id="homeMenuContainer">
        <label class="menu-toggle" for="homeMenu"><span>Toggle</span></label>
        <ul class="listView">
          <img class="jivi_logo" src="">
          <li>
              <label for="albumMenu" class="menu-item">ALBUMS</label>
              <input type="checkbox" id="albumMenu" name="album-menu" class="menu-checkbox sub-menu-checkbox" checked>
              <div class="homeMenu" id="albumMenuContainer">
                  <label class="menu-toggle" id="albumMenuIcon" for="albumMenu"><span>Toggle</span></label>
                  <div class="menu-title">ALBUMS</div>
                  <ul id="albumList" class="listView">
                    <!-- Albums added from javascript go here -->
                  </ul>
              </div>
          </li>
          <li>
              <!-- <div class="menu-item">SOCIALS</div> -->
              <label for="socialMenu" class="menu-item">SOCIALS</label>
              <input type="checkbox" id="socialMenu" name="social-menu" class="menu-checkbox sub-menu-checkbox" checked>
              <div class="homeMenu" id="albumMenuContainer">
                  <label class="menu-toggle" id="socialMenuIcon" for="socialMenu"><span>Toggle</span></label>
                  <div class="menu-title">SOCIALS</div>
                  <ul id="albumList" class="listView">
                    <li>
                      <div class="socialMenuItem">
                        <img class="socialLogo" id="instagramLogo" src="" alt="Instagram">
                        <a href="https://www.instagram.com/produceraw/">@produceraw</a>
                      </div>
                    </li>
                    <li>
                      <div class="socialMenuItem">
                        <img class="socialLogo" id="youtubeLogo" src="" alt="YouTube">
                        <a href="https://www.youtube.com/@producerraw7497">PRODUCER RAW</a>
                      </div>
                    </li>
                    <li>
                      <div class="socialMenuItem">
                        <img class="socialLogo" id="linkedinLogo" src="" alt="LinkedIN">
                        <a href="https://www.linkedin.com/in/rajiv-williams/">Rajiv Williams</a>
                      </div>
                    </li>
                  </ul>
              </div>
          </li>
        </ul>
    </div>
  
</template>

<script>

export default {
  name: 'HomeMenuView'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
*
  margin: 0
  padding: 0

// #wrapper
//   position: absolute
//   width: 100%
//   height: 100%
//   overflow: hidden

label
  cursor: pointer
  &:focus
    outline: none

// .albumPlaying
//   background-color: rgb(195, 242, 174)

.jivi_logo
  width: 100%
  position:absolute

.menu-title
  max-width: 100%
  max-height: 45px
  font-size: 30px
  color: rgb(229, 185, 255)
  font-weight: bold
  border-bottom: 1px solid white
  border-collapse: collapse
  text-shadow: -1px -1px 0 #fff, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000
  letter-spacing: 5px

.socialLogo
  width: 40px
  height: 40px
  margin: auto
  padding: 5px

.socialMenuItem
  max-width: 100%
  max-height: 45px
  background-color: black
  font-size: 20px
  color: white
  padding: auto
  display: grid
  grid-template-columns: 10% 90%;
.albumMenuItem 
  max-width: 100%
  max-height: 45px
  background-color: black
  font-size: 30px
  color: white
  padding: auto

.albumMenuItem:hover
  color: rgb(222, 222, 222)
  background-color: rgba(229, 185, 255, 0.201)
  cursor: pointer

.menu-item
  max-width: 100%
  max-height: 45px
  background-color: black
  font-size: 30px
  color: white

.menu-item:hover
  color: rgb(222, 222, 222)
  cursor: pointer
    
.homeMenu
  position: fixed
  top: 0
  right: 0
  background: #000
  width: 240px
  height: 100%
  transform: translate3d(0, 0, 0)
  transition: transform 0.35s
      
  label.menu-toggle  
    position: absolute    
    left: -60px
    width: 60px
    height: 60px
    line-height: 0px    
    display: block
    padding: 0
    text-indent: -9999px
    background: #fff url(https://cdn0.iconfinder.com/data/icons/typicons-2/24/home-1024.png) 50% 50% / 25px 25px no-repeat
    border:  1px solid black
    border-collapse: collapse
    box-shadow: 1px 1px black
  
  ul
    li
      a, label
        display: block
        text-align: center
        padding: 0 20px
        line-height: 60px
        text-decoration: none
        color: #fff
        &:hover
          color: #666

/* hide inputs */          
.menu-checkbox
  display: grid

/* hide navigation icon for sublabels */    
.homeMenu .homeMenu label.menu-toggle
  background: none
    
/* fade in checked menu */    
.menu-checkbox:checked + .homeMenu
  transform: translate3d(240px, 0, 0)

    
    
/* for show */
// html, body
//   height: 100%

// body
//   background: url(https://37.media.tumblr.com/f6c67ec2821a91051e4175f8a102e1e2/tumblr_n6rzpcsMk41st5lhmo1_1280.jpg) 50% 50% / cover

p
  margin-bottom: 15px

// #info
//   display: table
//   background: rgba(0,0,0,0.4)
//   height: 100%
//   width: 100%
//   #info-content
//     display: table-cell
//     vertical-align: middle
//     text-align: center
//     text-transform: uppercase
//     color: #fff
//     font-size: 12px
//     h1      
//       color: #fff
//       border: 3px solid #fff
//       text-align: center
//       background: rgba(0,0,0,0.1)
//       font-size: 22px
//       font-weight: normal
//       padding: 20px
//       margin: 10px
//       display: inline-block      
//       strong
//         display: block
//         font-size: 26px
   

</style>

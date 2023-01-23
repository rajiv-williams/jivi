<template>

    <input type="checkbox" id="sideQueue" name="sideQueue" class="menu-checkbox">
    <div class="sideQueue" id="sideQueueContainer">
        <!-- <label class="menu-toggle" for="sideQueue"><span>Toggle</span></label>
        <ul class="queueList">
          <li>
              <div class="tracks">Menu-1</div>
          </li>
          <li>
              <div class="tracks">Menu-2</div>
          </li>
        </ul> -->
    </div>
</template>

<script>
export default {
    name: "SideQueue"
}
</script>

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
    
.sideQueue
  position: absolute
  top: 0
  left: 0
  background: #000
  width: 240px
  height: 100%
  transform: translate3d(-240px, 0, 0)
  transition: transform 0.35s
      
  label.menu-toggle  
    position: absolute    
    right: -60px
    width: 60px
    height: 60px
    line-height: 0px    
    display: block
    padding: 0
    text-indent: -9999px
    background: #fff url(https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png) 50% 50% / 25px 25px no-repeat
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
        color: #000
        &:hover
          color: #666

/* hide inputs */          
.menu-checkbox
  display: grid

/* hide navigation icon for sublabels */    
.sideQueue .sideQueue label.menu-toggle
  background: none
    
/* fade in checked menu */    
.menu-checkbox:checked + .sideQueue
  transform: translate3d(0, 0, 0)

    
    
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
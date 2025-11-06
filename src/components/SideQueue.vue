<template>

    <input type="checkbox" id="sideQueue" name="sideQueue" class="menu-checkbox">
    <div class="sideQueue" id="sideQueueContainer">
        <label class="menu-toggle" for="sideQueue"><span>Toggle</span></label>
        <!-- <ul class="listView">
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

<style lang="sass" scoped>
// CREDIT: https://codepen.io/anon/embed/JjJMwo?default-tab=result&height=500&slug-hash=chKqD&theme-id=1#html-box
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

.listView
  list-style: none
  margin: 0
  padding: 0

.sideQueue
  position: fixed
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
        color: #fff
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

    
    

p
  margin-bottom: 15px

</style>
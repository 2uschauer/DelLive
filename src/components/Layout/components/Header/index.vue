<template>
  <div class="header">
    <svg-icon icon-class="logo" class="logo" id="header"/>
    <NavMenu/>
  </div>
</template>
<script>
import NavMenu from '../NavMenu'
export default {
  name: 'Header',
  components: {
    NavMenu
  },
}
</script>
<style lang="scss" scoped>
.header{
  background:#0F253E;
  height:auto;
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding:50px 0 0 0;
  .logo{
    margin:10px 0;
    height:90px;
    width:calc(30%);
  }
}
</style>

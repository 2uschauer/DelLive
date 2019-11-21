<template>
  <div class="footer" id="footer">
    <svg-icon icon-class="logo" class="logo"/>
    <div class="content">
      <div class="item">Powered by <a href="mailto:ghoulsteven@gmail.com">Euphausiacea</a></div>
      <div>All Right Rserved</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      showLargeLogo: false
    }
  },
  mounted() {
    this.handleScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttle(this.handleScroll,500,1000))
  },
  methods: {
    handleScroll() {
      const footer = document.getElementById('footer')
      if (document.documentElement.scrollTop > 282) {
        if (!footer.classList.contains('noFlex')) {
          footer.classList.add('noFlex')
        }
      } else {
        if (footer.classList.contains('noFlex')) {
          footer.classList.remove('noFlex')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  background:#0F253E;
  height:148px;
  display:flex;
  justify-content: center;
  align-items: flex-end;
  color: #909399;
  font-size:10px;
  padding:10px 0;
  &.noFlex{
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .logo{
      width:200px;
      height:84px;
    }
    .content{
      margin-left:0;
      justify-content: center;
      align-items: center;
      .item{
        padding:4px 0;
      }
    }
  }
  .logo{
    width:100px;
    height:42px;
  }
  .content{
    display: flex;
    flex-direction: column;
    margin-left:30px;
    justify-content: center;
    align-items: flex-start;
    .item{
      padding:4px 0;
    }
  }
}
</style>

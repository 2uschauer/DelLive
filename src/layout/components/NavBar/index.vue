<template>
  <div class="navBar">
    <div class="navBarLeft"><svg-icon icon-class="main" class="navBarIcon" /><div>DelLive</div></div>
    <div class="navBarRight">
      <pay-nav-menu
        theme="dark"
        mode="horizontal"
        show-nav-bar
        @select="handleSelect"
      >
        <pay-nav-menu-item
          v-for="(item, index) in menuList"
          :key="index"
          :class="item.name === active ? 'payui___navmenu-item-active': ''"
          :index="item.name"
          :label="item.name"
        />
      </pay-nav-menu>
      <pay-button class="logoutButton" @click="logOut"><svg-icon icon-class="logout" class="logoutIcon" /><span>登出</span></pay-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  props: {
    menuList: {
      require: true,
      type: Array,
      default: null
    },
    active: {
      require: true,
      type: String,
      default: ""
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      this.$emit("changeRoute", this.menuList, index);
    },
    async logOut() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.navBar{
  padding-left:24px;
  background:#3b3b3b;
  height:64px;
  width:100%;
  display:flex;
  box-shadow: 0 2px 3px 0px rgba(0,0,0,0.08);
  justify-content: space-between;
  overflow: hidden;
  position: relative;
}
.navBarLeft{
  font-size:32px;
  line-height:64px;
  color:#ffffff;
  display:flex;
  .navBarIcon{
    height:64px;
    margin-right:24px;
  }
}
.navBarRight{
  display:flex;
  justify-content: flex-end;
  align-items: center;
  .logoutButton{
    border: 0 solid transparent;
    background: transparent;
    height:32px;
    font-size:14px;
    line-height: 32px;
    color: #ffffff;
    &:hover{
      color: #e75213;
    }
    .logoutIcon{
      height:32px;
      font-size:32px;
      line-height:32px;
      vertical-align: middle;
    }
    span{
      line-height:32px;
      vertical-align: middle;
    }
  }
}
</style>

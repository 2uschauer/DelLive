<template>
  <div>
    <NavBar :menu-list="menuList" :active="menuActive" @changeRoute="changeRoute" />
    <div class="SideBarAndAppMain">
      <SideBar class="sideBar" :sub-menu-list="subMenuList" :sub-menu-active="subMenuActive" @changeRoute="changeRoute" />
      <AppMain />
    </div>
  </div>
</template>
<script>
import { SideBar, NavBar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar,
    AppMain
  },
  data() {
    return {
      menuList: [],
      subMenuList: [],
      menuActive: "",
      subMenuActive: ""
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      const { routes } = this.$router.options;
      let menuList = [];
      for (let i = 0; i < routes.length; ++i) {
        if (!routes[i].hidden) menuList = menuList.concat(routes[i]);
      }
      this.menuList = menuList.slice();
      this.getSubMenuList(menuList);
    },
    getSubMenuList(menuList) {
      const { matched } = this.$route;
      const parentRoute = matched[0] || {};
      this.menuActive = parentRoute.name.slice();
      this.subMenuActive = matched[1].name.slice();
      for (let i = 0; i < menuList.length; ++i) {
        if (menuList[i].path === parentRoute.path) {
          this.subMenuList = menuList[i].children.slice();
          break;
        }
      }
    },
    changeRoute(menuList, index) {
      menuList.map((item) => {
        if (item.name === index) {
          this.$router.push({ path: `${item.path}` }, () => {
            this.getSubMenuList(menuList);
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.SideBarAndAppMain{
  display: flex;
  width:100%;
  height:calc(100vh - 64px);
  background: #e8e8e8 !important;
  @include clearfix;
  position: relative;
}
.sideBar{
  background: #e8e8e8 !important;
  border-color:#D8D9E0;
  box-shadow: 0 2px 3px 0px rgba(0,0,0,0.08);
  /deep/
  .payui___navmenu-item{
    background: transparent;
    &.payui___navmenu-item-active{
      background: #D8D9E0;
      border-left: 3px solid #e75213;
      padding-left: 17px;
    }
  }
}
</style>

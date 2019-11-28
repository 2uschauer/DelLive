<template>
  <div class="navBar">
    <ul class="menu">
      <li v-for="(item, index) in router" :key="index" class="menuItem item" @click="handleMenuClick(index)">
        <div class="content">
          <div :class="selected === -1 && currentRoutePath.indexOf(item.path) !== -1 ? 'selectedItem' : ''">{{item.name}}</div>
          <i v-if="router[index].children && router[index].children.length > 0" :class="selected ? 'el-icon-arrow-up selected icon' : 'el-icon-arrow-up icon'"/>
        </div>
        <el-collapse-transition>
          <ul class="subMenu" id="subMenu" v-if="selected === index && shouldShow">
            <li
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex" @click="handleSubMenuClick(subItem)"
              class="subMenuItem item"
            >
              <div :class="currentRoutePath.indexOf(subItem.path) !== -1 ? 'selectedItem' : ''">{{subItem.name}}</div>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'navMenu',
  data() {
    return {
      router: [],
      selected: -1,
      shouldShow: false,
      currentRoutePath: ''
    }
  },
  created() {
    const { routes } = _.cloneDeep(this.$router.options)
    const router = routes.filter((item) => !item.hidden)
    router.push({
      name: '登出',
      path: '/logout',
      children: []
    })
    this.router = router
    this.currentRoutePath = this.$route.path
  },
  methods: {
    handleMenuClick(index) {
      if (this.selected === index) this.selected = -1
      else {
        const { router } = this
        this.selected = index
        if (!router[index].children || router[index].children.length === 0) {
          this.handleSubMenuClick(router[index])
          this.shouldShow = false
        } else this.shouldShow = true
      }
    },
    handleSubMenuClick(item) {
      if (item.name === '登出') {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ path: '/login' })
            window.location.reload()
          })
      } else {
        this.$router.push({ path: `${item.path}` })
        this.currentRoutePath = item.path
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navBar{
  width:100%;
  background:transparent;
  border-top:1px solid rgba(49,70,90,0.4);
  border-bottom:1px solid rgba(49,70,90,0.4);
  display:flex;
  justify-content: center;
  align-items: center;
  margin:40px;
}
.menu{
  margin:0;
  padding:0 12px;
  display: flex;
  .menuItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 12px;
    .content{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.item{
  text-align: center;
  width:148px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  line-height: 40px;
  margin: 0;
  padding: 0;
  color: #909399;
}
.selectedItem{
  color: #D85A51;
}
.subMenu{
  margin:0;
  padding:0;
  left:0;
  .subMenuItem{
    display: block;
    height: 40px;
  }
}
.icon{
  transition:transform .2s ease-in;
  &.selected{
    transform:rotate(180deg);
  }
}
</style>

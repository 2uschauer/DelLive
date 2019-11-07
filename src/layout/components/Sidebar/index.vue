<template>
  <pay-nav-menu
    theme="light"
    show-nav-bar
    @select="handleSelect"
  >
    <pay-nav-menu-item
      v-for="(item, index) in subMenuList"
      :key="index"
      :class="item.name === subMenuActive ? 'payui___navmenu-item-active': ''"
      :index="item.name"
      :label="item.name"
    />
  </pay-nav-menu>
</template>
<script>
export default {
  name: "SubNavBar",
  props: {
    subMenuList: {
      require: true,
      type: Array,
      default: null
    },
    subMenuActive: {
      require: true,
      type: String,
      default: ""
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      this.$emit("changeRoute", this.subMenuList, index);
    }
  }
};
</script>

<template>
  <div class="chatBubble" :style="direction">
    <div><svg-icon :icon-class="chatInfo.img" style="height:48px;width:48px"/></div>
    <div :class="small ? 'chatBubbleContent small' : 'chatBubbleContent'">
      <div v-if="!sameUserName" class="name">{{chatInfo.userName}}</div>
      <div :class="sameUserName ? 'content right' : 'content left'"><span>{{chatInfo.content}}</span></div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'chatBubble',
  props: {
    chatInfo: {
      type: Object,
      required: true,
      default: {
        timeStamp: '11111',
        content: '111111',
        userName: 'xxxxx',
        img: 'userImg1'
      }
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      sameUserName: false,
    }
  },
  computed: {
    ...mapGetters(['userName']),
    direction() {
      if (this.sameUserName) return { 'flex-direction': 'row-reverse' }
      else return { 'flex-direction': 'row' }
    },
  },
  beforeMount() {
    this.sameUserName = this.chatInfo.userName === this.userName
  }
}
</script>
<style lang="scss" scoped>
.chatBubble{
  display: flex;
  padding-top: 12px;
  height:auto;
  width: calc(100%);
}
.chatBubbleContent{
   max-width: calc(60%);
   &.small{
     max-width: calc(90%);
   }
  .name{
    margin: 0 16px 7px 16px;
    color: #B4B4B4;
  }
  .content{
    position: relative;
    word-wrap: break-word;
    background: #ffffff;
    margin: 5px 16px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.08);
    &.left{
      &::before{
        content: '';
        position: absolute;
        top:9px;
        left: -18px;
        border: 10px solid transparent;
        border-right: 10px solid #ffffff;
        height: 0;
        width: 0;
      }
    }
    &.right{
      &::after{
        content: '';
        top:9px;
        position: absolute;
        right: -18px;
        border: 10px solid transparent;
        border-left: 10px solid #ffffff;
        height: 0;
        width: 0;
      }
    }
  }
}
</style>

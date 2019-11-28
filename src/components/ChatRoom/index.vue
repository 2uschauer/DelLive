<template>
  <div class="chatRoom" :style="{height:height+'px', width:'100%'}">
    <div class="chatContent" :style="small ? {height: 'calc(100% - 33px)'}: {height: 'calc(100% - 54px)'}">
      <ChatBubble v-for="(item,index) in messageList" :key="index" :chatInfo="item" :small="small"></ChatBubble>
    </div>
    <el-row type="flex">
      <el-col :span="small ? 16 : 20"><el-input type="textarea" :rows="small ? 1 : 2" v-model="chatContentInput" clearable resize="none"/></el-col>
      <el-col :span="small ? 8 : 4">
        <el-button :style="small ? {width:'100%',height:'33px',padding: '6px 20px'} : {width:'100%',height:'54px'}" type="primary">发送</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ChatBubble from './ChatBubble'
export default {
  name: 'ChatRoom',
  components: {
    ChatBubble
  },
  data() {
    return {
      chatContentInput: '',
      messageList: [{
        timeStamp: '11111',
        content: '这是虚拟数据！',
        userName: 'admin1',
        img: 'userImg1'
      },{
        timeStamp: '11111',
        content: '这是虚拟数据！',
        userName: 'test',
        img: 'userImg2'
      },{
        timeStamp: '11111',
        content: '这是非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的虚拟数据！',
        userName: 'admin2',
        img: 'userImg3'
      },{
        timeStamp: '11111',
        content: '这是非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的虚拟数据！',
        userName: 'test',
        img: 'userImg2'
      },{
        timeStamp: '11111',
        content: '这是非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的虚拟数据！',
        userName: 'admin3',
        img: 'userImg4'
      },{
        timeStamp: '11111',
        content: '这是虚拟数据',
        userName: 'test',
        img: 'userImg2'
      }]
    }
  },
  props: {
    height: {
      type: String,
      required: false,
      default: '720'
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
}
</script>
<style lang="scss" scoped>
.chatRoom{
  height: 100%;
  background: #EDEDED;
  border-radius: 4px
}
.chatContent{
  background: transparent;
  padding: 24px;
  position: relative;
  overflow-y: auto
}
</style>

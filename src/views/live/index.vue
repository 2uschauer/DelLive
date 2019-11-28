<template>
<div class= "livePage">
  <el-row type="flex" :gutter="40">
    <el-col :span="layout.left">
      <div class="chatRoomMember">
        <el-table :data="memberList" height="360">
          <el-table-column prop="userName" label="成员"/>
          <el-table-column prop="status" width="100">
            <template slot="header">
              状态(2/4)
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
    <el-col :span="layout.center">
      <el-row type="flex" justify="center" :gutter="20" class="layer">
        <el-col :span="16">
          <el-input v-model="input" placeholder="请输入直播拉流地址"/>
        </el-col>
        <el-col :span="4">
          <el-button style="width:100%;" type="primary" @click="handleStartLiveClick">{{url ? '停止直播' : '开始直播'}}</el-button>
        </el-col>
        <el-col :span="4">
          <el-button style="width:100%;" type="primary" @click="handleReStartLiveClick">重启直播服务</el-button>
        </el-col>
      </el-row>
      <FlvPlayer v-if="url" :url="url" class="flvPlayer"/>
      <ChatRoom v-if="!url"/>
    </el-col>
    <el-col :span="layout.right">
      <ChatRoom v-if="url" style="width:100%;" small/>
    </el-col>
  </el-row>
</div>
</template>
<script>
import CONSTANT from '@/constant'
import Request from './request'
import FlvPlayer from '@/components/flvPlayer';
import ChatRoom from '@/components/ChatRoom'
export default {
  name: 'Live',
  components: {
    FlvPlayer,
    ChatRoom
  },
  data() {
    return {
      url: '',
      input: 'test.flv',
      layout: {
        left: 5,
        center: 14,
        right: 5,
      },
      memberList: [{
        userName: 'member1',
        status: '离线'
      },{
        userName: 'member2',
        status: '离线'
      },{
        userName: 'member3',
        status: '观看ing'
      },{
        userName: 'memeber4',
        status: '观看ing'
      }]
    };
  },
  methods: {
    handleStartLiveClick() {
      if (!this.url) this.url = `${CONSTANT.IP}/liveServer/live/${this.input}`
      else this.url = ''
    },
    handleReStartLiveClick() {
      Request.restartLiveServer()
        .then((res) => {
          this.$message.success('重置直播服务成功')
        })
        .catch((err) => {
          if (err.responseMsg) this.$message.error(`重置直播服务失败,${err.responseMsg}`)
          else console.log(err)
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.layer{
  margin-bottom: 24px;
}
.chatRoomMember{
  box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.08);
}
</style>

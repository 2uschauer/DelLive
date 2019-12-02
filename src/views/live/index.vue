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
      <el-row type="flex" justify="center" :gutter="12" class="layer">
        <el-col :span="14">
           <el-select v-model="selectedLiveHouseName" placeholder="请选择直播间" style="width:100%;" no-data-text="暂无直播中的直播间>w<">
            <el-option
              v-for="item in liveHouseOptions"
              :key="item._id"
              :label="'直播间: ' + item.liveHouseName + ' 直播中w'"
              :value="item.liveHouseName">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
        <el-button style="width:100%;" type="primary" @click="getAllLiveHouse">查询直播中的直播间</el-button>
        </el-col>
        <el-col :span="4">
          <el-button style="width:100%;" type="primary" @click="handleStartLiveClick" :disabled="selectedLiveHouseName.length===0">{{url ? '停止观看直播' : '开始观看直播'}}</el-button>
        </el-col>
      </el-row>
      <FlvPlayer v-if="url" :url="url" :headers="headers" class="flvPlayer" ref="FlvPlayer"/>
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
import { mapGetters } from 'vuex'
export default {
  name: 'Live',
  components: {
    FlvPlayer,
    ChatRoom
  },
  data() {
    return {
      liveHouseOptions: [],
      selectedLiveHouseName: '',
      url: '',
      headers: {},
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
  computed: {
    ...mapGetters(['token']),
  },
  beforeMount() {
    this.getAllLiveHouse()
    window.addEventListener('keypress',this.handleEnterPressed)
  },
  beforeDestroy() {
    window.removeEventListener('keypress',this.handleEnterPressed)
  },
  methods: {
    handleEnterPressed(e) {
      const keyCode = e.keyCode
      if (keyCode === 13) {
        if (this.selectedLiveHouseName) this.handleStartLiveClick()
        else this.getAllLiveHouse()
      }
    },
    handleStartLiveClick() {
      if (!this.url) {
        this.headers = {
          'X-Authorization': this.token
        }
        this.url = `${CONSTANT.IP}/api/live/play/live/${this.selectedLiveHouseName}.flv`
        // this.url = `http://127.0.0.1:7001/live/${this.input}.flv`
        console.log(this.url, this.headers)
      } else {
        this.$refs.FlvPlayer.flvPlayer.detachMediaElement()
        this.$refs.FlvPlayer.flvPlayer.destroy()
        this.url = ''
      }
    },
    getAllLiveHouse() {
      Request.getLiveHouse('上播').then((res) => {
        this.liveHouseOptions = res.data
        this.selectedLiveHouseName = ''
        this.$message.success('查询直播间成功')
      }).catch((err) => {
        if (err.responseMsg) this.$message.error(`创建直播服务失败,${err.responseMsg}`)
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

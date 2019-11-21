<template>
  <!-- <FlvPlayer :url="url" class="flvPlayer" /> -->
  <div class= "livePage">
    <div class="liveUrl">
      <el-input class="liveUrlInput" v-model="input" placeholder="请输入直播拉流地址"/>
      <el-button class="liveUrlButton" type="primary" @click="handleStartLiveClick">开始直播</el-button>
      <el-button class="liveUrlButton" type="primary" @click="handleReStartLiveClick">重启直播服务</el-button>
    </div>
    <FlvPlayer v-if="url" :url="url" class="flvPlayer"/>
  </div>
</template>
<script>
import CONSTANT from '@/constant'
import Request from './request'
import FlvPlayer from '@/components/flvPlayer';
export default {
  name: 'Live',
  components: {
    FlvPlayer
  },
  data() {
    return {
      url: '',
      input: 'test.flv'
    };
  },
  methods: {
    handleStartLiveClick() {
      this.url = CONSTANT.env === 'dev' ? `http://127.0.0.1:9500/liveServer/live/${this.input}` : `https://127.0.0.1:443/liveServer/live/${this.input}`
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
.livePage{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 148px - 282px);
  .liveUrl{
    width:100%;
    padding: 0 400px;
  }
  .liveUrlInput{
    width: calc(60%);
  }
  .liveUrlButton{
    width:calc(18%);
  }
  .flvPlayer{
    width:100%;
    padding:24px calc(50% - 540px);
  }
}
</style>

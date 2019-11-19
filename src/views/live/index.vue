<template>
  <!-- <FlvPlayer :url="url" class="flvPlayer" /> -->
  <div class= "livePage">
    <div class="liveUrl">
      <el-input class="liveUrlInput" v-model="input" placeholder="请输入直播拉流地址"/>
      <el-button class="liveUrlButton" type="primary" @click="handleClick">开始直播</el-button>
    </div>
    <FlvPlayer v-if="url" :url="url" class="flvPlayer"/>
  </div>
</template>
<script>
import FlvPlayer from '@/components/flvPlayer';
export default {
  name: 'Live',
  components: {
    FlvPlayer
  },
  data() {
    return {
      url: '',
      input: 'http://47.103.44.215:7001/live/test.flv'
    };
  },
  methods: {
    handleClick() {
      this.url = this.input
    },
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
    width: calc(80%);
    display: inline-block;
  }
  .liveUrlButton{
    width:calc(18%);
    display: inline-block;
  }
  .flvPlayer{
    width:100%;
    padding:24px calc(50% - 540px);
  }
}
</style>

<template>
  <FlvPlayer :url="url" class="flvPlayer" />
</template>
<script>
import FlvPlayer from "@/components/flvPlayer";
export default {
  name: "Live",
  components: {
    FlvPlayer
  },
  data() {
    return {
      url: "http://localhost:7001/live/test.flv"
    };
  }
};
</script>
<style lang="scss" scoped>
.flvPlayer{
  padding:24px calc(50% - 540px);
}
</style>

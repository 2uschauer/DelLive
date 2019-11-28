<template>
  <div class="video">
    <video
      ref="videoElement"
      class="video-component"
      controls
      autoplay
      :height="height"
      :width="width"
    >Your browser is too old which doesn't support HTML5 video.</video>
  </div>
</template>
<script>
import flvjs from 'flv.js';
export default {
  name: 'Video',
  props: {
    types: {
      type: String,
      require: false,
      default: 'flv'
    },
    url: {
      type: String,
      require: true,
      default: ''
    },
    height: {
      type: String,
      require: false,
      default: '720'
    },
    width: {
      type: String,
      require: false,
      default: '100%'
    }
  },
  data() {
    return {
      flvPlayer: null
    };
  },
  watch: {
    url() {
      if (this.flvPlayer) {
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
      }
      this.createVideo();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo();
    });
  },
  methods: {
    createVideo() {
      const videoElement = this.$refs.videoElement;
      this.flvPlayer = flvjs.createPlayer({
        type: this.types,
        url: this.url
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
    }
  }
};
</script>

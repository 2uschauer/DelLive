<template>
  <el-container>
    <el-header style="height:auto;padding:0;"><Header/></el-header>
    <el-main style="height:auto;padding:0;"><AppMain/></el-main>
    <el-footer style="height:auto;padding:0;"><Footer/></el-footer>
  </el-container>
</template>
<script>
import { AppMain, Header, Footer } from '@/components/Layout/components'
export default {
  name: 'layout',
  components: {
    AppMain,
    Header,
    Footer
  }
}
</script>

<template>
  <div>
    <Header/>
    <AppMain />
    <Footer/>
  </div>
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
<style lang="scss" scoped>

</style>

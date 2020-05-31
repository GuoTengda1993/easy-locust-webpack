<template>
  <el-container direction="vertical">
    <el-header style="padding: 0px 0px">
      <Header></Header>
    </el-header>
    <el-main v-bind:style="{minHeight: Height+'px'}">
      <router-view name="Content" style="font-family: Arial"></router-view>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header: Header,
    Footer: Footer
  },
  data() {
    return {
      Height: 0
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 100;
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight - 100}
  }
}
</script>

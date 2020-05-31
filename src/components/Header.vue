<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            :router="true"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/">Easy-Locust</el-menu-item>
            <el-menu-item index="/apis">APIs</el-menu-item>
            <el-menu-item index="/slaves">Slave Nodes</el-menu-item>
            <el-submenu index="1" >
                <template slot="title">Action</template>
                <el-menu-item @click.native="getAction('/action/generate')">Generate locust-file</el-menu-item>
                <el-menu-item @click.native="getAction('/action/run')">Run</el-menu-item>
                <el-menu-item @click.native="getAction('/action/run-distribute')">Run in distributed-mode</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/',
      };
    },
    methods: {
      getAction(url){
        this.$axios.get(url).then(response => {
          if (this.messageShow(this, response)){
              this.GetConfig()
              this.dialogVisible = false
          }
        }).catch(error => {
          this.errorMessageShow(this, error.response)
        })
      }
    }
  }
</script>
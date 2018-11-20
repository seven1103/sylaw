<template>
  <el-tabs class="main" v-model="activeName2" type="card" @tab-click="handleClick">
    <!-- <el-tab-pane label="官方消息" name="first">
        <sys-msg :index = index></sys-msg>
    </el-tab-pane> -->
    <el-tab-pane label="律师消息" name="first">
      <law-msg :index = index></law-msg>
    </el-tab-pane>
    <el-tab-pane label="用户消息" name="second">
      <user-msg :index = index></user-msg>
    </el-tab-pane>
    <el-tab-pane label="其他消息" name="third">
      <other-msg :index = index></other-msg>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { SysMsg, LawMsg, UserMsg, OtherMsg } from './components'
  export default {
    data() {
      return {
        activeName2: 'first',
        index:'0'
      };
    },
    components:{
      SysMsg,
      LawMsg,
      UserMsg,
      OtherMsg
    },
    methods: {
      handleClick(tab, event) {
        this.index = tab.index
      }
    }
  };
</script>
<style scoped>
    .main{padding: 0 10px}
</style>

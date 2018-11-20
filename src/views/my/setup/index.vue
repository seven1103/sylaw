<template>
    <div class="container">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户密码设置" name="first">
                <el-form label-position="right" label-width="100px" :model="formdata">
                    <el-form-item label="原始密码">
                        <el-input type="password" size="small" v-model="formdata.rpassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" size="small" v-model="formdata.npassword"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码">
                            <el-input type="password" size="small" v-model="formdata.rnpassword"></el-input>
                        </el-form-item>
                    <el-form-item>
                            <el-button type="primary" @click="password">立即修改</el-button>
                    </el-form-item>
                    
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="其他设置" name="second">
                其他设置
            </el-tab-pane>
        </el-tabs>
    </div>
    
  </template>
  <script>
    import { changePsw } from '@/api/myapi/login'
    export default {
        data() {
            return {
                activeName2: 'first',
                formdata:{
                    rpassword:'',
                    npassword:'',
                    rnpassword:''
                }
            };
        },
        methods: {
            handleClick(tab, event) {
               
            },
            password(){
                //TODO 验证
                changePsw({account_id:this.$store.getters.userid,
                    rpassword: this.formdata.rpassword,
                    npassword: this.formdata.npassword}).then(res=>{
                        this.common.changePswHandle(res,()=>{})
                })
            }
        }
    };
  </script>
  <style scoped>
      .container{padding: 20px}
  </style>
<template>
        <div class="app-container">
            <div class="filter-container">
                <el-input placeholder="输入法院账号" style="width:200px"  class="filter-item"></el-input>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander">添加</el-button>
            </div>
            <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
                <el-table-column label="序号" align="center" width="65" type="index">
                </el-table-column>
                <el-table-column label="账号" align="center" min-width="100" property="account">
                </el-table-column>
                <el-table-column label="手机号" align="center" min-width="100" prop="phone"></el-table-column>
                <el-table-column label="名称" align="center" min-width="100" prop="name"></el-table-column>
                <el-table-column label="地址" align="center" min-width="100" prop="address"></el-table-column>
                <el-table-column label="封面" align="center" min-width="150">
                    <template slot-scope="scope">
                            <img width="100%"  :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" min-width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timed.created | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.status | userStatusenum}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" align="center" min-width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditHander(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  
    
            <!-- 编辑弹框 -->
            <el-dialog :visible.sync="dialogPvVisible" :title="textMap">
                <el-form ref="DataForm" :rules="rules" :model="Form">
                    <el-form-item label="账号" >
                        <el-input v-model="Form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" >
                        <el-input v-model="Form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="Form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="Form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="封面">
                            <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            >
                                <img v-if="Form.cover" :src="Form.cover" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPvVisible = false">取消</el-button>
                    <el-button type="primary" @click="textMap=='添加'?add():edit()">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogimgVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </template>
    <script>
        import { courtlist,creatcourt,editcourt,delcourt } from '@/api/myapi/account'
        import waves from '@/directive/waves'
        import { Message } from 'element-ui'
        import { parseTime } from '@/utils'
        import Pagination from '@/components/Pagination'
    
        export default{
            components: { Pagination },
            directives: { waves },
            data(){
                return {
                    list:null,
                    listLoading:true,
                    total:0,
                    listQuery: {
                        page: 1,
                        limit: 20,
                        importance: undefined,
                        title: undefined,
                        type: undefined,
                        sort: '+id'
                    },
                    Form:{
                        _id: '',
                        account:'',
                        phone:'',
                        name:'',
                        address:'',
                        cover:'',
                        status:'',
                        timestamp: new Date()
                    },
                    dialogPvVisible:false,
                    dialogimgVisible:false,
                    textMap:'添加',
                    rules:{
                        title: [{ required: true,message: '标题不能为空',trigger:blur}],
                        content:[{ required: true,message: '简介不能为空',trigger:blur}]
                    },
                    dialogImageUrl:''
                }
            },
            created() {
                this.getList()
            },
            methods:{
                getList(){
                    this.listLoading = true
                    courtlist().then(res=>{
                        this.list = res.data.result.list;
                        this.total = res.data.result.page.count;
                        this.listLoading = false
                    })
                },
                handleFilter() {
                    this.listQuery.page = 1
                    this.getList()
                },
                addHander(){
                    this.resetForm();
                    this.textMap = '添加';
                    this.dialogPvVisible = true;
                },
                EditHander(row){
                    this.Form = Object.assign({}, row);
                    this.textMap = '编辑';
                    this.dialogPvVisible = true;
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                add(){
                    this.listLoading = true
                    //模拟图片
                    this.Form.cover = 'asd'
                    creatcourt(this.Form).then(res=>{
                        this.listLoading = false
                        if(res.data.code==0){
                            Message({
                                message: '创建成功',
                                type: 'success',
                                duration: 5 * 1000
                            })
                            this.dialogPvVisible = false
                            this.getList()
                        }else{
                            Message({
                                message: res.data.errmsg || '创建失败',
                                type: 'error',
                                duration: 5 * 1000
                            })
                        }
                    })
                },
                edit(){
                    this.listLoading = true
                    this.Form.cover = 'asd'
                    editcourt(this.Form).then(res=>{
                        this.listLoading = false
                        if(res.data.code==0){
                            Message({
                                message: '编辑成功',
                                type: 'success',
                                duration: 5 * 1000
                            })
                            this.dialogPvVisible = false
                            this.getList()
                        }else{
                            Message({
                                message: res.data.errmsg || '编辑失败',
                                type: 'error',
                                duration: 5 * 1000
                            })
                        }
                    })
                },
                Delete(row){
                    this.message(()=>{
                        delcourt({admin_id:row._id}).then(res=>{
                            this.listLoading = false
                            if(res.data.code==0){
                                Message({
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 5 * 1000
                                })
                                this.dialogPvVisible = false
                                this.getList()
                            }else{
                                Message({
                                    message: res.data.errmsg || '删除失败',
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
                        })
                    })
                },
                message(callback){
                    this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        callback()
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
                },
                resetForm(){
                    this.Form = {
                        _id: '',
                        account:'',
                        phone:'',
                        name:'',
                        address:'',
                        cover:'',
                        status:'',
                        timestamp: new Date()
                    }
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                handlePictureCardPreview(file){
                    this.dialogImageUrl = file.url;
                    this.dialogimgVisible = true;
                },
                handleRemove(file, fileList){
                    console.log(file, fileList);
                }
            }
        }
    </script>
    <style>
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #409EFF;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
            }
            .avatar {
              width: 178px;
              height: 178px;
              display: block;
            }
          </style>
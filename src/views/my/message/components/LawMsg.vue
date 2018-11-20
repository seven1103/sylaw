<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="消息标题" style="width:200px"  class="filter-item"></el-input>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander">添加</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list"  border fit  highlight-current-row style="width: 100%;" >
            <el-table-column label="序号" align="center" width="65" type="index">
            </el-table-column>
            <el-table-column label="标题" align="center" min-width="150" property="title"></el-table-column>
            <el-table-column label="内容" align="center" min-width="300" property="content"></el-table-column>
            <el-table-column label="封面图片" align="center" min-width="100">
                <template slot-scope="scope">
                    <img width="100%" v-if="scope.row.cover"  :src="scope.row.cover" alt="">
                </template>
            </el-table-column>
            <el-table-column  label="时间" align="center" min-width="100">
                 <template slot-scope="scope">
                    <span>{{ scope.row.timed | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
                <el-form-item label="标题"  prop="title">
                    <el-input v-model="Form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容"  prop="content">
                    <el-input type="textarea" v-model="Form.content" rows="10"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" prop="cover">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
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
    import { LawMessageList,addMessage,editMessage,delMessage } from '@/api/myapi/message'
    import waves from '@/directive/waves'
    import { parseTime } from '@/utils'
    import Pagination from '@/components/Pagination'
    import $ from 'jquery'
    let showdown = require('showdown')
    // import cropper from '@/components/Cropper/index' 
    let id = 1000;
    export default{
        components: { Pagination },
        directives: { waves },
        props:["index"],
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
                    title: '',
                    content: '',
                    cover:'',
                    timestamp: new Date()
                },
                dialogPvVisible:false,
                dialogimgVisible:false,
                html: '',
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
                LawMessageList(this.listQuery).then(res=>{
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
                addMessage({title:this.Form.title,cover:'asdad',content:this.Form.content,type:'lawyer'}).then(res=>{
                    this.common.addHandle(res,()=>{
                        this.dialogPvVisible = false
                        this.getList()
                    })
                })
            },
            edit(){
                editMessage({title:this.Form.title,cover:'asdad',content:this.Form.content,msg_id:this.Form._id}).then(res=>{
                    this.common.eidtHandle(res,()=>{
                        this.dialogPvVisible = false
                        this.getList()
                    })
                })
            },
            Delete(row){
                this.common.delmessage(this, ()=>{
                    delMessage({msg_id:row._id}).then(res=>{
                        this.common.delHandle(res,()=>{
                            this.dialogPvVisible = false
                            this.getList()
                        })
                    })
                })
            },
            resetForm(){
                this.Form = {
                    _id: '',
                    title: '',
                    content: '',
                    cover:'',
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
            },
            handleAvatarSuccess(res, file) {
                this.Form.cover = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
  
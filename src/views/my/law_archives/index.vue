<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="书名" style="width:200px"  class="filter-item"></el-input>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves class="filter-item" type="primary" style="float:right" icon="el-icon-edit" @click="addHander">添加</el-button>
        </div>
        <el-row :gutter="20">
            <el-col class="itembook" :span="4" v-for="(item,index) in list" :key="index">
                <el-card>
                    <img :src="item.cover" class="image">
                    <div class="bottom">
                        <span class="title">{{item.title}}</span>
                        <span class="opeate">
                            <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
                                <i class="el-icon-view view" @click="showbook(item)"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                                <i class="el-icon-edit edit" @click="EditHander(item)"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                                <i class="el-icon-delete del" @click="Delete(item)"></i>
                            </el-tooltip>
                        </span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- <el-table v-loading="listLoading" :data="list"  border fit  highlight-current-row style="width: 100%;" >
            <el-table-column label="序号" align="center" width="65" type="index">
            </el-table-column>
            <el-table-column label="书名" align="center" min-width="150" property="title"></el-table-column>
            <el-table-column label="简介" align="center" min-width="300" property="desc"></el-table-column>
            <el-table-column label="封面图片" align="center" min-width="100">
                <template slot-scope="scope">
                    <img width="100%" v-if="scope.row.cover"  :src="scope.row.cover" alt="">
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="200">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-view" @click="showbook(scope.row)"></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditHander(scope.row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table> -->
        
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  

        <!-- 编辑弹框 -->
        <el-dialog :visible.sync="dialogPvVisible" :title="textMap">
            <el-form ref="DataForm" :rules="rules" :model="Form">
                <el-form-item label="书名"  prop="title">
                    <el-input v-model="Form.title"></el-input>
                </el-form-item>
                <el-form-item label="简介"  prop="desc">
                    <el-input type="textarea" v-model="Form.desc" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="图书内容"  prop="content">
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
        <el-dialog :visible.sync="dialogbookVisible" title="内容">
            <div class="container" id="bookbox">
                    <div class="lefttree"></div>
                    <div class="rightcontent" v-html="html"></div>
            </div>
        </el-dialog> 
        <el-dialog :visible.sync="dialogimgVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> 
    </div>
</template>
<script>
    import { fetchList,delArchives,delArchives_r,
        delArchives_c,addArchives,addArchives_r,
        addArchives_c,editArchives,editArchives_r,editArchives_c } from '@/api/myapi/law_archives'
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
                    desc: '',
                    content: '',
                    cover:'',
                    rule_id:'',
                    timestamp: new Date()
                },
                dialogPvVisible:false,
                dialogimgVisible:false,
                dialogbookVisible:false,
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
                fetchList(this.listQuery).then(res=>{
                    this.list = res.data.result.list;
                    this.total = res.data.result.page.count;
                    this.listLoading = false
                    // this.list.map(item=>{
                    //     item.children = JSON.parse(JSON.stringify(item.children))
                    // })
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
                addArchives({title:this.Form.title,cover:'asdad',desc:this.Form.desc,content:this.Form.content}).then(res=>{
                    this.common.addHandle(res,()=>{
                        this.dialogPvVisible = false
                        this.getList()
                    })
                })
            },
            edit(){
                editArchives({law_archives_id:this.Form._id,title:this.Form.title,cover:this.Form.cover,desc:this.Form.desc,content:this.Form.content}).then(res=>{
                    this.common.eidtHandle(res,()=>{
                        this.dialogPvVisible = false
                        this.getList()
                    })
                })
            },
            Delete(row){
                this.common.delmessage(this, ()=>{
                    delArchives({law_archives_id:row._id}).then(res=>{
                        this.common.delHandle(res,()=>{
                            this.dialogPvVisible = false
                            this.getList()
                        })
                    })
                })
            },
            showbook(row){
                let converter = new showdown.Converter();
                this.html = converter.makeHtml(row.content);
                $(document).ready(function(){
                    $(".lefttree").empty();
                    $("#bookbox").find("h1,h2,h3,h4,h5,h6").each(function(i,item){
                        var tag = $(item).get(0).localName;
                        $(item).attr("id","wow"+i);
                        var value = ($(this).text().length>10?$(this).text().slice(0,10)+'...':$(this).text())
                        $(".lefttree").append('<a class="new'+tag+'" href="#wow'+i+'">'+ value +'</a></br>');
                        $(".newh1").css("margin-left",0);
                        $(".newh2").css("margin-left",20);
                        $(".newh3").css("margin-left",40);
                        $(".newh4").css("margin-left",60);
                        $(".newh5").css("margin-left",80);
                        $(".newh6").css("margin-left",100);
                    });
                })
                this.dialogbookVisible = true
            },
            resetForm(){
                this.Form = {
                    _id: '',
                    title: '',
                    desc: '',
                    content: '',
                    rule_id: '',
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
    .container{display: flex}
    .lefttree{width: 20%;max-height: 500px;padding: 10px;background-color: #8c939d;overflow: auto}
    .lefttree a{color: rgb(38, 92, 119);line-height: 1.5}
    .lefttree a.newh1{font-size: 1rem}
    .lefttree a.newh2{font-size: 0.9rem}
    .lefttree a.newh3{font-size: 0.8rem}
    .lefttree a.newh4{font-size: 0.7rem}
    .lefttree a.newh5{font-size: 0.6rem}
    .lefttree a.newh6{font-size: 0.5rem}
    .rightcontent{width: 80%;max-height: 500px;padding: 20px;overflow: auto}
    .rightcontent h1{font-size: 1.5rem}
    .rightcontent h2{font-size: 1.4rem}
    .rightcontent h3{font-size: 1.3rem}
    .rightcontent h4{font-size: 1.2rem}
    .rightcontent h5{font-size: 1.1rem}
    .rightcontent h6{font-size: 1.0rem}
    .rightcontent p{font-size: 1rem}

    .itembook{margin-top: 10px}
    .itembook .image{
        width: 100%
    }
    .itembook .bottom{
        margin-top: 10px;
        display: flex;
    }
    .bottom>.title{
        width: 70%;
    }
    .bottom>.opeate{
        width: 30%;
        /* cursor: pointer; */
    }
    .bottom>.opeate i{display: inline-block}
    .view{color: #67C23A}
    .edit{color: #409EFF}
    .del{color: #F56C6C}
  </style>
  
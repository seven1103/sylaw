<template>
        <div class="app-container">
            <div class="filter-container">
                <el-input placeholder="输入文书标题搜索" style="width:200px"  class="filter-item"></el-input>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander">添加</el-button>
            </div>
            <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
                <el-table-column label="序号" align="center" width="65" type="index">
                </el-table-column>
                <el-table-column label="一级分类" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.cate.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="二级分类" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.columns.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="模板标题" align="center" min-width="150" property="title"></el-table-column>
                <el-table-column label="模板封面" align="center" min-width="150">
                    <template slot-scope="scope">
                            <img width="100%" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="模板地址" align="center" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showdetail(scope.row.content)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="日期" align="center" min-width="150">
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
                    <el-form-item label="模板标題"  prop="title">
                        <el-input v-model="Form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="一级分类"  prop="type">
                        <el-select v-model="selectValue1" placeholder="请选择">
                            <el-option
                                v-for="item in types1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类"  prop="type">
                        <el-select v-model="selectValue2" placeholder="请选择">
                            <el-option
                                v-for="item in types2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="案件详情"  prop="content">
                        <el-input type="textarea" v-model="Form.content" rows="5"></el-input>
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
            <el-dialog :visible.sync="dialoghtmlVisible">
                <!-- <div v-html="html"></div> -->
                <!-- <iframe style="width: 100%;min-height: 600px;" src='https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fteacher.91yixi.com%2FW008%2Ftest.docx' width='100%' height='100%' frameborder='1'></iframe> -->
                <iframe style="width: 100%;min-height: 600px;" :src=html width='100%' height='100%' frameborder='1'></iframe>
            </el-dialog>
        </div>
    </template>
    <script>
        import { templateList,addtemplate,edittemplate,deltemplate } from '@/api/myapi/template'
        import { fetchTemList } from '@/api/myapi/classfy'
        import waves from '@/directive/waves'
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
                    html:'暂无',
                    listQuery: {
                        page: 1,
                        limit: 20,
                        importance: undefined,
                        title: undefined,
                        type: undefined,
                        sort: '+id'
                    },
                    Form:{
                        id:'',
                        cate_id:'',
                        colums_id:'',
                        title:'',
                        cover:'',
                        file:'',
                        timestamp: new Date()
                    },
                    templateType:[],
                    types1:[],
                    types2:[],
                    selectValue1:'',
                    selectValue2:'',
                    dialogPvVisible:false,
                    dialogimgVisible:false,
                    dialoghtmlVisible:false,
                    textMap:'添加',
                    rules:{
                        title: [{ required: true,message: '标题不能为空',trigger:blur}],
                        content:[{ required: true,message: '简介不能为空',trigger:blur}]
                    },
                    dialogImageUrl:''
                }
            },
            created() {
                this.gettype()
                this.getList()
            },
            methods:{
                gettype(){
                    fetchTemList().then(res=>{
                        this.templateType = res.data.result.list
                        this.templateType.map(item=>{
                            this.types1.push({value:item._id,label:item.name,data:item.columns})
                        })
                    })
                },
                getList(){
                    this.listLoading = true
                    templateList(this.listQuery).then(res=>{
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
                    this.selectValue1 = row.cate.name
                    this.selectValue2 = row.columns.name
                    this.Form.id = row._id
                    this.Form.cate_id = row.cate._id
                    this.Form.columns_id = row.columns._id
                    this.Form.title = row.title
                    this.Form.cover = row.cover
                    this.Form.file = row.file
                    // this.Form = Object.assign({}, row);
                    
                    // this.Form.cover = [this.Form.cover];
                    this.textMap = '编辑';
                    this.dialogPvVisible = true;
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                add(){
                    addtemplate({cate_id:this.selectValue1,columns_id:this.selectValue2,title:this.Form.title,cover:'asda123',file:'asd'}).then(res=>{
                        this.common.addHandle(res,()=>{
                            this.getList()
                            this.dialogPvVisible = false
                        })
                    })
                },
                edit(){
                   let a = this.types1.some(item=>{
                       if(item.value==this.selectValue1) {return true}
                   })
                   if(!a){
                       this.selectValue1 = this.Form.cate_id
                       this.selectValue2 = this.Form.columns_id
                   }
                    edittemplate({template_id:this.Form.id,cate_id:this.selectValue1,colums_id:this.selectValue2,title:this.Form.title,cover:'asda123',file:'asd'}).then(res=>{
                        this.common.eidtHandle(res,()=>{
                            this.getList()
                            this.dialogPvVisible = false
                        })
                    })
                },
                Delete(row){
                    this.common.delmessage(this,()=>{
                        deltemplate({id:row._id}).then(res=>{
                            this.common.delHandle(res,()=>{
                                this.getList()
                            })
                        })
                    })
                },
                resetForm(){
                    this.Form = {
                        id:'',
                        cate_id:'',
                        colums_id:'',
                        title:'',
                        cover:'',
                        file:'',
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
                showdetail(html){
                    var doc = 'http://pd6a0ismg.bkt.clouddn.com/%E7%AE%80%E5%8E%86.doc';

                    this.html = 'https://view.officeapps.live.com/op/view.aspx?src='+encodeURIComponent(doc);
                    this.dialoghtmlVisible = true;
                },
                handleAvatarSuccess(){

                },
                beforeAvatarUpload(){

                }
            },
            watch:{
                selectValue1(cur){
                    this.types1.some(item=>{
                        if(item.value==cur){
                            this.types2 = [];
                            this.selectValue2 = '';
                            item.data.map(items=>{
                                this.types2.push({value:items._id,label:items.name})
                            })
                        }
                    })
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
</style>
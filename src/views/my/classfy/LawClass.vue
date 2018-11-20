<template>
        <div class="app-container">
            <div class="filter-container">
                <el-input placeholder="输入分类标题搜索" style="width:200px"  class="filter-item"></el-input>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander">添加</el-button>
            </div>
            <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
                <el-table-column label="序号" align="center" width="65">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="一级分类" align="center" min-width="100" property="type1">
                    <template slot-scope="scope">
                        <span>{{ types1[scope.row.type1].label }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="二级分类" align="center" min-width="100" property="type2">
                    <template slot-scope="scope">
                        <span>{{ types2[scope.row.type2].label }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="模板标题" align="center" min-width="150" property="title"></el-table-column>
                <el-table-column label="模板封面" align="center" min-width="150">
                    <template slot-scope="scope">
                            <img width="100%" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="模板详情" align="center" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showdetail(scope.row.content)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="日期" align="center" min-width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="浏览量" align="center" min-width="80" property="views"></el-table-column>
                
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
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                                v-for="item in types1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类"  prop="type">
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                                v-for="item in types1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="案件详情"  prop="content">
                        <el-input type="textarea" v-model="Form.content" rows="5"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="案件图片" prop="cover">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :file-list="Form.cover"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                    </el-form-item> -->
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
        import { fetchList } from '@/api/myapi/template'
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
                        id: '',
                        type1:'',
                        type2:'',
                        title: '',
                        cover:'',
                        content: '',
                        views: '',
                        timestamp: new Date()
                    },
                    types1:[{value: 0,label: '全部'},    
                    {value: 1,label: '常用文书'},
                    {value: 2,label: '行政文书'},
                    {value: 3,label: '民事文书'},
                    {value: 4,label: '刑事文书'}],
                    types2:[{value: 0,label: '合同'},    
                    {value: 1,label: '离婚协议书'},
                    {value: 2,label: '公告'},
                    {value: 3,label: '通报'},
                    {value: 4,label: '通知'}],
                    selectValue:'',
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
                this.getList()
            },
            methods:{
                getList(){
                    this.listLoading = true
                    fetchList(this.listQuery).then(res=>{
                        this.list = res.data.items;
                        this.total = res.data.total;
                        setTimeout(() => {
                            this.listLoading = false
                        }, 1.5 * 1000)
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
                    this.Form.cover = [this.Form.cover];
                    this.textMap = '编辑';
                    this.dialogPvVisible = true;
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                add(){
                    // this.$refs['DataForm'].validate(valid=>{
                    //     if(valid){
                    //         console.log(123);
                    //     }
                    // })
                    this.$refs['DataForm'].validate((valid) => {
                        if (valid) {
                            console.log('asdasd')
                        }
                    })
                },
                edit(){
                    this.$refs['DataForm'].validate(valid=>{
                        if(valid){
                            console.log(123);
                        }
                    })
                },
                Delete(row){
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                    row.status = 1;
                },
                resetForm(){
                    this.Form = {
                        id: '',
                        type1:'',
                        type2:'',
                        title: '',
                        cover:'',
                        content: '',
                        views: '',
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
                }
            }
        }
    </script>
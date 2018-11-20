<template>
        <div class="app-container">
            <div class="filter-container">
                <el-input placeholder="输入代理商电话" style="width:200px"  class="filter-item"></el-input>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander(0)">添加</el-button>
            </div>
            <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
                <el-table-column label="序号" align="center" width="65" type="index">
                </el-table-column>
                <el-table-column label="账号" align="center" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cate.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="密码" align="center" min-width="100" prop="author">
                    <template slot-scope="scope">
                        <span>{{ scope.row.lawyer.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话号码" align="center" min-width="150" property="title"></el-table-column>
                <el-table-column label="负责人姓名" align="center" min-width="300" property="content"></el-table-column>
                <el-table-column label="性别" align="center" min-width="300" property="content"></el-table-column>
                <el-table-column label="头像" align="center" min-width="150">
                    <template slot-scope="scope">
                            <!-- <img width="100%" v-for="item in scope.row.cover" :src="item.url" alt=""> -->
                            <img width="100%" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="所在地" align="center" min-width="150" property="title"></el-table-column>
                <el-table-column label="余额" align="center" min-width="150" property="title"></el-table-column>
                <el-table-column label="银行卡" align="center" min-width="150" property="title">
                        <el-table-column label="所属银行" align="center" min-width="150" property="title"></el-table-column>
                        <el-table-column label="卡号" align="center" min-width="150" property="title"></el-table-column>
                </el-table-column>
                <el-table-column label="代理时间" align="center" min-width="150">
                        <template slot-scope="scope">
                            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                        </template>
                    </el-table-column>
                <el-table-column label="创建时间" align="center" min-width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="当前状态" align="center" min-width="80" property="views"></el-table-column>
                
                <el-table-column label="操作" align="center" min-width="200">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  
    
            <!-- 编辑弹框 -->
            <el-dialog :visible.sync="dialogPvVisible" :title="textMap">
                <el-form ref="DataForm" :rules="rules" :model="Form">
                    <el-form-item label="案件标題"  prop="title">
                        <el-input v-model="Form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="发布人"  prop="author">
                        <el-input v-model="Form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="案件类型"  prop="type">
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="案件内容"  prop="content">
                        <el-input type="textarea" v-model="Form.content" rows="5"></el-input>
                    </el-form-item>
                    <el-form-item label="案件图片" prop="cover">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :file-list="Form.cover"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
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
        import { agentList,agentdetail,createAgent,editAgent,delAgent,addCard,editCard,delCard } from '@/api/myapi/agent'
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
                        status: '',
                        title: '',
                        cover:[],
                        content: '',
                        views: '',
                        author:'',
                        timestamp: new Date()
                    },
                    types:[{value: 0,label: '婚姻'},
                    {value: 1,label: '财产'},
                    {value: 2,label: '土地'},
                    {value: 3,label: '经济'},
                    {value: 4,label: '合同'},
                    {value: 5,label: '纠纷'}],
                    selectValue:'',
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
                    agentList(this.listQuery).then(res=>{
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
                    this.message(()=>{
                        delcase({id:row._id}).then(res=>{
                            if(res.data.code==0){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getList()
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
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
                        id: '',
                        status: '',
                        title: '',
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
                }
            }
        }
</script>
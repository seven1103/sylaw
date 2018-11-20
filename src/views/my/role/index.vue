<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="输入管理员账号或电话" style="width:200px"  class="filter-item"></el-input>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander">添加</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
            <el-table-column label="序号" align="center" width="65" type="index">
            </el-table-column>
            <el-table-column label="账号" align="center" min-width="100" property="account">
            </el-table-column>
            <el-table-column label="手机号" align="center" min-width="100" prop="phone"></el-table-column>
            <el-table-column label="性别" align="center" min-width="100" prop="author">
                <template  slot-scope="scope">
                    {{ scope.row.sex | sexenum }}
                </template>
            </el-table-column>
            <el-table-column label="头像" align="center" min-width="150">
                <template slot-scope="scope">
                        <img width="100%"  :src="scope.row.avater" alt="">
                </template>
            </el-table-column>
            <el-table-column label="角色名称" align="center" min-width="100">
                <template slot-scope="scope">
                    {{scope.row.role | adminenum }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" min-width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.timed.created | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" min-width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.status==0">正常</span>
                    <span v-if="scope.row.status==1">已删除</span>
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
                <el-form-item label="姓名">
                    <el-input v-model="Form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                    <el-select v-model="selectRole" placeholder="请选择">
                        <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                        <el-select v-model="selectSex" placeholder="请选择">
                            <el-option
                                v-for="item in sex"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item label="头像">
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
    import { adminList,creatadmin,modifyadmin,deladmin } from '@/api/myapi/account'
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
                    avater:'',
                    role:'',
                    sex:'',
                    timestamp: new Date()
                },
                sex:[{value:0,label:'未知'},{value:1,label:'男'},{value:2,label:'女'}],
                roles:[{value:'admin',label:'高级管理员'},{value:'accounting',label:'会计'},{value:'Clerk',label:'文员'}],
                selectSex:'',
                selectRole:'',
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
                adminList().then(res=>{
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
                this.selectSex = this.Form.sex;
                this.selectRole = this.Form.role
                this.textMap = '编辑';
                this.dialogPvVisible = true;
                this.$nextTick(() => {
                    this.$refs['DataForm'].clearValidate()
                })
            },
            add(){
                this.listLoading = true
                this.Form.role = this.selectRole
                this.Form.sex = this.selectSex
                this.Form.avater = 'asd'
                creatadmin(this.Form).then(res=>{
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
                this.Form.role = this.selectRole
                this.Form.sex = this.selectSex
                this.Form.avater = 'asd'
                modifyadmin(this.Form).then(res=>{
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
                    deladmin({admin_id:row._id}).then(res=>{
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
                    avater:'',
                    role:'',
                    sex:'',
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
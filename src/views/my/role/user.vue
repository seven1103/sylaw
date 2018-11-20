<template>
        <div class="app-container">
            <div class="filter-container">
                <el-input placeholder="输入用户账号或电话" style="width:200px"  class="filter-item"></el-input>
                <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
            </div>
            <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
                <el-table-column label="序号" align="center" width="65" type="index">
                </el-table-column>
                <el-table-column label="账号" align="center" min-width="100" property="_id">
                </el-table-column>
                <el-table-column label="手机号" align="center" min-width="100" prop="phone"></el-table-column>
                <el-table-column label="性别" align="center" min-width="100" prop="sex">
                    <template  slot-scope="scope">
                        {{ scope.row.sex | sexenum }}
                    </template>
                </el-table-column>
                <el-table-column label="地址" align="center" min-width="100">
                    <!-- <template  slot-scope="scope">
                        {{ scope.row.province.name + scope.row.city.name + scope.row.province.county }}
                    </template> -->
                </el-table-column>
                <el-table-column label="头像" align="center" min-width="150">
                    <template slot-scope="scope">
                            <img width="100%"  :src="scope.row.avater" alt="">
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
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  
        </div>
    </template>
    <script>
        import { userlist,creatadmin,modifyadmin,deladmin } from '@/api/myapi/account'
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
                    dialogImageUrl:''
                }
            },
            created() {
                this.getList()
            },
            methods:{
                getList(){
                    this.listLoading = true
                    userlist().then(res=>{
                        this.list = res.data.result.list;
                        this.total = res.data.result.page.count;
                        this.listLoading = false
                    })
                },
                handleFilter() {
                    this.listQuery.page = 1
                    this.getList()
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
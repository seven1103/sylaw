<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="输入分类标题搜索" style="width:200px"  class="filter-item"></el-input>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-search" @click="handleFilter">查询</el-button>
            <el-button v-waves class="filter-item" style="margin-left:10px" icon="el-icon-edit" @click="addHander(0)">添加</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list"  border fit    highlight-current-row style="width: 100%;">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-card class="box-card"  v-for="(item,index) in scope.row.columns" :key="index" style="margin-bottom:10px">
                        <!-- <div slot="header" class="clearfix">
                            <span>{{item.name}}</span>
                            <span style="float: right; padding: 3px 0">
                                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditHander(scope.row,3)">编辑</el-button>
                                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete(scope.row)">删除</el-button>
                            </span>
                        </div> -->
                        <div class="text item">
                                <span>{{item.name}}</span>
                                <span style="float: right; padding: 3px 0">
                                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditHander(scope.row,3,item)">编辑</el-button>
                                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete2(scope.row._id,item._id)">删除</el-button>
                                </span>
                            <!-- <p>时间：<span style="color:#606266">{{}}</span></p> -->
                        </div>
                    </el-card>
                    <div style="width:100%;text-align:center;margin-top:20px" @click="addHander(1,scope.row)"><el-button>添加二级分类</el-button></div>
                </template>
                
            </el-table-column>
            <!-- <el-table-column label="序号" align="center" width="65"  type="index">
            </el-table-column> -->
            <el-table-column label="分类" align="center" min-width="100" property="name">
            </el-table-column>
            <!-- <el-table-column label="描述" align="center" min-width="200" property="desc">
            </el-table-column> -->
            <el-table-column label="日期" align="center" min-width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.timed | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="200">
                <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="EditHander(scope.row,2)">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="Delete1(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />  



           
        <!-- 编辑弹框 -->
        <el-dialog :visible.sync="dialogPvVisible" :title="textMap">
            <el-form ref="DataForm" :rules="rules" :model="Form">
                <el-form-item label="一级分类"  v-if="Form.type==0 || Form.type==2">
                    <!-- <el-autocomplete v-model="Form.type1" 
                    :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                    @select="handleSelect"></el-autocomplete> -->
                    <el-input placeholder="请输入内容" v-model="Form.name"></el-input>
                </el-form-item>
                <el-form-item v-else label="二级分类">
                    <el-input placeholder="请输入内容" v-model="Form.column_name"></el-input>
                </el-form-item>
                <!-- <el-form-item label="注释"  prop="content">
                    <el-input type="textarea" v-model="Form.mark" rows="5"></el-input>
                </el-form-item> -->
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPvVisible = false">取消</el-button>
                <el-button type="primary" @click="push()">确定</el-button>
            </div>
        </el-dialog>

        
    </div>
</template>
    <script>
        import { fetchCaseList,addfist,addsed,delfirst,delsed,edit } from '@/api/myapi/classfy'
        import waves from '@/directive/waves'
        import { parseTime } from '@/utils'
        import Pagination from '@/components/Pagination'
        import { Message } from 'element-ui'
    
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
                        cate_id: '',
                        column_id :'',
                        column_name :'',
                        name: '',
                        type:0 // 当前方式 0 一级分类添加 1 二级分类添加 2 一级分类编辑 3 二级分类编辑
                    },
                    dialogPvVisible:false,
                    textMap:'添加',
                    rules:{
                        title: [{ required: true,message: '标题不能为空',trigger:blur}],
                        content:[{ required: true,message: '简介不能为空',trigger:blur}]
                    },
                    restaurants: [],
                    timeout:  null,
                    nowitem:[]
                }
            },
            created() {
                this.getList()
            },
            methods:{
                getList(){
                    this.listLoading = true
                    fetchCaseList(this.listQuery).then(res=>{
                        this.list = res.data.result.list;
                        this.total = res.data.result.page.count
                        this.restaurants = this.loadAll();
                        this.listLoading = false
                    })
                },
                handleFilter() {
                    this.listQuery.page = 1
                    this.getList()
                },
                addHander(type,item={}){
                    this.resetForm();
                    this.textMap = '添加';
                    this.Form.type = type;
                    this.nowitem = item;
                    this.dialogPvVisible = true;
                },
                EditHander(row,type,item={}){
                    //this.Form = Object.assign({}, row);
                    this.Form.cate_id = row._id;
                    this.Form.name = row.name;
                    this.textMap = '编辑';
                    this.Form.type = type;
                    if(type==3){
                        this.Form.column_id = item._id;
                        this.Form.column_name = item.name;
                    }
                    this.dialogPvVisible = true;
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                push(){
                    switch (this.Form.type) {
                        case 0:
                            this.add1(this.Form)
                            break;
                        case 1:
                            this.add2(this.Form)
                            break;
                        case 2:
                            this.edit1(this.Form)
                            break;
                        case 3:
                            this.edit2(this.Form)
                            break;
                        default:
                            break;
                    }
                },

                add1(form){
                    // console.log('一级分类添加')
                    //判断当前分类是否已存在
                    let ishave = this.restaurants.some(item=>{
                        if (item.value == form.name) return true
                    })
                    if(ishave) {
                        Message({
                            message: '该分类已存在',
                            type: 'error',
                            duration: 5 * 1000
                        })
                    }else{
                        addfist({type:'case',name:form.name}).then(res=>{
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
                                    message: '创建失败',
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
                            
                        })
                    }
                },
                add2(form){
                    // console.log('二级分类添加')
                    //判断当前二级分类是否存在
                    let ishave = this.nowitem.columns.some(item=>{
                        if (item.name == form.column_name) return true
                    })
                    if(ishave){
                        Message({
                            message: '该分类已存在',
                            type: 'error',
                            duration: 5 * 1000
                        })
                    }else{
                        addsed({cate_id:this.nowitem._id,name:this.nowitem.name,column_name:form.column_name}).then(res=>{
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
                                    message: '创建失败',
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
                        })
                    }
                },
                edit1(form){
                    edit({cate_id: form.cate_id,name: form.name}).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.dialogPvVisible = false
                            this.getList()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '编辑失败!'
                            });
                        }
                    })
                },
                edit2(form){
                    edit({cate_id: form.cate_id,name: form.name,column_id: form.column_id,column_name: form.column_name }).then(res=>{
                        if(res.data.code==0){
                            this.$message({
                                type: 'success',
                                message: '编辑成功!'
                            });
                            this.dialogPvVisible = false
                            this.getList()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '编辑失败!'
                            });
                        }
                    })
                },
                Delete1(row){
                    this.message(()=>{
                        delfirst({cate_id:row._id}).then(res=>{
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
                Delete2(cate_id,column_id){
                    this.message(()=>{
                        delsed({cate_id:cate_id,column_id:column_id}).then(res=>{
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
                        cate_id: '',
                        column_id :'',
                        column_name :'',
                        name: '',
                        type:0
                    }
                    this.$nextTick(() => {
                        this.$refs['DataForm'].clearValidate()
                    })
                },
                loadAll() {
                    let arr = []
                    this.list.map(item=>{
                        arr.push( { "value": item.name })
                    })
                    return arr
                }
            }
        }
    </script>
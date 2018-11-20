<template>
    <div class="app-container">
        <div class="filter-container">
            <tree-table :data="data" :columns="columns" border>
                <el-table-column label="问题内容/回答内容">
                    <template slot-scope="scope">
                        <span>{{ scope.row.problem || scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="作者" prop="user.name">   
                </el-table-column>
                 <el-table-column label="被采纳回答" prop="adop.content">   
                </el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timed | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.type" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </tree-table>
        </div>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    
</template>
      
<script>
import treeTable from '@/components/TreeTable'
import Pagination from '@/components/Pagination'
import { questionList,delquestion,delanswer } from '@/api/myapi/question'
import { parseTime } from '@/utils'
import { Message } from 'element-ui'

export default {
    name: 'CustomTreeTableDemo',
    components: { treeTable, Pagination },
    data() {
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
            columns: [
                {
                text: '问题/回答',
                value: 'event',
                width: 200
                }
            ],
            data:[]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList(){
            this.listLoading = true
            questionList(this.listQuery).then(res=>{
               res.data.result.list.map(item=>{
                   item.event="问题";
                   item.children = item.answer;
                   item.children.map(item1=>{
                       item1.event = "回答"
                       item1.type="child"
                       item1.user = item1.lawyer
                   })
               })
                this.data = res.data.result.list;
                this.total = res.data.result.page.count;
                this.listLoading = false
            })
        },
        delquestion(row){
            this.message(()=>{
                delquestion({id:row._id}).then(res=>{
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
        }
    }
}
</script>
      
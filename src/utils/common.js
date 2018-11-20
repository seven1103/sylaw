import { Message } from 'element-ui'
export default{
  delmessage: function(self, callback) {
    self.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      callback()
    }).catch(() => {
      self.$message({
        type: 'info',
        message: '已取消删除'
      })       
    })
  },
  delHandle: function(res, callback) {
    if (res.data.code === 0) {
      Message({
        message: '删除成功',
        type: 'success',
        duration: 5 * 1000
      })
      callback()
    } else {
      Message({
        message: res.data.errmsg || '删除失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  addHandle: function(res, callback) {
    if (res.data.code === 0) {
      Message({
        message: '创建成功',
        type: 'success',
        duration: 5 * 1000
      })
      callback()
    } else {
      Message({
        message: res.data.errmsg || '创建失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  eidtHandle: function(res, callback) {
    if (res.data.code === 0) {
      Message({
        message: '编辑成功',
        type: 'success',
        duration: 5 * 1000
      })
      callback()
    } else {
      Message({
        message: res.data.errmsg || '编辑失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  changePswHandle: function(res, callback) {
    if (res.data.code === 0) {
      Message({
        message: '修改成功',
        type: 'success',
        duration: 5 * 1000
      })
      callback()
    } else {
      Message({
        message: res.data.errmsg || '修改失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
}

<template>
  <div>
    <el-dialog
      title="新增数据填报"
      :visible.sync="dialogVisible"
      width="80%"
      vh="10"
      :before-close="handleClose"
    >
      <div class="big_box">
        <div class="left_info">
          <el-row>
            <el-col :span="8">
              名称
            </el-col>
            <el-col :span="16">
              <el-input v-model="inputName" placeholder="请输入内容" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              空间类型
            </el-col>
            <el-col :span="16">
              具体空间选择
              <!-- <el-input v-model="inputName" placeholder="请输入内容" /> -->
            </el-col>
          </el-row>
        </div>
        <div class="show_info">center</div>
        <div class="set_info">right</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      inputName: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.big_box{
  display:flex
}
.left_info{
  width:200px
}
.show_info{
  flex:1;
}
.set_info{
 width:300px
}
</style>

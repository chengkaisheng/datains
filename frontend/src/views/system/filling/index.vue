<template>
  <layout-conpent>
    <div>
      <el-row>
        <el-col :span="6">
          <el-button>
            <i class="el-icon-folder-add"></i>
            <span>新增分类</span>
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button>
            <i class="el-icon-circle-plus-outline"></i>
            <span>新增数据填报</span>
          </el-button>
        </el-col>
      </el-row>
    </div>
  </layout-conpent>
</template>

<script>
import LayoutContent from '@/components/business/LayoutContent'

export default {
  components: {LayoutContent},
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>

</style>
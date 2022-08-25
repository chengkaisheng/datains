<template>
  <div class="fill_box">
    <div>
      <complex-table
        :data="fillData"
        :columns="columns"
        local-key="userGrid"
        :search-config="searchConfig"
        :pagination-config="paginationConfig"
        @select="select"
        @search="search"
        @sort-change="sortChange"
      >
        <template #toolbar>
          <el-button v-permission="['user:add']" icon="el-icon-circle-plus-outline" @click="create">{{ '新增分类' }}</el-button>

          <el-button icon="el-icon-circle-plus-outline" @click="addNewData">{{ '新增数据填报' }}</el-button>
        <!-- <el-button v-if="openLdap" v-permission="['user:import']" icon="el-icon-download" @click="importLdap">{{ $t('user.import_ldap') }}</el-button> -->
        </template>

        <el-table-column prop="username" label="名称" />
        <el-table-column :show-overflow-tooltip="true" prop="nickName" sortable="custom" :label="'创建者'" />
        <!-- <el-table-column prop="gender" :label="$t('commons.gender')" width="60" /> -->
        <el-table-column prop="from" :label="'修改人'" width="80">
          <template slot-scope="scope">
            <!-- <div>{{ scope.row.from === 0 ? 'LOCAL' : scope.row.from === 1 ? 'LDAP' : 'OIDC' }}</div> -->
          </template>
        </el-table-column>

        <el-table-column prop="email" :label="'修改时间'" />

        <el-table-column prop="createTime" sortable="custom" :label="'操作'" width="180">
          <template v-slot:default="scope">
            <span>{{ scope.row.createTime | timestampFormatDate }}</span>
          </template>
        </el-table-column>
      </complex-table>

    </div>
    <!-- <div>表格</div> -->
    <AddInfo ref="addInforef" />
  </div>
</template>
<script>
import ComplexTable from '@/components/business/complex-table'
import AddInfo from './addInfo'
export default {

  components: {
    ComplexTable,
    AddInfo
  },
  data() {
    return {
      fillData: [],
      columns: [],
      searchConfig: {
        useQuickSearch: true,
        useComplexSearch: true,
        quickPlaceholder: this.$t('user.search_by_name'),
        components: [
          { field: 'nick_name', label: this.$t('commons.nick_name'), component: 'DeComplexInput' },
          {
            field: 'u.enabled',
            label: this.$t('commons.status'),
            component: 'DeComplexSelect',
            options: [
              { label: this.$t('commons.enable'), value: '1' },
              { label: this.$t('commons.disable'), value: '0' }
            ],
            multiple: false
          }

        ]
      },
      paginationConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    create() {
      console.log('-----触发事件-----')
      this.$refs.addInforef.dialogVisible = true
    },
    addNewData() {
      console.log('触发事件-----')
      this.$refs.addInforef.dialogVisible = true
    },
    search(e) {
      console.log('搜索结果', e)
    },
    select(e) {
      console.log('下拉结果', e)
    },
    sortChange(item) {
      console.log('下拉结果', item)
    }
  }
}
</script>
<style lang="scss" scoped>
  .fill_box{
    padding:20px;
  }
</style>

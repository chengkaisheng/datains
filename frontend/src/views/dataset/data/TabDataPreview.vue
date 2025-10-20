<template>
  <el-col class="no-copy" @copy.prevent @cut.prevent @contextmenu.prevent @keydown="blockKey">
    <!-- <el-row>
      <el-col style="width: 300px">
        <el-form ref="form" :model="form" size="mini" class="row-style">
          <el-form-item>
            <span class="title-text" style="width: 100px">{{
              $t("dataset.showRow")
            }}</span>
            <el-input v-model="form.row" class="main-area-input">
              <el-button slot="append" size="mini" icon="el-icon-search" @click="reSearch" />
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row> -->
    <ux-grid
      ref="plxTable"
      size="mini"
      style="width: 100%"
      :height="height"
      sortable
      :checkbox-config="{ highlight: true }"
      :width-resize="true"
    >
      <!-- :key="field.id"  排序和筛选后更新表头-->
      <ux-table-column
        v-for="field in fields"
        :key="field.id + '|' + sortField + '|' + sortType + '|' + filterArray.findIndex(f => f.field.id === field.id && f.field.datainsName === field.datainsName && f.field.name === field.name)"
        min-width="200px"
        :field="field.datainsName"
        :resizable="true"
      >
        <template slot="header">
          <svg-icon v-if="field.deType === 0" icon-class="field_text" class="field-icon-text" />
          <svg-icon v-if="field.deType === 1" icon-class="field_time" class="field-icon-time" />
          <svg-icon v-if="field.deType === 2 || field.deType === 3" icon-class="field_value" class="field-icon-value" />
          <svg-icon v-if="field.deType === 5" icon-class="field_location" class="field-icon-location" />
          <span :class="{ 'highlight-field': isFieldFiltered(field) }">{{ field.name }}</span>
          <span class="caret-wrapper" @click="toggleSort(field.datainsName)">
            <i class="sort-caret ascending" :class="{ active: sortField === field.datainsName && sortType === 'asc' }" />
            <i class="sort-caret descending" :class="{ active: sortField === field.datainsName && sortType === 'desc' }" />
          </span>
          <column-filter :value="getFilterValue(field.id)" :column-key="field" @change="onFilterChange" />
        </template>
      </ux-table-column>
    </ux-grid>
    <el-row style="margin-top: 4px">
      <span
        v-if="
          table.type === 'excel' ||
            table.type === 'custom' ||
            table.type === 'union'
        "
        class="table-count"
      >
        <span v-if="page.total <= currentPage.show">
          {{ $t("dataset.preview_total") }}
          <span class="span-number">{{ page.total }}</span>
          {{ $t("dataset.preview_item") }}
        </span>
        <span v-if="page.total > currentPage.show">
          {{ $t("dataset.preview_show") }}
          <span class="span-number">{{ currentPage.show }}</span>
          {{ $t("dataset.preview_item") }}
          ，{{ $t("dataset.preview_total") }}
          <span class="span-number">{{ page.total }}</span>
          {{ $t("dataset.preview_item") }}
        </span>
      </span>
      <span v-if="table.type === 'db' || table.type === 'sql'" class="table-count">
        {{ $t("dataset.preview_show") }}
        <span class="span-number">{{ page.total }}</span>
        {{ $t("dataset.preview_item") }}
      </span>
      <!-- <el-pagination
        :current-page="currentPage.page"
        :page-sizes="[parseInt(form.row)]"
        :page-size="parseInt(form.row)"
        :pager-count="5"
        layout="sizes, prev, pager, next"
        :total="currentPage.show"
        @current-change="pageChange"
      /> -->
      <el-pagination
        :current-page="currentPageforms.currentPage"
        :page-sizes="[100, 200, 500, 1000]"
        :page-size="currentPageforms.pageSize"
        :pager-count="5"
        layout="sizes, prev, pager, next"
        :total="currentPageforms.total"
        @current-change="pageChange"
        @size-change="sizeChange"
      />
    </el-row>
  </el-col>
</template>

<script>
import ColumnFilter from './components/ColumnFilter.vue'
export default {
  name: 'TabDataPreview',
  components: { ColumnFilter },
  props: {
    table: {
      type: Object,
      required: true
    },
    param: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    page: {
      type: Object,
      required: false
    },
    currentPageform: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      height: 500,
      currentPage: {
        page: 1,
        pageSize: parseInt(this.form.row),
        show: parseInt(this.form.row)
      },
      currentPageforms: {
        pagesize: this.currentPageform.pageSize, // 🔹 每页条数
        currentPage: this.currentPageform.currentPage, // 🔹 当前页
        total: this.currentPageform.total // 🔹 总条数
      },
      filterArray: [], // 🔹 保存当前所有列的筛选条件
      sortField: '', // 🔹 当前排序的字段
      sortType: '' // 🔹 当前排序的类型{asc,desc}
    }
  },
  computed: {
    // 判断字段是否在filterArray中
    isFieldFiltered() {
      return (field) => {
        return this.filterArray.some(filter =>
          filter.field.id === field.id &&
          filter.field.datainsName === field.datainsName &&
          filter.field.name === field.name
        )
      }
    }
  },
  watch: {
    data() {
      const datas = this.data
      this.$refs.plxTable.reloadData(datas)
    },
    page() {
      if (this.page.total < parseInt(this.form.row)) {
        this.currentPage.show = this.page.total
      } else {
        this.currentPage.show = parseInt(this.form.row)
      }
    },
    currentPageform: {
      handler(newVal) {
        this.currentPageforms = {
          pageSize: newVal.pageSize,
          currentPage: newVal.currentPage,
          total: newVal.total
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.calHeight()
    },
    blockKey(e) {
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 's', 'u', 'a'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault()
      }
    },
    calHeight() {
      const that = this
      setTimeout(function() {
        const currentHeight = document.documentElement.clientHeight
        that.height = currentHeight - 56 - 30 - 26 - 25 - 55 - 38 - 28 - 10
      }, 10)
    },
    // reSearch() {
    //   if (
    //     !this.form.row ||
    //     this.form.row === '' ||
    //     this.form.row.length > 5 ||
    //     isNaN(Number(this.form.row)) ||
    //     String(this.form.row).includes('.') ||
    //     parseInt(this.form.row) < 1
    //   ) {
    //     this.$message({
    //       message: this.$t('dataset.pls_input_less_5'),
    //       type: 'error',
    //       showClose: true
    //     })
    //     return
    //   }
    //   this.currentPage.show = parseInt(this.form.row)
    //   this.currentPage.pageSize = parseInt(this.form.row)
    //   this.currentPage.page = 1
    //   this.$emit('reSearch', { form: this.form, page: this.currentPage })
    // },
    pageChange(val) {
      this.currentPageforms.currentPage = val
      this.emitSearch()
    },
    sizeChange(val) {
      this.currentPageforms.pageSize = val
      this.currentPageforms.currentPage = 1
      this.emitSearch()
    },
    getFilterValue(fieldId) {
      const item = this.filterArray.find(f => f.fieldId === fieldId)
      return item ? item.value : ''
    },
    formatFilterValue(val) {
      if (val === null) return []
      if (Array.isArray(val)) return val
      return [val]
    },
    onFilterChange(value, keyObj) {
      // keyObj 就是 columnKey（field 对象）
      const { id: fieldId, deType: deType } = keyObj
      // 1. 找到是否已存在该字段的筛选
      const index = this.filterArray.findIndex(f => f.field.id === fieldId)
      // 2. 空值 => 删除
      //
      const isEmpty = !value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)
      if (isEmpty && index !== -1) {
        this.filterArray.splice(index, 1)
      } else {
        // 3. 有值 => 新增 or 覆盖
        // 非日期类型 'like'  日期类型 'between'
        let item
        if (deType !== 1) {
          item = {
            field: keyObj,
            filter: [
              {
                fieldId,
                term: 'like',
                value: value
              }
            ]
          }
        } else {
          item = {
            field: keyObj,
            filter: [
              {
                fieldId,
                term: 'ge',
                value: value[0]
              },
              {
                fieldId,
                term: 'le',
                value: value[1]
              }
            ]
          }
        }
        index === -1
          ? this.filterArray.push(item)
          : this.$set(this.filterArray, index, item)
      }
      console.log(this.filterArray)
      this.currentPageforms.currentPage = 1
      this.emitSearch()
    },
    toggleSort(fieldKey) {
      const map = { '': 'asc', 'asc': 'desc', 'desc': '' }
      if (this.sortField !== fieldKey) {
        this.sortField = fieldKey
        this.sortType = 'asc'
      } else {
        this.sortType = map[this.sortType]
        if (!this.sortType) this.sortField = ''
      }
      this.emitSearch()
    },
    // 统一触发父组件方法（合并筛选 + 排序 + 分页）
    emitSearch() {
      const sortFielditem = this.fields.find(f => f.datainsName === this.sortField)
      const mergedForm = {
        ...this.form,
        filterArray: this.filterArray,
        sortFields: [
          {
            id: sortFielditem && sortFielditem.id || '',
            sort: this.sortType || ''
          }
        ],
        currentPageforms: { ...this.currentPageforms }
      }
      this.$emit('reSearch', {
        form: mergedForm,
        page: { page: this.currentPageforms.currentPage, pageSize: this.currentPageforms.pageSize }
      })
    }
  }
}
</script>

<style scoped>
.no-copy {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.row-style>>>.el-form-item__label {
  font-size: 12px;
}

.row-style>>>.el-form-item--mini.el-form-item {
  margin-bottom: 10px;
}

.row-style>>>.el-form-item__content {
  display: flex;
  flex-direction: row;
  width: 250px;
}

.el-pagination {
  float: right;
}

span {
  font-size: 12px;
}

.span-number {
  color: #0a7be0;
}

.table-count {
  color: #606266;
}

/* 双箭头排序图标 */
.caret-wrapper {
  position: relative;
  display: inline-flex;
  /* 横向排列，不叠加 */
  flex-direction: column;
  align-items: center;
  width: 14px;
  height: 18px;
  margin-left: 4px;
  cursor: pointer;
  vertical-align: middle;
  user-select: none;
  margin-top: -2px;
  /* 微调位置 */
}

/* 公共三角 */
.sort-caret {
  width: 0;
  height: 0;
  border: 4px solid transparent;
  transition: border-color .2s;
}

/* 上三角 */
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  margin-bottom: 2px;
  /* 上下分开 */
}

/* 下三角 */
.sort-caret.descending {
  border-top-color: #c0c4cc;
}

/* 高亮状态 */
.sort-caret.ascending.active {
  border-bottom-color: #409eff;
}

.sort-caret.descending.active {
  border-top-color: #409eff;
}

/* 字段高亮样式 */
::v-deep .highlight-field {
  color: #409eff !important;
  font-weight: bold;
}
</style>

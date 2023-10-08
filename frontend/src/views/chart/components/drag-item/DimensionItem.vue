<template>
  <span>
    <el-dropdown trigger="click" size="mini" @command="clickItem">
      <span class="el-dropdown-link">
        <el-tag size="small" class="item-axis" :type="tagType">
          <span style="float: left">
            <svg-icon v-if="item.deType === 0" icon-class="field_text" class="field-icon-text" />
            <svg-icon v-if="item.deType === 1" icon-class="field_time" class="field-icon-time" />
            <svg-icon v-if="item.deType === 2 || item.deType === 3" icon-class="field_value" class="field-icon-value" />
            <svg-icon v-if="item.deType === 5" icon-class="field_location" class="field-icon-location" />
            <svg-icon v-if="(!item.customizeSort && item.sort) === 'asc'" icon-class="sort-asc" class-name="field-icon-sort" />
            <svg-icon v-if="(!item.customizeSort && item.sort) === 'desc'" icon-class="sort-desc" class-name="field-icon-sort" />
            <svg-icon v-if="customVisible && item.customizeSort === 'customize'" icon-class="sort-customize" class-name="field-icon-sort" />
          </span>
          <span class="item-span-style" :title="item.name">{{ item.name }}</span>
          <field-error-tips v-if="tagType === 'danger'" />
          <span v-if="false && item.deType === 1" class="summary-span">
            {{ $t('chart.' + item.dateStyle) }}
          </span>
          <i class="el-icon-arrow-down el-icon--right" style="position: absolute;top: 6px;right: 10px;" />
        </el-tag>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="sort">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-sort" />
                  <span>{{ $t('chart.sort') }}</span>
                  <span class="summary-span-item">({{ $t('chart.'+ (item.customizeSort || item.sort)) }})</span>
                </span>
                <i class="el-icon-arrow-right el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeSort('none')">{{ $t('chart.none') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeSort('asc')">{{ $t('chart.asc') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeSort('desc')">{{ $t('chart.desc') }}</el-dropdown-item>
                <el-dropdown-item v-if="customVisible" :command="beforeSort('customize')">{{ $t('chart.customize') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <!--          <el-dropdown-item icon="el-icon-files" :command="beforeClickItem('filter')">-->
          <!--            <span>{{ $t('chart.filter') }}...</span>-->
          <!--          </el-dropdown-item>-->

          <el-dropdown-item v-show="item.deType === 1" divided>
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="dateStyle">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-c-scale-to-original" />
                  <span>{{ $t('chart.dateStyle') }}</span>
                  <span class="summary-span-item">({{ $t('chart.'+item.dateStyle) }})</span>
                </span>
                <i class="el-icon-arrow-right el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeDateStyle('y')">{{ $t('chart.y') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('y_M')">{{ $t('chart.y_M') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('y_Q')">{{ $t('chart.y_Q') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('M')">{{ $t('chart.M') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('y_M_d')">{{ $t('chart.y_M_d') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('H_m_s')" divided>{{ $t('chart.H_m_s') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('y_M_d_H_m')">{{ $t('chart.y_M_d_H_m') }}</el-dropdown-item>
                <el-dropdown-item :command="beforeDateStyle('y_M_d_H_m_s')">{{ $t('chart.y_M_d_H_m_s') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item v-show="item.deType === 1">
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="datePattern">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-timer" />
                  <span>{{ $t('chart.datePattern') }}</span>
                  <span class="summary-span-item">({{ $t('chart.'+item.datePattern) }})</span>
                </span>
                <i class="el-icon-arrow-right el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeDatePattern('date_sub')">{{ $t('chart.date_sub') }}(1990-01-01)</el-dropdown-item>
                <el-dropdown-item :command="beforeDatePattern('date_split')">{{ $t('chart.date_split') }}(1990/01/01)</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>

          <el-dropdown-item icon="el-icon-edit-outline" divided :command="beforeClickItem('rename')">
            <span>{{ $t('chart.show_name_set') }}</span>
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" divided :command="beforeClickItem('remove')">
            <span>{{ $t('chart.delete') }}</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="(viewType === 'roll-elemnt' || viewType === 'progress-count')" divided>
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="checkeShow">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-view" />
                  <span>{{ $t('chart.display') }}</span>
                  <span class="summary-span-item">
                    (
                    <span v-if="item.checked">展示</span>
                    <span v-else>隐藏</span>
                    )
                  </span>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeDisplay(true)">展示</el-dropdown-item>
                <el-dropdown-item :command="beforeDisplay(false)">隐藏</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item v-if="viewType === 'roll-elemnt'" divided>
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="relationShow">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-view" />
                  <span>{{ $t('chart.relation') }}</span>
                  <span class="summary-span-item">
                    (
                    <span v-if="item.relation">展示</span>
                    <span v-else>隐藏</span>
                    )
                  </span>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeRelation(true)">展示</el-dropdown-item>
                <el-dropdown-item :command="beforeRelation(false)">隐藏</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided v-if="viewType === 'table-prog'">
            <el-dropdown placement="right-start" size="mini" style="width: 100%" @command="progressShow">
              <span class="el-dropdown-link inner-dropdown-menu">
                <span>
                  <i class="el-icon-view" />
                  <span>{{$t('chart.progress_show')}}</span>
                  <span class="summary-span-item">
                    (
                    <span v-if="item.progress">展示</span>
                    <span v-else>隐藏</span>
                    )
                  </span>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="beforeProgress(true)">展示</el-dropdown-item>
                <el-dropdown-item :command="beforeProgress(false)">隐藏</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </span>
    </el-dropdown>
  </span>
</template>

<script>
import { getItemType } from '@/views/chart/components/drag-item/utils'
import FieldErrorTips from '@/views/chart/components/drag-item/components/FieldErrorTips'

export default {
  name: 'DimensionItem',
  components: { FieldErrorTips },
  props: {
    param: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    dimensionData: {
      type: Array,
      required: true
    },
    quotaData: {
      type: Array,
      required: true
    },
    viewType: {
      type: String,
      required: true
    },
    customVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tagType: 'success'
    }
  },
  watch: {
    dimensionData: function() {
      this.getItemTagType()
    },
    item: function() {
      this.getItemTagType()
    }
  },
  mounted() {
    if (this.viewType === 'roll-elemnt') {
      if (this.item.relation === undefined) {
        this.item.relation = true
      }
    }
  },
  methods: {
    clickItem(param) {
      if (!param) {
        return
      }
      switch (param.type) {
        case 'rename':
          this.showRename()
          break
        case 'remove':
          this.removeItem()
          break
        case 'filter':
          this.editFilter()
          break
        default:
          break
      }
    },
    beforeClickItem(type) {
      return {
        type: type
      }
    },
    sort(param) {
      if (param.type === 'customize') {
        this.item.customizeSort = 'customize'
      } else {
        this.item.sort = param.type
        this.item.customizeSort = ''
      }
      console.log('sort param: ', param, this.item)
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeSort(type) {
      return {
        type: type
      }
    },
    dateStyle(param) {
      this.item.dateStyle = param.type
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeDateStyle(type) {
      return {
        type: type
      }
    },
    checkeShow(param) {
      this.item.checked = param.type
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeDisplay(type) {
      return {
        type: type
      }
    },
    relationShow(param) {
      this.item.relation = param.type
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeRelation(type) {
      return {
        type: type
      }
    },
    progressShow(param) {
      this.item.progress = param.type
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeProgress(type) {
      return {
        type: type
      }
    },
    datePattern(param) {
      this.item.datePattern = param.type
      this.$emit('onDimensionItemChange', this.item)
    },
    beforeDatePattern(type) {
      return {
        type: type
      }
    },
    editFilter() {
      this.item.index = this.index
      this.$emit('editItemFilter', this.item)
    },
    showRename() {
      this.item.index = this.index
      this.item.renameType = 'dimension'
      this.$emit('onNameEdit', this.item)
    },
    removeItem() {
      this.item.index = this.index
      this.item.removeType = 'dimension'
      this.$emit('onDimensionItemRemove', this.item)
    },
    getItemTagType() {
      this.tagType = getItemType(this.dimensionData, this.quotaData, this.item)
    }
  }
}
</script>

<style scoped>
  .item-axis {
    padding: 1px 6px;
    margin: 0 3px 2px 3px;
    text-align: left;
    height: 24px;
    line-height: 22px;
    display: flex;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    width: 159px;
  }

  .item-axis:hover {
    background-color: #fdfdfd;
    cursor: pointer;
  }

  span {
    font-size: 12px;
  }

  .summary-span{
    margin-left: 4px;
    color: #878d9f;
    position: absolute;
    right: 25px;
  }

  .inner-dropdown-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%
  }

  .item-span-style{
    display: inline-block;
    width: 70px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .summary-span-item{
    margin-left: 4px;
    color: #878d9f;
  }
</style>

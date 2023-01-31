<template>
  <el-row>
    <el-col :span="8">
      <div class="filter-options-left">
        <el-switch
          v-if="widget.showSwitch"
          v-model="attrs.multiple"
          :active-text="$t('panel.multiple_choice')"
          :inactive-text="$t('panel.single_choice')"
          @change="multipleChange"
        />
      </div>
    </el-col>
    <el-col :span="16">
      <div class="filter-options-right">
        <span style="padding-right: 10px;">
          <el-checkbox v-model="attrs.showTitle" @change="showTitleChange">
            {{ $t('panel.show_title') }}
          </el-checkbox>
          <el-popover v-model="titlePopovervisible" placement="bottom-end" :disabled="!attrs.showTitle" width="200">
            <div style="width: 100%;overflow-y: auto;overflow-x: hidden;word-break: break-all;position: relative;">
              <el-input v-model="attrs.title" :placeholder="$t('panel.input_title')" type="textarea" maxlength="15" show-word-limit />
            </div>

            <i
              slot="reference"
              :class="{'i-filter-active': attrs.showTitle, 'i-filter-inactive': !attrs.showTitle}"
              class="el-icon-setting i-filter"
            />
          </el-popover>
        </span>
        <span style="padding-left: 10px;">
          <el-checkbox v-model="attrs.enableRange" @change="enableRangeChange"><span>
            {{ $t('panel.custom_scope') }} </span> </el-checkbox>

          <el-popover v-model="popovervisible" placement="bottom-end" :disabled="!attrs.enableRange" width="200">
            <div class="view-container-class">
              <el-checkbox-group v-model="attrs.viewIds" @change="checkedViewsChange">
                <el-checkbox
                  v-for="(item ) in childViews.viewInfos"
                  :key="item.id"
                  :label="item.id"
                  class="de-checkbox"
                >
                  <div class="span-div">
                    <svg-icon :icon-class="item.type" class="chart-icon" />
                    <span v-if="item.name && item.name.length <= 7" style="margin-left: 6px">{{ item.name }}</span>
                    <el-tooltip v-else class="item" effect="dark" :content="item.name" placement="left">
                      <span style="margin-left: 6px">{{ item.name }}</span>
                    </el-tooltip>
                  </div>

                </el-checkbox>
              </el-checkbox-group>
            </div>

            <i
              slot="reference"
              :class="{'i-filter-active': attrs.enableRange, 'i-filter-inactive': !attrs.enableRange}"
              class="el-icon-setting i-filter"
            />
          </el-popover>
        </span>
        <!-- <span style="padding-left: 10px;" v-if="element.component === 'de-select'">
          <el-checkbox v-model="attrs.showFilter" @change="showFilterChange">
            <span>{{$t('panel.custom_filter')}}</span>
          </el-checkbox>
          <el-popover v-model="filterVisible" placement="bottom-end" :disabled="!attrs.showFilter" width="200">
            <div style="width:100%;overflow-y: auto;overflow-x: hidden;word-break: break-all;position: relative;">
              <draggable
                v-model="attrs.filterItems"
                group="drag"
                animation="300"
                :move="onMove"
                class="theme-drag"
                style="padding:2px 0 0 0;width:100%;min-height: 32px;overflow-x: auto;display: flex;align-items: center;"
                @add="addCustomFilter"
              >
                <transition-group class="draggable-group">
                  <filter-item
                    v-for="(item,index) in attrs.filterItems"
                    :key="item.id"
                    :param="param"
                    :index="index"
                    :item="item"
                    :dimension-data="dimension"
                    :quota-data="quota"
                    @onFilterItemRemove="filterItemRemove"
                    @editItemFilter="showEditFilter"
                  />
                </transition-group>
              </draggable>
            </div>
          </el-popover>
        </span> -->
      </div>

    </el-col>
  </el-row>
</template>

<script>
import {mapState} from "vuex";
import FilterItem from '@/views/chart/components/drag-item/FilterItem.vue'

export default {
  name: 'FilterControl',
  props: {
    widget: {
      type: Object,
      default: null
    },
    controlAttrs: {
      type: Object,
      default: null
    },

    childViews: {
      type: Object,
      default: () => {}
    },
    element: {
      type: Object,
      default: null
    }
  },
  components: { FilterItem },
  data() {
    return {
      attrs: null,
      titlePopovervisible: false,
      popovervisible: false,
      filterVisible: false,
      param: {
        type: 'filter'
      }
    }
  },

  created() {
    // console.log('filtercontrol,,,',this.childViews);
    this.attrs = this.controlAttrs
  },
  methods: {
    multipleChange(value) {
      this.fillAttrs2Filter()
    },
    checkedViewsChange(values) {
      this.fillAttrs2Filter()
    },
    enableRangeChange(value) {
      if (!value) {
        this.attrs.viewIds = []
      }
      this.fillAttrs2Filter()
    },
    showTitleChange(value) {
      if (!value) {
        this.attrs.title = ''
        this.element.style.backgroundColor = ''
      }
      this.fillAttrs2Filter()
    },
    showFilterChange(value) {
      if (!value) {
        this.attrs.filterItems = []
      }
    },

    fillAttrs2Filter() {},

    addCustomFilter(e) {
      this.dragMoveDuplicate(this.attrs.filterItems,e)
    },
    dragMoveDuplicate(list,e,mode) {
      console.log('dragMove:::::',list,e,mode)
    }

  }
}

</script>

<style lang="scss" scoped>
  .filter-options-left {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 50px;
  }

  .filter-options-right {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: nowrap;
    height: 50px;
  }

  .i-filter {
    text-align: center;
    margin-left: 5px;
    margin-top: 1px;
  }

  .i-filter-inactive {
    color: #9ea6b2 !important;
    cursor: not-allowed !important;
  }

  .i-filter-active {
    cursor: pointer !important;
  }

  .view-container-class {

    min-height: 150px;
    max-height: 200px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
    position: relative;

  }

  .span-div {
    width: 135px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .blackTheme .theme-drag {
    background-color: var(--MainBG, #fff);
  }

  .draggable-group {
    display: block;
    width: 100%;
    height: calc(100% - 6px);
  }

</style>

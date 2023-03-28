<template>
  <el-row v-loading="loading" style="height: 100%;overflow-y: hidden;width: 100%;border-left: 1px solid #E6E6E6">
    <!-- <el-row style="height: 40px;" class="padding-lr">
      <el-button type="warning" round size="mini" :disabled="!hasEdit" @click="reset">
        {{ $t('chart.recover') }}
      </el-button>
    </el-row> -->
    <el-row class="view-panel-row">
      <el-tabs :stretch="true" class="tab-header">
        <!-- 数据 -->
        <el-tab-pane :label="$t('chart.chart_data')" class="padding-tab" style="width: 300px">
          <el-row class="view-panel">
            <el-col class="theme-border-class" :span="12" style="border-right: 1px solid #E6E6E6;">
              <div style="display: flex;align-items: center;justify-content: center;padding: 6px;">
                <el-input
                  v-model="searchField"
                  size="mini"
                  :placeholder="$t('chart.search')"
                  prefix-icon="el-icon-search"
                  clearable
                  class="main-area-input"
                />
                <el-button
                  :title="$t('dataset.edit_field')"
                  :disabled="!table"
                  icon="el-icon-setting"
                  type="text"
                  size="mini"
                  style="float: right;width: 20px;margin-left: 4px;"
                  @click="editField"
                />
                <el-button
                  :title="$t('chart.change_ds')"
                  icon="el-icon-refresh"
                  type="text"
                  size="mini"
                  style="float: right;width: 20px;margin-left: 4px;"
                  @click="changeDs"
                />
              </div>
              <!-- 维度 -->
              <div class="padding-lr field-height">
                <span>{{ $t('chart.dimension') }}</span>
                <draggable
                  v-if="table"
                  v-model="dimensionData"
                  :options="{group:{name: 'drag',pull:'clone'},sort: true}"
                  animation="300"
                  :move="onMove"
                  class="drag-list"
                  @add="moveToDimension"
                >
                  <transition-group>
                    <span v-for="item in dimensionData" :key="item.id" class="item-dimension" :title="item.name">
                      <svg-icon v-if="item.deType === 0" icon-class="field_text" class="field-icon-text" />
                      <svg-icon v-if="item.deType === 1" icon-class="field_time" class="field-icon-time" />
                      <svg-icon
                        v-if="item.deType === 2 || item.deType === 3"
                        icon-class="field_value"
                        class="field-icon-value"
                      />
                      <svg-icon v-if="item.deType === 5" icon-class="field_location" class="field-icon-location" />
                      {{ item.name }}
                    </span>
                  </transition-group>
                </draggable>
              </div>
              <!-- 指标 -->
              <div class="padding-lr field-height">
                <span>{{ $t('chart.quota') }}</span>
                <draggable
                  v-if="table"
                  v-model="quotaData"
                  :options="{group:{name: 'drag',pull:'clone'},sort: true}"
                  animation="300"
                  :move="onMove"
                  class="drag-list"
                  @add="moveToQuota"
                >
                  <transition-group>
                    <span
                      v-for="item in quotaData"
                      :key="item.id"
                      class="item-quota"
                      :title="item.name"
                    >
                      <svg-icon v-if="item.deType === 0" icon-class="field_text" class="field-icon-text" />
                      <svg-icon v-if="item.deType === 1" icon-class="field_time" class="field-icon-time" />
                      <svg-icon
                        v-if="item.deType === 2 || item.deType === 3"
                        icon-class="field_value"
                        class="field-icon-value"
                      />
                      <svg-icon v-if="item.deType === 5" icon-class="field_location" class="field-icon-location" />
                      <span>{{ item.name }}</span>
                    </span>
                  </transition-group>
                </draggable>
              </div>
            </el-col>

            <el-col
              :span="12"
              style="height: 100%;border-right: 1px solid #E6E6E6;"
              class="theme-border-class"
            > 
              <div style="height: 60px;overflow:auto" class="padding-lr theme-border-class">
                <span class="theme-border-class">
                  <span>{{ $t('chart.chart_type') }}</span>
                  <el-row style="padding: 4px 0 4px 10px;">
                    <span>
                      <svg-icon :icon-class="view.isPlugin && view.type && view.type !== 'buddle-map' ? ('/api/pluginCommon/staticInfo/' + view.type + '/svg') : view.type" class="chart-icon" />
                    </span>
                  </el-row>
                </span>
              </div>
              <div style="overflow:auto;border-top: 1px solid #e6e6e6" class="attr-style theme-border-class">
                <el-row style="height: 100%;">
                  
                  <plugin-com
                    v-if="view.isPlugin"
                    :component-name="view.type + '-data'"
                    :obj="{view, param, chart, dimensionData, quotaData}"
                  />
                  <div v-else>

                    <!--xAxis-->
                    <el-row
                      class="padding-lr"
                    >
                      <span style="width: 80px;text-align: right;">
                        <span>
                          {{$t('chart.drag_block_table_data_column')}}
                          /{{ $t('chart.dimension') }}
                        </span>
                      </span>
                      <draggable
                        v-model="view.xaxis"
                        group="drag"
                        animation="300"
                        :move="onMove"
                        class="drag-block-style"
                        @add="addXaxis"
                        @update="calcData(true)"
                      >
                        <transition-group class="draggable-group">
                          <dimension-item
                            v-for="(item,index) in view.xaxis"
                            :key="item.id"
                            :param="param"
                            :index="index"
                            :item="item"
                            :dimension-data="dimension"
                            :quota-data="quota"
                            @onDimensionItemChange="dimensionItemChange"
                            @onDimensionItemRemove="dimensionItemRemove"
                            @editItemFilter="showDimensionEditFilter"
                            @onNameEdit="showRename"
                          />
                        </transition-group>
                      </draggable>
                      <div v-if="!view.xaxis || view.xaxis.length === 0" class="drag-placeholder-style">
                        <span class="drag-placeholder-style-span">{{ $t('chart.placeholder_field') }}</span>
                      </div>
                    </el-row>
                    <!--yaxis-->
                    <el-row
                      class="padding-lr"
                      style="margin-top: 6px;"
                    >
                      <span style="width: 80px;text-align: right;">
                        <span>{{
                          $t('chart.drag_block_table_data_column')
                        }}</span>
                        /
                        <span>{{ $t('chart.quota') }}</span>
                      </span>
                      <draggable
                        v-model="view.yaxis"
                        group="drag"
                        animation="300"
                        :move="onMove"
                        class="drag-block-style"
                        @add="addYaxis"
                        @update="calcData(true)"
                      >
                        <transition-group class="draggable-group">
                          <quota-item
                            v-for="(item,index) in view.yaxis"
                            :key="item.id"
                            :param="param"
                            :index="index"
                            :item="item"
                            :chart="chart"
                            :dimension-data="dimension"
                            :quota-data="quota"
                            @onQuotaItemChange="quotaItemChange"
                            @onQuotaItemRemove="quotaItemRemove"
                            @editItemFilter="showQuotaEditFilter"
                            @onNameEdit="showRename"
                            @editItemCompare="showQuotaEditCompare"
                          />
                        </transition-group>
                      </draggable>
                      <div v-if="!view.yaxis || view.yaxis.length === 0" class="drag-placeholder-style">
                        <span class="drag-placeholder-style-span">{{ $t('chart.placeholder_field') }}</span>
                      </div>
                    </el-row>
                  </div>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 样式 -->
        <el-tab-pane :label="$t('chart.chart_style')" class="padding-tab" style="width: 300px">
          <el-row class="view-panel">
            <plugin-com
              v-if="view.isPlugin"
              style="overflow:auto;border-right: 1px solid #e6e6e6;height: 100%;width: 100%;"
              class="attr-style theme-border-class"
              :component-name="view.type + '-style'"
              :obj="{view, param, chart}"
            />
            <div
              v-else
              style="overflow:auto;border-right: 1px solid #e6e6e6;height: 100%;width: 100%;padding-right: 6px"
              class="attr-style theme-border-class"
            >
              <el-row>
                <span class="padding-lr">{{ $t('chart.shape_attr') }}</span>
                <el-collapse v-model="attrActiveNames" class="style-collapse">
                  <el-collapse-item  name="color" :title="$t('chart.color')">
                    <color-selector :param="param" class="attr-selector" :chart="chart" @onColorChange="onColorChange" />
                  </el-collapse-item>
                  
                  <el-collapse-item
                    name="size"
                    :title="$t('chart.table_config')"
                  >
                    <size-selector-ant-v
                      :param="param"
                      class="attr-selector"
                      :chart="chart"
                      @onSizeChange="onSizeChange"
                    />
                  </el-collapse-item>
                  
                  <el-collapse-item v-show="view.type" name="title" :title="$t('chart.title')">
                    <title-selector-ant-v
                      :param="param"
                      class="attr-selector"
                      :chart="chart"
                      @onTextChange="onTextChange"
                    />
                  </el-collapse-item>
                </el-collapse>
              </el-row>
            </div>
          </el-row>
        </el-tab-pane>
        <!-- 高级 -->
        <el-tab-pane :label="$t('chart.senior')" class="padding-tab" style="width: 300px;">
          <el-row class="view-panel">
            <div class="no-senior">
              {{ $t('chart.chart_no_senior') }}
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>

    <!--显示名修改-->
    <el-dialog v-dialogDrag :title="$t('chart.show_name_set')" :visible="renameItem" :show-close="false" width="30%">
      <el-form ref="itemForm" :model="itemForm" :rules="itemFormRules">
        <el-form-item :label="$t('commons.name')" prop="name">
          <el-input v-model="itemForm.name" size="mini" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeRename()">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="saveRename">{{ $t('chart.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--指标过滤器-->
    <el-dialog
      v-if="quotaFilterEdit"
      v-dialogDrag
      :title="$t('chart.add_filter')"
      :visible="quotaFilterEdit"
      :show-close="false"
      width="800px"
      class="dialog-css"
    >
      <quota-filter-editor :item="quotaItem" />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeQuotaFilter">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="saveQuotaFilter">{{ $t('chart.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="dimensionFilterEdit"
      v-dialogDrag
      :title="$t('chart.add_filter')"
      :visible="dimensionFilterEdit"
      :show-close="false"
      width="800px"
      class="dialog-css"
    >
      <dimension-filter-editor :item="dimensionItem" />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeDimensionFilter">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="saveDimensionFilter">{{ $t('chart.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="resultFilterEdit"
      v-dialogDrag
      :title="$t('chart.add_filter')"
      :visible="resultFilterEdit"
      :show-close="false"
      width="800px"
      class="dialog-css"
    >
      <result-filter-editor :chart="chartForFilter" :item="filterItem" />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeResultFilter">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="saveResultFilter">{{ $t('chart.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--视图更换数据集-->
    <el-dialog
      v-if="selectTableFlag"
      v-dialogDrag
      :title="changeDsTitle"
      :visible="selectTableFlag"
      :show-close="false"
      width="70%"
      class="dialog-css"
    >
      <table-selector @getTable="getTable" />
      <p style="margin-top: 10px;color:#F56C6C;font-size: 12px;">{{ $t('chart.change_ds_tip') }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeChangeChart">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" :disabled="!changeTable || !changeTable.id" @click="changeChart">
          {{ $t('chart.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <!--编辑视图使用的数据集的字段-->
    <el-dialog
      v-if="editDsField"
      :visible="editDsField"
      :show-close="false"
      class="dialog-css"
      :fullscreen="true"
    >
      <field-edit :param="table" :table="table" />
      <div slot="title" class="dialog-footer title-text">
        <span style="font-size: 14px;">
          {{ $t('dataset.field_manage') }}
          <span v-if="table">[{{ table.name }}]</span>
        </span>
        <el-button size="mini" style="float: right;" @click="closeEditDsField">{{ $t('chart.close') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      v-if="showEditQuotaCompare"
      v-dialogDrag
      :title="$t('chart.yoy_setting')"
      :visible="showEditQuotaCompare"
      :show-close="false"
      width="600px"
      class="dialog-css"
    >
      <compare-edit :compare-item="quotaItemCompare" :chart="chart" />
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="closeQuotaEditCompare">{{ $t('chart.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="saveQuotaEditCompare">{{ $t('chart.confirm') }}</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import {
  ajaxGetDataOnly,
  post,
  getChartDetails,
  save2Cache,
  resetViewCacheCallBack
} from '@/api/chart/chart'
import DimensionItem from '@/views/chart/components/drag-item/DimensionItem'
import QuotaItem from '@/views/chart/components/drag-item/QuotaItem'
import FilterItem from '@/views/chart/components/drag-item/FilterItem'
import ChartDragItem from '@/views/chart/components/drag-item/ChartDragItem'
import DrillItem from '@/views/chart/components/drag-item/DrillItem'
import ResultFilterEditor from '@/views/chart/components/filter/ResultFilterEditor'
import ChartComponent from '@/views/chart/components/ChartComponent'
import DrillPath from '@/views/chart/view/DrillPath'
import bus from '@/utils/bus'
import DatasetChartDetail from '@/views/dataset/common/DatasetChartDetail'
// shape attr,component style
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_COLOR_CASE,
  DEFAULT_FUNCTION_CFG,
  DEFAULT_LABEL,
  DEFAULT_LEGEND_STYLE,
  DEFAULT_SIZE,
  DEFAULT_SPLIT,
  DEFAULT_THRESHOLD,
  DEFAULT_TITLE_STYLE,
  DEFAULT_TOOLTIP,
  DEFAULT_TOTAL,
  DEFAULT_XAXIS_STYLE,
  DEFAULT_YAXIS_EXT_STYLE,
  DEFAULT_YAXIS_STYLE,
  DEFAULT_ZAXIS_STYLE
} from '@/views/chart/chart/chart'
import ColorSelector from '@/views/chart/components/shape-attr/ColorSelector'
import QuotaFilterEditor from '@/views/chart/components/filter/QuotaFilterEditor'
import DimensionFilterEditor from '@/views/chart/components/filter/DimensionFilterEditor'
import TableNormal from '@/views/chart/components/table/TableNormal'
import LabelNormal from '@/views/chart/components/normal/LabelNormal'
// import html2canvas from 'html2canvasde'
import TableSelector from '@/views/chart/view/TableSelector'
import FieldEdit from '@/views/dataset/data/FieldEdit'
import { areaMapping } from '@/api/map/map'
import QuotaExtItem from '@/views/chart/components/drag-item/QuotaExtItem'
import ChartComponentG2 from '@/views/chart/components/ChartComponentG2'
import ChartType from '@/views/chart/view/ChartType'

import TitleSelectorAntV from '@/views/chart/components/component-style/TitleSelectorAntV'

import SizeSelectorAntV from '@/views/chart/components/shape-attr/SizeSelectorAntV'

import CompareEdit from '@/views/chart/components/compare/CompareEdit'
import { compareItem } from '@/views/chart/chart/compare'
import ChartComponentS2 from '@/views/chart/components/ChartComponentS2'
import DimensionExtItem from '@/views/chart/components/drag-item/DimensionExtItem'
import PluginCom from '@/views/system/plugin/PluginCom'
import { mapState } from 'vuex'

import FunctionCfg from '@/views/chart/components/senior/FunctionCfg'
import AssistLine from '@/views/chart/components/senior/AssistLine'
import Threshold from '@/views/chart/components/senior/Threshold'
import TotalCfg from '@/views/chart/components/shape-attr/TotalCfg'
import LabelNormalText from '@/views/chart/components/normal/LabelNormalText'
import { pluginTypes } from '@/api/chart/chart'
// import ArcGIS from "@/map/init.js"
// const Map = new ArcGIS()
export default {
  name: 'assistChart',
  components: {
    LabelNormalText,
    TotalCfg,
    Threshold,
    AssistLine,
    FunctionCfg,
    DimensionExtItem,
    ChartComponentS2,
    CompareEdit,
    ChartType,
    ChartComponentG2,
    QuotaExtItem,
    FilterItem,
    FieldEdit,
    TableSelector,
    ResultFilterEditor,
    LabelNormal,
    DimensionFilterEditor,
    TableNormal,
    TitleSelectorAntV,
    SizeSelectorAntV,
    DatasetChartDetail,
    QuotaFilterEditor,
    ColorSelector,
    ChartComponent,
    QuotaItem,
    DimensionItem,
    ChartDragItem,
    DrillItem,
    DrillPath,
    PluginCom
  },
  props: {
    param: {
      type: Object,
      required: true
    },
    editFrom: {
      type: String,
      required: false,
      default: 'view'
    },
    chart: {
      type: Object,
      required: true
    },
    tableData: {
      type: Object,
      required: true
    },
    typeTitle: {
      type: String,
      required: false,
      default: '新增'
    }
  },
  data() {
    return {
      loading: false,
      table: {},
      dimension: [],
      quota: [],
      dimensionData: [],
      quotaData: [],
      view: {
        xaxis: [],
        xaxisExt: [],
        yaxis: [],
        yaxisExt: [],
        extStack: [],
        drillFields: [],
        extBubble: [],
        zaxis: [],
        show: true,
        type: 'table-normal',
        title: '',
        customAttr: {
          color: DEFAULT_COLOR_CASE,
          size: DEFAULT_SIZE,
          label: DEFAULT_LABEL,
          tooltip: DEFAULT_TOOLTIP,
          totalCfg: DEFAULT_TOTAL
        },
        customStyle: {
          text: DEFAULT_TITLE_STYLE,
          legend: DEFAULT_LEGEND_STYLE,
          xAxis: DEFAULT_XAXIS_STYLE,
          yAxis: DEFAULT_YAXIS_STYLE,
          yAxisExt: DEFAULT_YAXIS_EXT_STYLE,
          zAxis: DEFAULT_ZAXIS_STYLE,
          background: DEFAULT_BACKGROUND_COLOR,
          split: DEFAULT_SPLIT
        },
        senior: {
          functionCfg: DEFAULT_FUNCTION_CFG,
          assistLine: [],
          threshold: DEFAULT_THRESHOLD
        },
        customFilter: [],
        render: 'antv',
        isPlugin: false,
        file: '',
        urlMap: ''
      },
      urlMap1: '',
      moveId: -1,
      dimensionFilterEdit: false,
      dimensionItem: {},
      quotaFilterEdit: false,
      quotaItem: {},
      resultFilterEdit: false,
      chartForFilter: {},
      renameItem: false,
      itemForm: {
        name: ''
      },
      itemFormRules: {
        name: [
          { required: true, message: this.$t('commons.input_content'), trigger: 'change' },
          { max: 50, message: this.$t('commons.char_can_not_more_50'), trigger: 'change' }
        ]
      },
      tabStatus: false,
      data: {},
      httpRequest: {
        status: true,
        msg: ''
      },
      selectTableFlag: false,
      changeTable: {},
      searchField: '',
      editDsField: false,
      changeDsTitle: '',
      filterItem: {},
      places: [],
      attrActiveNames: [],
      styleActiveNames: [],
      drillClickDimensionList: [],
      drillFilters: [],
      renderOptions: [
        { name: 'AntV', value: 'antv' },
        { name: 'ECharts', value: 'echarts' },
        { name: 'HighCharts', value: 'highcharts' }
      ],
      drill: false,
      hasEdit: false,
      quotaItemCompare: {},
      showEditQuotaCompare: false,
      preChartId: '',
      pluginRenderOptions: []

    }
  },
  computed: {
    
  },
  watch: {
    searchField(val) {
      this.fieldFilter(val)
    },
  },
  created() {
    
  },
  mounted() {
    console.log('param',this.param)
    console.log('editFrom',this.editFrom)
    console.log('chart',this.chart)
    console.log('tableData',this.tableData)
    this.initTableField()
    this.initField()
  },
  activated() {
  },

  methods: {
    initField() {
      if(this.typeTitle === '修改') {
        this.view.xaxis = JSON.parse(this.chart.xaxis)
        this.view.yaxis = JSON.parse(this.chart.yaxis)
      }
    },
    // 获取表字段拖拽数据
    initTableField(id) {
      if (this.tableData) {
        post('/dataset/table/getFieldsFromDE', this.tableData).then(response => {
          console.log('维度指标数据',response)
          this.dimension = response.data.dimension
          this.quota = response.data.quota
          this.dimensionData = JSON.parse(JSON.stringify(this.dimension))
          this.quotaData = JSON.parse(JSON.stringify(this.quota))
          this.fieldFilter(this.searchField)
        }).catch(err => {
          this.resetView()
          this.httpRequest.status = err.response.data.success
          this.httpRequest.msg = err.response.data.message
          return true
        })
      } else {
        this.resetDatasetField()
      }
    },
    fieldFilter(val) {
      if (val && val !== '') {
        this.dimensionData = JSON.parse(JSON.stringify(this.dimension.filter(ele => {
          return ele.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        })))
        this.quotaData = JSON.parse(JSON.stringify(this.quota.filter(ele => {
          return ele.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        })))
      } else {
        this.dimensionData = JSON.parse(JSON.stringify(this.dimension))
        this.quotaData = JSON.parse(JSON.stringify(this.quota))
      }
    },
    resetView() {
      this.resetDatasetField()
      this.view = {
        xAxis: [],
        yAxis: [],
        zAxis: [],
        type: ''
      }
    },
    editField() {
      this.editDsField = true
    },
    changeDs() {
      // const dialogTitle = (this.table && this.table.name) ? ('[' + this.table.name + ']') : ''
      // this.changeDsTitle = this.$t('chart.change_ds') + dialogTitle
      // this.selectTableFlag = true
    },
    // move回调方法
    onMove(e, originalEvent) {
      console.log('拖动', e)
      this.moveId = e.draggedContext.element.id
      return true
    },
    moveToDimension(e) {
      console.log('moveToDimension:::::::::::', e)
      this.dragMoveDuplicate(this.dimensionData, e, 'ds')
      this.calcData(true)
    },
    moveToQuota(e) {
      this.dragMoveDuplicate(this.quotaData, e, 'ds')
      this.calcData(true)
    },
    addXaxis(e) {
      if (this.view.type !== 'table-info') {
        this.dragCheckType(this.view.xaxis, 'd')
      }
      this.dragMoveDuplicate(this.view.xaxis, e)
      this.calcData(true)
    },
    addYaxis(e) {
      this.dragCheckType(this.view.yaxis, 'q')
      this.dragMoveDuplicate(this.view.yaxis, e)
      this.calcData(true)
    },
    // drag
    dragCheckType(list, type) {
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].groupType !== type) {
            list.splice(i, 1)
          }
        }
      }
    },
    dragMoveDuplicate(list, e, mode) {
      console.log('dragMoveDuplicate::::::::::', list, e, mode)
      if (mode === 'ds') {
        list.splice(e.newDraggableIndex, 1)
      } else {
        const that = this
        const dup = list.filter(function(m) {
          return m.id === that.moveId
        })
        if (dup && dup.length > 1) {
          list.splice(e.newDraggableIndex, 1)
        }
      }
    },
    calcData(getData, trigger, needRefreshGroup = false, switchType = false) {
      const view = this.buildParam(true, 'chart', false, switchType)
      console.log('calcData：', view)
      if (!view) return
      bus.$emit('view-in-chart',{type: 'propData',viewInfo: view})
    },
    buildParam(getData, trigger, needRefreshGroup = false, switchType = false) {
      if (!this.view.resultCount ||
        this.view.resultCount === '' ||
        isNaN(Number(this.view.resultCount)) ||
        String(this.view.resultCount).includes('.') ||
        parseInt(this.view.resultCount) < 1) {
        this.view.resultCount = '1000'
      }

      if (switchType && (this.view.type === 'table-info' || this.chart.type === 'table-info') && this.view.xaxis.length > 0) {
        this.$message({
          showClose: true,
          message: this.$t('chart.table_info_switch'),
          type: 'warning'
        })
        this.view.xaxis = []
      }

      const view = JSON.parse(JSON.stringify(this.view))
      view.id = this.chart.id
      view.sceneId = this.chart.sceneId
      view.name = this.chart.title ? this.chart.title : this.tableData.name
      view.title = this.chart.title ? this.chart.title : this.tableData.name
      
      view.tableId = this.chart.tableId

      view.xaxis.forEach(function(ele) {
        // if (!ele.summary || ele.summary === '') {
        //   ele.summary = 'sum'
        // }
        if (!ele.dateStyle || ele.dateStyle === '') {
          ele.dateStyle = 'y_M_d'
        }
        if (!ele.datePattern || ele.datePattern === '') {
          ele.datePattern = 'date_sub'
        }
        if (!ele.sort || ele.sort === '') {
          ele.sort = 'none'
        }
        if (!ele.filter) {
          ele.filter = []
        }
      })

      view.yaxis.forEach(function(ele) {
        if (!ele.chartType) {
          ele.chartType = 'bar'
        }
        if (!ele.summary || ele.summary === '') {
          if (ele.id === 'count' || ele.deType === 0 || ele.deType === 1) {
            ele.summary = 'count'
          } else {
            ele.summary = 'sum'
          }
        }
        if (!ele.sort || ele.sort === '') {
          ele.sort = 'none'
        }
        if (!ele.filter) {
          ele.filter = []
        }
        if (!ele.compareCalc) {
          ele.compareCalc = compareItem
        }
      })

      this.chart = JSON.parse(JSON.stringify(view))
      this.view = JSON.parse(JSON.stringify(view))

      view.xaxis = JSON.stringify(view.xaxis)
      view.xaxisExt = JSON.stringify(view.xaxisExt)
      view.yaxis = JSON.stringify(view.yaxis)
      view.zaxis = JSON.stringify(view.zaxis)
      view.yaxisExt = JSON.stringify(view.yaxisExt)
      view.customAttr = JSON.stringify(view.customAttr)
      view.customStyle = JSON.stringify(view.customStyle)
      view.customFilter = JSON.stringify(view.customFilter)
      view.extStack = JSON.stringify(view.extStack)
      view.drillFields = JSON.stringify(view.drillFields)
      view.extBubble = JSON.stringify(view.extBubble)
      view.senior = JSON.stringify(view.senior)
      console.log('buildParam：', view)
      delete view.data
      return view
    },
    calcStyle() {
      // 将视图传入echart...组件
      // console.log('calcStyle::::::>>>>>',this.view)
      const view = JSON.parse(JSON.stringify(this.view))
      view.xaxis = JSON.stringify(this.view.xaxis)
      view.xaxisExt = JSON.stringify(this.view.xaxisExt)
      view.yaxis = JSON.stringify(this.view.yaxis)
      view.yaxisExt = JSON.stringify(this.view.yaxisExt)
      view.zaxis = JSON.stringify(this.view.zaxis)
      view.extStack = JSON.stringify(this.view.extStack)
      view.drillFields = JSON.stringify(this.view.drillFields)
      view.extBubble = JSON.stringify(this.view.extBubble)
      view.customAttr = JSON.stringify(this.view.customAttr)
      view.customStyle = JSON.stringify(this.view.customStyle)
      view.customFilter = JSON.stringify(this.view.customFilter)
      view.senior = JSON.stringify(this.view.senior)
      view.title = this.view.title
      view.stylePriority = this.view.stylePriority
      // view.data = this.data
      this.chart = view
      console.log('calcStyle,,,,', view)
      // 保存到缓存表
      const viewSave = this.buildParam(true, 'chart', false, false)
     
      if (!viewSave) return
      
      bus.$emit('view-in-chart', {type: 'propStyle',viewInfo: view})
    },
    dimensionItemChange(item) {
      this.calcData(true)
    },
    dimensionItemRemove(item) {
      if (item.removeType === 'dimension') {
        this.view.xaxis.splice(item.index, 1)
      } else if (item.removeType === 'dimensionExt') {
        this.view.xaxisExt.splice(item.index, 1)
      }
      this.calcData(true)
    },
    showDimensionEditFilter(item) {
      this.dimensionItem = JSON.parse(JSON.stringify(item))
      this.dimensionFilterEdit = true
    },
    showRename(val) {
      this.itemForm = JSON.parse(JSON.stringify(val))
      this.renameItem = true
    },
    quotaItemChange(item) {
      this.calcData(true)
    },
    quotaItemRemove(item) {
      if (item.removeType === 'quota') {
        this.view.yaxis.splice(item.index, 1)
      } else if (item.removeType === 'quotaExt') {
        this.view.yaxisExt.splice(item.index, 1)
      }
      this.calcData(true)
    },
    showQuotaEditFilter(item) {
      this.quotaItem = JSON.parse(JSON.stringify(item))
      if (!this.quotaItem.logic) {
        this.quotaItem.logic = 'and'
      }
      this.quotaFilterEdit = true
    },
    showQuotaEditCompare(item) {
      this.quotaItemCompare = JSON.parse(JSON.stringify(item))
      this.showEditQuotaCompare = true
    },
    saveRename() {
      this.$refs['itemForm'].validate((valid) => {
        if (valid) {
          if (this.itemForm.renameType === 'quota') {
            this.view.yaxis[this.itemForm.index].name = this.itemForm.name
          } else if (this.itemForm.renameType === 'dimension') {
            this.view.xaxis[this.itemForm.index].name = this.itemForm.name
          } else if (this.itemForm.renameType === 'quotaExt') {
            this.view.yaxisExt[this.itemForm.index].name = this.itemForm.name
          } else if (this.itemForm.renameType === 'dimensionExt') {
            this.view.xaxisExt[this.itemForm.index].name = this.itemForm.name
          }
          //  else if (this.itemForm.renameType === '') {
          //   this.view.zaxis[this.itemForm.index].name = this.itemForm.name
          // }
          this.calcData(true)
          this.closeRename()
        } else {
          return false
        }
      })
    },
    closeRename() {
      this.renameItem = false
    },
    onColorChange(val) {
      console.log('val: ', val)
      this.view.customAttr.color = val
      this.calcStyle()
    },
    onSizeChange(val) {
      console.log('12121212----------------', val)
      this.view.customAttr.size = val
      this.calcStyle()
    },
    onTextChange(val) {
      this.view.customStyle.text = val
      this.view.title = val.title
      this.calcStyle()
    },
  }
}
</script>

<style lang='scss' scoped>
.padding-lr {
  padding: 0 6px;
}

.itxst {
  margin: 10px;
  text-align: left;
}

.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}

.col + .col {
  margin-left: 10px;
}

.view-panel-row {
  display: flex;
  background-color: #f7f8fa;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 75px);
}

.view-panel-Mask {
  display: flex;
  height: calc(100vh - 60px);
  background-color: #5c5e61;
  opacity: 0.7;
  position:absolute;
  top:0px;
  left: 0px;
  width: 300px;
  z-index: 2;
  cursor:not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-panel {
  display: flex;
  height: calc(100% - 80px);
  background-color: #f7f8fa;
}

.blackTheme .view-panel {
  background-color: var(--MainBG);
}

.drag-list {
  height: calc(100% - 26px);
  overflow: auto;
}

.item-dimension {
  padding: 2px 10px;
  margin: 2px 2px 0 2px;
  border: solid 1px #eee;
  text-align: left;
  color: #606266;
  /*background-color: rgba(35,46,64,.05);*/
  background-color: white;
  display: block;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.blackTheme .item-dimension {
  border: solid 1px;
  border-color: var(--TableBorderColor);
  color: var(--TextPrimary);
  background-color: var(--MainBG);
}

.item-dimension + .item-dimension {
  margin-top: 2px;
}

.item-dimension:hover {
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  cursor: pointer;
}

.blackTheme .item-dimension:hover {
  color: var(--Main);
  background: var(--ContentBG);
  cursor: pointer;
}

.item-quota {
  padding: 2px 10px;
  margin: 2px 2px 0 2px;
  border: solid 1px #eee;
  text-align: left;
  color: #606266;
  background-color: white;
  display: block;
  word-break: break-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.blackTheme .item-quota {
  border: solid 1px;
  border-color: var(--TableBorderColor);
  color: var(--TextPrimary);
  background-color: var(--MainBG);
}

.item-quota + .item-quota {
  margin-top: 2px;
}

.item-quota:hover {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #b2d3a3;
  cursor: pointer;
}

.blackTheme .item-quota:hover {
  background: var(--ContentBG);
}

.el-form-item {
  margin-bottom: 0;
}

span {
  font-size: 12px;
}

.tab-header ::v-deep .el-tabs__header {
  border-top: solid 1px #eee;
  border-right: solid 1px #eee;
}

.tab-header ::v-deep .el-tabs__item {
  font-size: 12px;
  padding: 0 20px !important;
}

.blackTheme .tab-header ::v-deep .el-tabs__item {
  background-color: var(--MainBG);
}

.tab-header ::v-deep .el-tabs__nav-scroll {
  padding-left: 0 !important;
}

.tab-header ::v-deep .el-tabs__header {
  margin: 0 !important;
}

.tab-header ::v-deep .el-tabs__content {
}

.draggable-group {
  display: block;
  width: 100%;
  height: calc(100% - 6px);
}

.chart-icon {
  width: 20px;
  height: 20px;
}

.el-radio {
  margin: 5px;
}

.el-radio ::v-deep .el-radio__label {
  padding-left: 0;
}

.attr-style {
  height: calc(100vh - 56px - 60px - 40px - 40px);
}

.blackTheme .attr-style {
  color: var(--TextPrimary);
}

.attr-selector {
  width: 100%;
  height: 100%;
  margin: 6px 0;
  padding: 0 4px;
  display: flex;
  align-items: center;
  background-color: white
}

.blackTheme .attr-selector {

  background-color: var(--MainBG)
}

.disabled-none-cursor {
  cursor: not-allowed;
  pointer-events: none;
}

.chart-class {
  height: 100%;
  padding: 10px;
}

.table-class {
  height: calc(100% - 20px);
}

.dialog-css ::v-deep .el-dialog__title {
  font-size: 14px;
}

.dialog-css ::v-deep .el-dialog__header {
  padding: 20px 20px 0;
}

.dialog-css ::v-deep .el-dialog__body {
  padding: 10px 20px 20px;
}

.filter-btn-class {
  padding: 6px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-error-class {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ece7e7;
}

.blackTheme .chart-error-class {

  background-color: var(--MainBG)
}

.field-height {
  height: calc(50% - 20px);
  border-top: 1px solid #E6E6E6;
}

.blackTheme .field-height {

  border-top: 1px solid;
  border-color: var(--TableBorderColor) !important;
}

.padding-tab {
  padding: 0;
  height: 100%;
}

.tree-select-span {
  ::v-deep div.vue-treeselect__control {
    height: 32px !important;
    font-weight: normal !important;
  }
}

.drag-block-style {
  padding: 2px 0 0 0;
  width: 100%;
  min-height: 32px;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  background-color: white;
}

.blackTheme .drag-block-style {
  border: 1px solid;
  border-color: var(--TableBorderColor);
  background-color: var(--ContentBG);
}

.drag-placeholder-style {
  position: absolute;
  top: calc(50% - 2px);
  left: 0;
  width: 100%;
  color: #CCCCCC;
}

.blackTheme .drag-placeholder-style {
  color: var(--TextPrimary);
}

.drag-placeholder-style-span {
  padding-left: 16px;
}

.blackTheme .theme-border-class {
  color: var(--TextPrimary) !important;
  background-color: var(--ContentBG);
}

.blackTheme .padding-lr {
  border-color: var(--TableBorderColor) !important;
}

.blackTheme .theme-item-class {
  background-color: var(--MainBG) !important;
  border-color: var(--TableBorderColor) !important;
}

.icon-class {
  color: #6c6c6c;
}

.blackTheme .icon-class {
  color: #cccccc;
}

.result-count {
  width: 80px;
}

.result-count ::v-deep input {
  padding: 0 4px;
}

.radio-span ::v-deep .el-radio__label {
  margin-left: 4px;
}

.view-title-name {
  display: -moz-inline-box;
  display: inline-block;
  width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 45px;
}

::v-deep .item-axis {
  width: 128px !important;
}

::v-deep .el-slider__input {
  width: 80px !important;
}

::v-deep .el-input-number--mini {
  width: 100px !important;
}

::v-deep .el-slider__runway.show-input{
  width: 80px!important;
}

.no-senior {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding-top: 40px;
  overflow: auto;
  border-right: 1px solid #e6e6e6;
  height: 100%;
}

</style>

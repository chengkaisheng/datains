<template>
  <div>
    <p style="font-size: 18px;">关联设置</p>
    <div style="margin-top: 10px;">
      <el-row>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">关联视图</el-col>
          <el-col :span="10">
            <el-select v-model="viewValue" size="small">
              <el-option
                v-for="(item,index) in componentList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
        </el-col>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">字体颜色</el-col>
          <el-col :span="2">
            <el-color-picker v-model="curComponent.options.fontColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
          </el-col>
        </el-col>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">字体大小</el-col>
          <el-col :span="10">
            <el-select v-model="curComponent.options.fontSize" :placeholder="$t('chart.text_fontsize')" size="small">
              <el-option v-for="option in fontSize" :key="option.value" :label="option.name" :value="option.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">名称宽度(%)</el-col>
          <el-col :span="18">
            <el-input-number v-model="curComponent.options.nameWidth" :min="1" :max="100" size="mini" style="width: 100px;margin-right: 10px;" />
          </el-col>
        </el-col>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">内容宽度(%)</el-col>
          <el-col :span="18">
            <el-input-number v-model="curComponent.options.valueWidth" :min="1" :max="100" size="mini" style="width: 100px;margin-right: 10px;" />
          </el-col>
        </el-col>
        <el-col style="margin-bottom: 10px;">
          <el-col :span="4">图片高度(px)</el-col>
          <el-col :span="18">
            <el-input-number v-model="curComponent.options.imgHeight" :min="50" :max="500" size="mini" style="width: 100px;margin-right: 10px;" />
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-row class="root-class">
      <el-col :span="24">
        <el-button size="mini" @click="cancel()">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="save()">{{ $t('commons.confirm') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { viewData } from '@/api/panel/panel'
import { viewInfo } from '@/api/link'
import { getToken, getLinkToken } from '@/utils/auth'
import { COLOR_PANEL } from '@/views/chart/chart/chart'

export default {
  name: 'TextInfoSet',
  props: {
    element: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      componentList: [],
      viewValue: '',
      predefineColors: COLOR_PANEL,
      fontSize: []
    }
  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData',
      'detailsViews'
    ]),
    panelInfo() {
      return this.$store.state.panel.panelInfo
    }
  },
  mounted() {
    this.init()
    this.setfont()
  },
  methods: {
    setfont() {
      const arr = []
      for (let i = 10; i <= 100; i = i + 2) {
        arr.push({
          name: i + '',
          value: i + ''
        })
      }
      this.fontSize = arr
    },
    init() {
      const tabIds = this.detailsViews.map(item => { return item.id }) // 仪表板存在的滚动表格id
      const arr = []
      this.componentData.map(item => {
        if (item.component === 'user-view' && tabIds.indexOf(item.propValue.viewId) !== -1) {
          arr.push(item.propValue.viewId)
        }
      })
      // console.log('获取到的滚动表格视图id',arr)
      this.searchData(arr)
    },
    searchData(data) {
      // console.log('视图数据',data)
      let method = viewData
      const token = this.$store.getters.token || getToken()
      const linkToken = this.$store.getters.linkToken || getLinkToken()
      if (!token && linkToken) {
        method = viewInfo
      }
      const reqInfo = {
        cache: false,
        drill: [],
        filter: [],
        linkageFilters: [],
        outerParamsFilters: undefined,
        queryFrom: 'panel',
        resultCount: 1000,
        resultMode: 'all'
      }
      for (let i = 0; i < data.length; i++) {
        method(data[i], this.panelInfo.id, reqInfo).then(res => {
          if (res.data) {
            this.componentList.push({
              name: res.data.title,
              type: res.data.type,
              id: res.data.id,
              sceneId: res.data.sceneId
            })
          }

          if (this.componentList.length && this.componentList.length === data.length) {
            this.viewValue = this.curComponent.options.viewId
          }
        })
      }
    },
    save() {
      this.curComponent.options.viewId = this.viewValue
      this.$store.commit('recordSnapshot')
      this.$emit('backgroundSetClose')
    },
    cancel() {
      this.$emit('backgroundSetClose')
    }
  }

}
</script>
<style lang="scss">
.root-class {
  margin: 15px 0px 5px;
  text-align: center;
}

.text_row {
  margin: 10px 20px;

  .text_col_4 {
    text-align: center;
    font-weight: bold;
  }
}
</style>

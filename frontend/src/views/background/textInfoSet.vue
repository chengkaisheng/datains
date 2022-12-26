<template>
  <div>
    <p style="font-size: 18px;">关联设置</p>
    <div style="margin-top: 10px;">
      <el-row>
        <el-col>
          <el-col :span="6">关联视图</el-col>
          <el-col :span="18">
            <el-select v-model="viewValue">
              <el-option v-for="(item,index) in componentList" 
                :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
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

export default {
  name: 'textInfoSet',
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
    }
  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData'
    ]),
    panelInfo() {
      return this.$store.state.panel.panelInfo
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let arr = []
      this.componentData.map(item => {
        if(item.component === 'user-view') {
          arr.push(item.propValue.viewId)
        }
      })
      this.searchData(arr)
    },
    searchData(data) {
      let method = viewData
      let reqInfo = {
        cache: false,
        drill: [],
        filter: [],
        linkageFilters: [],
        outerParamsFilters: undefined,
        queryFrom: 'panel',
        resultCount: 1000,
        resultMode: 'all'
      }
      for(let i=0;i<data.length;i++) {
        method(data[i],this.panelInfo.id,reqInfo).then(res => {
          if(res.data) {
            this.componentList.push({
              name: res.data.title,
              type: res.data.type,
              id: res.data.id,
              sceneId: res.data.sceneId
            })
          }
        })
      }
      if(this.componentList.length) {
        this.viewValue = this.curComponent.options.viewId
      }
    },
    save() {
      console.log('保存')
      this.curComponent.options.viewId = this.viewValue
      this.$store.commit('recordSnapshot')
      this.$emit('backgroundSetClose')
    },
    cancel() {
      this.$emit('backgroundSetClose')
    },
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
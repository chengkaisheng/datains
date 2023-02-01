<template>
  <el-row>
    <el-row>
      <el-col :span="24">
        <span style="font-weight:600;margin-right: 20px;font-size: 14px">{{ $t('panel.component_style') }}</span>
      </el-col>
    </el-row>
    <el-row class="main-content" disabled="!curComponent.commonBackground.enable">
      <!-- 修改组件的宽高样式 -->
      <el-row style="height: 50px;overflow: hidden;margin-top:20px;">
        <el-col :span="3">
          <span class="params-title">{{ $t('panel.box_width') }}</span>
        </el-col>
        <el-col :span="8">
          <!-- <el-input v-model="curComponent.commonBackground.boxWidth" placeholder="请输入内容" /> -->
          <el-input-number v-model="curComponent.commonBackground.boxWidth" :min="0" />
        </el-col>
      </el-row>
      <el-row style="height: 50px;overflow: hidden">
        <el-col :span="3">
          <span class="params-title">{{ $t('panel.box_height') }}</span>
        </el-col>
        <el-col :span="8">
          <!-- <el-input v-model="curComponent.commonBackground.boxHeight" placeholder="请输入内容" /> -->
          <el-input-number v-model="curComponent.commonBackground.boxHeight" :min="0" />
        </el-col>
      </el-row>

      <!-- 文字轮播组件字体样式 -->
      <div v-if="this.curComponent.component === 'de-rotation' && this.curComponent.type === 'custom'">
        <el-row style="height: 50px;overflow: hidden">
          <el-col :span="3">
            <span class="params-title">{{ $t('panel.box_fontSize') }}</span>
          </el-col>
          <el-col :span="8">
            <el-input-number v-model="curComponent.commonBackground.fontSize" :min="1" />
          </el-col>
        </el-row>
        <el-row style="height: 50px;overflow: hidden">
          <el-col :span="3">
            <span class="params-title">{{ $t('panel.box_fontColor') }}</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="curComponent.commonBackground.fontColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
          </el-col>
        </el-row>
      </div>
      <el-row style="height: 50px;overflow: hidden">
        <el-col :span="3">
          <span class="params-title">{{ $t('panel.inner_padding') }}</span>
        </el-col>
        <el-col :span="15">
          <el-slider v-model="curComponent.commonBackground.innerPadding" show-input :show-input-controls="false" input-size="mini" :max="15" />
        </el-col>
      </el-row>
      <el-row style="height: 50px;overflow: hidden">
        <el-col :span="3">
          <span class="params-title">{{ $t('panel.board_radio') }}</span>
        </el-col>
        <el-col :span="15">
          <el-slider v-model="curComponent.commonBackground.borderRadius" show-input :show-input-controls="false" input-size="mini" />
        </el-col>
      </el-row>

      <el-row style="height: 50px">
        <el-col :span="3" style="padding-left: 10px;padding-top: 5px">
          <el-checkbox v-model="curComponent.commonBackground.enable">{{ $t('panel.background') }}</el-checkbox>
        </el-col>
        <el-col :span="21">
          <span style="color: #909399; font-size: 8px;margin-left: 3px;line-height: 30px">
            Tips:{{ $t('panel.choose_background_tips') }}
          </span>
        </el-col>
      </el-row>
      <el-row v-if="curComponent.commonBackground.enable">
        <el-row style="height: 40px;overflow: hidden">
          <el-col :span="3" style="padding-left: 10px;padding-top: 5px">
            <el-radio v-model="curComponent.commonBackground.backgroundType" label="color" @change="onChangeType">颜色</el-radio>
          </el-col>
          <el-col :span="1" style="padding-top: 5px">
            <el-color-picker v-model="curComponent.commonBackground.color" size="mini" class="color-picker-style" :predefine="predefineColors" />
          </el-col>
          <el-col :span="3">
            <span class="params-title-small">不透明度：</span>
          </el-col>
          <el-col :span="11">
            <el-slider v-model="curComponent.commonBackground.alpha" show-input :show-input-controls="false" input-size="mini" />
          </el-col>
        </el-row>
        <el-row style="height: 80px;margin-top:10px;margin-bottom:20px;overflow: hidden">
          <el-col :span="3" style="padding-left: 10px">
            <el-radio v-model="curComponent.commonBackground.backgroundType" label="outerImage" @change="onChangeType">{{ $t('panel.photo') }}</el-radio>
          </el-col>
          <el-col style="width: 130px!important;">
            <el-upload
              action=""
              accept=".jpeg,.jpg,.png,.gif,.svg"
              class="avatar-uploader"
              list-type="picture-card"
              :class="{disabled:uploadDisabled}"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="upload"
              :file-list="fileList"
              :on-change="onChange"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog top="25vh" width="600px" :modal-append-to-body="false" :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" style="padding-left: 10px">
            <el-radio v-model="curComponent.commonBackground.backgroundType" label="innerImage" @change="onChangeType">边框</el-radio>
          </el-col>
          <el-col :span="21" class="main-row">
            <el-row v-for="(value, key) in BackgroundShowMap" :key="key">
              <el-col :span="24"><span>{{ key }}</span> </el-col>
              <el-col
                v-for="item in value"
                :key="item.id"
                :span="6"
              >
                <background-item
                  :template="item"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

      <el-row v-if="(curComponent.component === 'de-select' || curComponent.component === 'de-input-search' || curComponent.component === 'de-select-grid') 
        && curComponent.type === 'custom'">
        <el-row >
          <el-col :span="4" style="padding-left: 10px;padding-top: 5px">
            <el-checkbox v-model="curComponent.commonSelectFrame.enable" @change="clickEnable">{{ $t('panel.selectBackground') }}</el-checkbox>
          </el-col>
          <el-col :span="20">
            <span style="color: #909399; font-size: 8px;margin-left: 3px;line-height: 30px">
              Tips:{{ $t('panel.choose_background_tips') }}
            </span>
          </el-col>
        </el-row>
        <el-row v-if="curComponent.commonSelectFrame.enable">
          <el-row style="height: 40px;overflow: hidden">
            <el-col :span="3" style="padding-left: 10px;padding-top: 5px">
              <el-radio v-model="curComponent.commonSelectFrame.backType" label="color" @change="onChangeType">颜色</el-radio>
            </el-col>
            <el-col :span="1" style="padding-top: 5px">
              <el-color-picker v-model="curComponent.commonSelectFrame.color" size="mini" class="color-picker-style" :predefine="predefineColors" />
            </el-col>
          </el-row>
          <el-row style="height: 80px;margin-top:10px;margin-bottom:20px;overflow: hidden">
            <el-col :span="3" style="padding-left: 10px">
              <el-radio v-model="curComponent.commonSelectFrame.backType" label="Image" @change="onChangeType">{{ $t('panel.photo') }}</el-radio>
            </el-col>
            <el-col style="width: 130px!important;">
              <el-upload
                action=""
                accept=".jpeg,.jpg,.png,.gif,.svg"
                class="avatar-uploader"
                list-type="picture-card"
                :class="{disabled:uploadSelDisabled}"
                :on-preview="handleSelectPreview"
                :on-remove="handleSelRemove"
                :http-request="upload"
                :file-list="fileSelList"
                :on-change="onSelChange"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog top="25vh" width="600px" :modal-append-to-body="false" :visible.sync="dialogSelVisible">
                <img width="100%" :src="dialogSelImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="4">
              <span class="params-title-small">不透明度：</span>
            </el-col>
            <el-col :span="11">
              <el-slider v-model="curComponent.commonSelectFrame.alpha" show-input :show-input-controls="false" input-size="mini" />
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="4" ><span class="params-title-small">框字体颜色：</span></el-col>
            <el-col :span="1">
              <el-color-picker v-model="curComponent.commonSelectFrame.fontColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
            </el-col>
          </el-row>
          <el-row v-if="curComponent.component === 'de-select'" style="margin-top: 10px;">
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4" ><span class="params-title-small">选项字体颜色：</span></el-col>
              <el-col :span="1">
                <el-color-picker v-model="curComponent.commonSelectFrame.checkColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="4" ><span class="params-title-small">选项背景设置：</span></el-col>
              <el-col :span="20">
                <el-col style="margin-bottom: 10px;">
                  <el-radio-group v-model="curComponent.commonSelectFrame.checkBgType" style="width: 100%;">
                    <el-col :span="10">
                      <el-radio label="color">颜色</el-radio>
                    </el-col>
                    <el-col :span="14">
                      <el-radio label="Image">图片</el-radio>
                    </el-col>
                  </el-radio-group>
                </el-col>
                <el-col>
                  <el-col :span="10">
                    <el-color-picker v-model="curComponent.commonSelectFrame.checkBgColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
                  </el-col>
                  <el-col :span="14">
                    <el-col style="width: 130px!important;">
                      <el-upload
                        action=""
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        class="avatar-uploader"
                        list-type="picture-card"
                        :class="{disabled:uploadDownDisabled}"
                        :on-preview="handleDownPreview"
                        :on-remove="handleDownRemove"
                        :http-request="upload"
                        :file-list="fileDownList"
                        :on-change="onDownChange"
                      >
                        <i class="el-icon-plus" />
                      </el-upload>
                      <el-dialog top="25vh" width="600px" :modal-append-to-body="false" :visible.sync="dialogDownVisible">
                        <img width="100%" :src="dialogDownImageUrl" alt="">
                      </el-dialog>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
          </el-row>
          <el-row v-if="curComponent.component === 'de-select-grid'" style="margin-top: 10px;">
            <el-col style="margin-bottom: 10px;">
              <el-col :span="4" ><span class="params-title-small">列表字体颜色：</span></el-col>
              <el-col :span="1">
                <el-color-picker v-model="curComponent.commonSelectFrame.panelColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
              </el-col>
            </el-col>
            <el-col>
              <el-col :span="4" ><span class="params-title-small">列表背景颜色：</span></el-col>
              <el-col :span="1">
                <el-color-picker v-model="curComponent.commonSelectFrame.panelBgColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
              </el-col>
            </el-col>
          </el-row>
        </el-row>
      </el-row>

      <el-row v-if="curComponent.component === 'de-text-info'">
        <el-row>
          <el-col :span="3" style="text-align:center;">字体颜色</el-col>
          <el-col :span="1">
            <el-color-picker v-model="curComponent.commonSelectFrame.fontColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
          </el-col>
        </el-row>
      </el-row>

      <el-row v-if="curComponent.component === 'Picture'">
        <el-row>
            <el-col :span="4">
              <span class="params-title-small">图片不透明度：</span>
            </el-col>
            <el-col :span="11">
              <el-slider v-model="curComponent.commonSelectFrame.alpha" show-input :show-input-controls="false" input-size="mini" />
            </el-col>
          </el-row>
      </el-row>
      <el-row v-if="curComponent.component === 'de-date'">
        <el-row>
          <el-col :span="4">
            <span class="params-title-small">日期字体颜色：</span>
          </el-col>
          <el-col :span="1">
              <el-color-picker v-model="curComponent.commonSelectFrame.fontColor" size="mini" class="color-picker-style" :predefine="predefineColors" />
            </el-col>
        </el-row>
      </el-row>

    </el-row>
    <el-row class="root-class">
      <el-col :span="24">
        <el-button size="mini" @click="cancel()">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" size="mini" @click="save()">{{ $t('commons.confirm') }}</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { queryBackground } from '@/api/background/background'
import BackgroundItem from '@/views/background/BackgroundItem'
import { mapState } from 'vuex'
import eventBus from '@/components/canvas/utils/eventBus'
import { deepCopy } from '@/components/canvas/utils/utils'
import { COLOR_PANEL } from '@/views/chart/chart/chart'
import {
  COMMON_SELECT_FRAME,
} from '@/components/canvas/custom-component/component-list' 

export default {
  name: 'Background',
  components: { BackgroundItem },
  data() {
    return {
      BackgroundShowMap: {},
      checked: false,
      backgroundOrigin: {},
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadDisabled: false,
      selectOrigin: {},
      fileSelList: [],
      dialogSelImageUrl: '',
      dialogSelVisible: false,
      uploadSelDisabled: false,
      fileDownList: [],
      dialogDownImageUrl: '',
      dialogDownVisible: false,
      uploadDownDisabled: false,
      panel: null,
      predefineColors: COLOR_PANEL
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  computed: {
    ...mapState([
      'curComponent',
      'componentData'
    ])
  },
  methods: {
    init() {
      console.log('this.curComponent', this.curComponent)
      if(this.curComponent && this.curComponent.commonSelectFrame === undefined) {
        this.curComponent.commonSelectFrame = deepCopy(COMMON_SELECT_FRAME)
      }

      if (this.curComponent && this.curComponent.commonBackground && this.curComponent.commonBackground.outerImage && typeof (this.curComponent.commonBackground.outerImage) === 'string') {
        this.fileList.push({ url: this.curComponent.commonBackground.outerImage })
      }

      if(this.curComponent && this.curComponent.commonSelectFrame && this.curComponent.commonSelectFrame.backImg && typeof (this.curComponent.commonSelectFrame.backImg) === 'string') {
        this.fileSelList.push({url: this.curComponent.commonSelectFrame.backImg})
      }
      this.backgroundOrigin = deepCopy(this.curComponent.commonBackground)
      this.selectOrigin =deepCopy(this.curComponent.commonSelectFrame)
      this.queryBackground()
    },
    queryBackground() {
      queryBackground().then(response => {
        this.BackgroundShowMap = response.data
      })
    },
    clickEnable() {
      console.log('clickEnableclickEnableclickEnableclickEnable')
    },
    cancel() {
      this.curComponent.commonBackground.enable = this.backgroundOrigin.enable
      this.curComponent.commonBackground.backgroundType = this.backgroundOrigin.backgroundType
      this.curComponent.commonBackground.color = this.backgroundOrigin.color
      this.curComponent.commonBackground.innerImage = this.backgroundOrigin.innerImage
      this.curComponent.commonBackground.outerImage = this.backgroundOrigin.outerImage
      this.curComponent.commonBackground.alpha = this.backgroundOrigin.alpha
      this.curComponent.commonBackground.borderRadius = this.backgroundOrigin.borderRadius
      this.curComponent.commonBackground.innerPadding = this.backgroundOrigin.innerPadding
      this.curComponent.commonBackground.boxWidth = Math.floor(this.backgroundOrigin.boxWidth)
      this.curComponent.commonBackground.boxHeight = Math.floor(this.backgroundOrigin.boxHeight)
      this.curComponent.commonBackground.fontSize = this.backgroundOrigin.fontSize
      this.curComponent.commonBackground.fontColor = this.backgroundOrigin.fontColor

      if(this.curComponent.component === 'de-select' 
        || this.curComponent.component === 'de-input-search'
        || this.curComponent.component === 'de-select-grid'
      ) {
        this.curComponent.commonSelectFrame.enable = this.selectOrigin.enable
        this.curComponent.commonSelectFrame.backType = this.selectOrigin.backType
        this.curComponent.commonSelectFrame.color = this.selectOrigin.color
        this.curComponent.commonSelectFrame.backImg = this.selectOrigin.backImg
        this.curComponent.commonSelectFrame.alpha = this.selectOrigin.alpha
        this.curComponent.commonSelectFrame.fontColor = this.selectOrigin.fontColor
        this.curComponent.commonSelectFrame.checkBgType = this.selectOrigin.checkBgType
        this.curComponent.commonSelectFrame.checkColor = this.selectOrigin.checkColor
        this.curComponent.commonSelectFrame.checkBgColor = this.selectOrigin.checkBgColor
        this.curComponent.commonSelectFrame.checkBgImg = this.selectOrigin.checkBgImg
        this.curComponent.commonSelectFrame.panelBgColor = this.selectOrigin.panelBgColor
        this.curComponent.commonSelectFrame.panelColor = this.selectOrigin.panelColor
      }

      if(this.curComponent.component === 'Picture') {
        this.curComponent.commonSelectFrame.alpha = this.selectOrigin.alpha
      }
      if(this.curComponent.component === 'de-date') {
        this.curComponent.commonSelectFrame.fontSize === this.selectOrigin.fontSize
      }
      if(this.curComponent.component === 'de-text-info') {
        this.curComponent.commonSelectFrame.fontColor === this.selectOrigin.fontColor
      }


      console.log('this.curComponent.commonBackground=====', this.curComponent.commonBackground)
      this.$emit('backgroundSetClose')
    },
    save() {
      console.log('组件背景样式：：：：', this.curComponent)
      this.$store.commit('recordSnapshot')
      this.$emit('backgroundSetClose')
    },
    commitStyle() {
      const canvasStyleData = deepCopy(this.canvasStyleData)
      canvasStyleData.panel = this.panel
      this.$store.commit('setCanvasStyle', canvasStyleData)
      this.$store.commit('recordSnapshot', 'commitStyle')
    },
    onChangeType() {
      this.commitStyle()
    },
    handleRemove(file, fileList) {
      this.uploadDisabled = false
      this.panel.imageUrl = null
      this.fileList = []
      this.commitStyle()
    },
    handleSelRemove(file,fileList) {
      this.uploadSelDisabled = false,
      this.fileSelList = []
      this.commitStyle()
    },
    handleDownRemove(file,fileList) {
      this.uploadDownDisabled = false,
      this.fileDownList = []
      this.commitStyle()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSelectPreview(file) {
      this.dialogSelImageUrl = file.url
      this.dialogSelVisible = true
    },
    handleDownPreview(file) {
      this.dialogDownImageUrl = file.url
      this.dialogDownVisible = true
    },
    onChange(file, fileList) {
      console.log('file', file)
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传的文件大小不能超过 10MB!')
        this.fileList = []
        return
      }
      var _this = this
      _this.uploadDisabled = true
      const reader = new FileReader()
      reader.onload = function() {
        _this.curComponent.commonBackground.outerImage = reader.result
      }
      reader.readAsDataURL(file.raw)
    },
    onSelChange(file,fileList) {
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传的文件大小不能超过 10MB!')
        this.fileSelList = []
        return
      }
      var _this = this
      _this.uploadSelDisabled = true
      const reader = new FileReader()
      reader.onload = function() {
        _this.curComponent.commonSelectFrame.backImg = reader.result
      }
      reader.readAsDataURL(file.raw)
    },
    onDownChange(file,fileList) {
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传的文件大小不能超过 10MB!')
        this.fileDownList = []
        return
      }
      var _this = this
      _this.uploadDownDisabled = true
      const reader = new FileReader()
      reader.onload = function() {
        _this.curComponent.commonSelectFrame.checkBgImg = reader.result
      }
      reader.readAsDataURL(file.raw)
    },
    upload(file) {
      // console.log('this is upload')
    }

  }
}
</script>

<style scoped>
  .el-card-template {
    min-width: 260px;
    min-width: 460px;
    width: 100%;
    height: 100%;
  }

  .main-row{
    height: 140px;
    overflow-y: auto;
  }

  .root-class {
    margin: 15px 0px 5px;
    text-align: center;
  }
  .avatar-uploader>>>.el-upload {
    width: 120px;
    height: 80px;
    line-height: 90px;
  }
  .avatar-uploader>>>.el-upload-list li{
    width: 120px !important;
    height: 80px !important;
  }
  .disabled>>>.el-upload--picture-card {
    display: none;
  }
  .shape-item{
    padding: 6px;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-item-slider>>>.el-form-item__label{
    font-size: 12px;
    line-height: 38px;
  }
  .form-item>>>.el-form-item__label{
    font-size: 12px;
  }
  .el-select-dropdown__item{
    padding: 0 20px;
  }
  span{
    font-size: 12px
  }
  .el-form-item{
    margin-bottom: 6px;
  }
  .main-content{
    border:1px solid #E6E6E6;
  }

  .params-title{
    font-weight: bold;
    line-height: 40px;
    margin-left: 10px;
    font-size: 14px;
  }

  .params-title-small{
    font-weight: bold;
    line-height: 40px;
    margin-left: 10px;
    font-size: 12px;
  }
</style>

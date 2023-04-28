<template>
  <div style="width: 100%;">
    <el-col>
      <el-form ref="picForm" :model="picForm" label-width="100px" size="mini">
        <el-form-item :label="$t('chart.pic_carousel')" class="form-item">
          <el-checkbox v-model="picForm.carouselValue" @change="changePicCase">显示</el-checkbox>
        </el-form-item>
        <!-- <el-form-item :label="$t('chart.pic_height')" class="form-item form-item-slider">
          <el-slider v-model="picForm.carouselHeight" show-input :show-input-controls="false" input-size="mini" :min="50" :max="500" @change="changePicCase" />
        </el-form-item> -->
        <el-form-item label="上传图片" class="form-item">
          <div style="margin-bottom: 5px;">
            <el-button type="primary" v-if="isUpload" size="mini" @click="submitBtn()">确定</el-button>
          </div>
          <el-upload
            action=""
            accept=".jpeg,.jpg,.png,.gif,.svg"
            class="avatar-uploader"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :http-request="upload"
            :file-list="fileList"
            :on-change="onChange"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { COLOR_PANEL, DEFAULT_SIZE } from '../../chart/chart'
import { mapState } from 'vuex'

export default {
  name: 'PicSelectorAntV',
  props: {
    param: {
      type: Object,
      required: true
    },
    chart: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      picForm: JSON.parse(JSON.stringify(DEFAULT_SIZE)),
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      isUpload: false,
    }
  },
  watch: {
    'chart': {
      handler: function() {
        this.initData()
      }
    }
  },
  computed: {
    ...mapState([
      'curComponent'
    ])
  },
  methods: {
    initData() {
      const chart = JSON.parse(JSON.stringify(this.chart))
      if (chart.customAttr) {
        let customAttr = null
        if (Object.prototype.toString.call(chart.customAttr) === '[object Object]') {
          customAttr = JSON.parse(JSON.stringify(chart.customAttr))
        } else {
          customAttr = JSON.parse(chart.customAttr)
        }
        // console.log('customAttr',customAttr)
        if(customAttr.size) {
          this.picForm = customAttr.size
          if(customAttr.size.carouselValue === undefined) {
            this.picForm.carouselValue = false
          }
          if(customAttr.size.carouselPics === undefined) {
            this.picForm.carouselPics = []
          }
          if(this.picForm.carouselPics.length) {
            let arr = []
            this.picForm.carouselPics.forEach(item => {
              arr.push(item)
            })
            this.fileList = arr
          }
        }
      }
    },
    changePicCase(){
      console.log('改变：',this.picForm)
      this.$emit('onSizeChange', this.picForm)
    },
    submitBtn(){
      this.isUpload = false
      console.log('carouselPics,....',this.picForm.carouselPics)
      this.changePicCase()
    },

    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList){
      console.log('remove', file, fileList)
      var _this = this
      _this.fileList = fileList
      _this.picForm.carouselPics = []
      _this.fileList.forEach((item,index) => {
        if(item.raw) {
          const reader = new FileReader()
          reader.onload = function() {
            _this.picForm.carouselPics.push({
              url: reader.result,
              number: index,
            })
          }
          reader.readAsDataURL(item.raw)
        } else {
          _this.picForm.carouselPics.push(item)
        }
      })
      this.isUpload = true
    },
    onChange(file, fileList){
      console.log('上传',file,fileList)
      if (file.size / 1024 / 1024 > 10) {
        this.$message.error('上传的文件大小不能超过 10MB!')
        if(fileList.length){
          fileList.splice((fileList.length-1),1)
          this.fileList = fileList
        } else {
          this.fileList = []
        }
        return
      }
      var _this = this
      
      _this.fileList = fileList
      _this.picForm.carouselPics = []
      _this.fileList.forEach((item,index) => {
        if(item.raw) {
          const reader = new FileReader()
          reader.onload = function() {
            // console.log('reader.result7777777', reader.result)
            _this.picForm.carouselPics.push({
              url: reader.result,
              number: index,
            })
          }
          reader.readAsDataURL(item.raw)
        } else {
          _this.picForm.carouselPics.push(item)
        }
      })
      
      this.isUpload = true
    },
    upload(file) {
      console.log('this is upload', file)
    }
  }
}
</script>
<style scoped>
.shape-item{
  padding: 6px;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-item-slider ::v-deep .el-form-item__label{
  font-size: 12px;
  line-height: 38px;
}
.form-item ::v-deep .el-form-item__label{
  font-size: 12px;
}
.el-select-dropdown__item{
  padding: 0 20px;
}
  span{font-size: 12px}

.el-form-item{
  margin-bottom: 6px;
}
.el-divider--horizontal {
  margin: 10px 0
}
.divider-style ::v-deep .el-divider__text{
  color: #606266;
  font-size: 12px;
  font-weight: 400;
  padding: 0 10px;
}

.avatar-uploader ::v-deep .el-upload {
  width: 120px;
  height: 80px;
  line-height: 90px;
}
.avatar-uploader ::v-deep .el-upload-list li{
  width: 120px !important;
  height: 80px !important;
}
</style>
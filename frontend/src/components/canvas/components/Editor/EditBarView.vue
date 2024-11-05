<template>
  <div>
    <div v-if="show && type.includes('table')" class="download" @click.stop="exportDetailData">
      <i class="el-icon-download" ></i>
    </div>
    <div v-if="show" :class="['bar-main', type.includes('table') ? 'bar-main-right' : '']">
      <div>
        <span v-if="isEdit" :title="$t('panel.edit')">
          <i class="icon iconfont icon-edit" @click.stop="edit" />
        </span>
        <span :title="$t('panel.details')">
          <i class="icon iconfont icon-fangda" @click.stop="showViewDetails" />
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import { mapState } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    viewId: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: true
    },
    type: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      componentType: null,
      linkageActiveStatus: false,
      editFilter: [
        'view',
        'custom'
      ],
      timer: null
    }
  },
  computed: {
    ...mapState([
      'linkageSettingStatus',
      'componentData',
      'canvasStyleData'
    ])
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    edit() {
      this.$store.dispatch('chart/setViewId', null)
      this.$store.dispatch('chart/setViewId', this.viewId)
      bus.$emit('change_panel_right_draw', true)
    },
    linkageEdit() {

    },
    amRemoveItem() {
      this.$emit('amRemoveItem')
    },
    showViewDetails() {
      this.$emit('showViewDetails')
    },
    exportDetailData() {
      this.$emit('exportDetailData')
    },
  }
}
</script>

<style lang="scss" scoped>
  .download {
    position: absolute;
    right: 0px;
    float:right;
    z-index: 4;
    border-radius:2px;
    // padding-left: 5px;
    // padding-right: 2px;
    cursor:pointer!important;
    background-color: #0a7be0;
  }
  .download i {
    width: 24px;
    height: 24px;
    color: white;
    float: right;
    padding-top: 4px;
    padding-left: 4px;
  }
  .bar-main{
    position: absolute;
    right: 0;
    float:right;
    z-index: 2;
    border-radius:2px;
    padding-left: 5px;
    padding-right: 2px;
    cursor:pointer!important;
    background-color: #0a7be0;
  }
  .bar-main-right {
    right: 24px;
  }
  .bar-main i{
    color: white;
    float: right;
    margin-right: 3px;
  }

</style>

<template>
  <div class="permission-config">
    <!-- 左侧：当前用户权限 -->
    <div class="permission-section">
      <div class="section-title">{{ $t('dataset.current_user_permissions') }}</div>
      <lazy-tree
        :active-name="dataInfo.authType"
        :data-info="currentUserInfo"
        highlight-current
        :show-extent="true"
        :default-auth-details="userAuthDetails"
        :auth-condition="{id: currentUserId, type: 'user'}"
        class="permission-tree"
      />
    </div>

    <!-- 右侧：被分享者权限配置 -->
    <div class="permission-section">
      <div class="section-title">{{ $t('dataset.target_user_permissions') }}</div>
      <lazy-tree
        :active-name="dataInfo.authType"
        :data-info="targetUserInfo"
        highlight-current
        :show-extent="true"
        :default-auth-details="userAuthDetails"
        :auth-condition="authCondition"
        :attach-active-name="attachActiveName"
        class="permission-tree"
        @auth-changed="onAuthChanged"
      />
    </div>
  </div>
</template>

<script>
import LazyTree from './LazyTree'
// import { getUserInfo } from '@/api/user/user'
// import { getDatasetAuthDetails } from '@/api/dataset/dataset'

export default {
  name: 'PermissionConfig',
  components: { LazyTree },
  props: {
    // 权限配置信息
    dataInfo: {
      type: Object,
      required: true
    },
    // 授权条件
    authCondition: {
      type: Object,
      required: true
    },
    // 附加激活名称（用于监听变化）
    attachActiveName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentUserId: null, // 当前用户ID
      userInfo: null, // 当前用户信息
      userAuthDetails: [], // 当前用户的权限详情
      currentUserInfo: {
        head: this.$t('dataset.current_user'),
        authType: this.dataInfo.authType,
        direction: 'source'
      },
      targetUserInfo: {
        head: this.$t('dataset.target_user'),
        authType: this.dataInfo.authType,
        direction: 'target'
      },
      authChanges: [] // 记录权限变更
    }
  },
  created() {
    // this.loadUserInfo()
  },
  methods: {
    // 加载当前用户信息
    async loadUserInfo() {
      try {
        // const response = await getUserInfo()
        // this.userInfo = response.data
        // this.currentUserId = response.data.id
        // 加载当前用户对当前数据集的权限
        this.loadUserAuthDetails()
      } catch (error) {
        console.error('获取用户信息失败', error)
        this.$message.error(this.$t('dataset.get_user_info_failed'))
      }
    },

    // 加载当前用户权限详情
    async loadUserAuthDetails() {
      try {
        // const response = await getDatasetAuthDetails({
        //   resourceId: this.dataInfo.resourceId,
        //   userId: this.currentUserId,
        //   authType: this.dataInfo.authType
        // })
        // this.userAuthDetails = response.data || []
      } catch (error) {
        console.error('获取用户权限详情失败', error)
        this.$message.error(this.$t('dataset.get_user_permissions_failed'))
      }
    },

    // 权限变更
    onAuthChanged(authChange) {
      // 查找是否已有相同权限变更
      const index = this.authChanges.findIndex(item =>
        item.authSource === authChange.authSource &&
        item.authSourceType === authChange.authSourceType &&
        item.authTarget === authChange.authTarget &&
        item.authTargetType === authChange.authTargetType &&
        item.authDetail.privilegeName === authChange.authDetail.privilegeName
      )
      if (index >= 0) {
        // 更新现有权限变更
        this.authChanges.splice(index, 1, authChange)
      } else {
        // 添加新权限变更
        this.authChanges.push(authChange)
      }
    },
    // 获取权限变更记录
    getAuthChanges() {
      return this.authChanges
    },
    // 重置权限变更记录
    resetAuthChanges() {
      this.authChanges = []
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-config {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  .permission-section {
    flex: 1;
    .section-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #303133;
    }
    .permission-tree {
      height: 400px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      overflow-y: auto;
    }
  }
}
</style>

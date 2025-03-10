<template>
  <div class="data-fill-home">
    <van-nav-bar
      title="数据填报"
      class="nav-bar"
    />
    <div class="content">
      <div class="welcome-section">
        <div class="welcome-title">欢迎使用数据填报系统</div>
        <div class="welcome-desc">快速、便捷的数据填报工具</div>
      </div>
      <div class="action-card">
        <van-button
          type="primary"
          block
          class="start-button"
          @click="startFill"
        >
          <template #icon>
            <van-icon name="edit" />
          </template>
          开始填报
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startFill = () => {
  router.push('/fill-form')
}
</script>

<style scoped>
.data-fill-home {
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.welcome-section {
  text-align: center;
  padding: 32px 0;
}

.welcome-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.welcome-desc {
  font-size: 14px;
  color: var(--text-secondary);
}

.action-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.start-button {
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.start-button :deep(.van-button__icon) {
  font-size: 18px;
  margin-right: 4px;
}
</style>

<template>
  <div class="app" ref="containerS">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Watermark from '@/utils/waterMark'
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { getInfo } from '@/api/user'
import Cookies from 'js-cookie'

const route = useRoute()
const containerS = ref(null)
const name = ref('')

// 获取用户名并设置水印
const setWatermark = async () => {
  const token = Cookies.get('token')
  // 只有在有 token 且没有用户名的情况下才重新获取用户信息
  if (token && !sessionStorage.getItem('nickName')) {
    try {
      const res = await getInfo(token)
      if (res.success) {
        sessionStorage.setItem('nickName', res.data.nickName || '水印')
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  const nickName = sessionStorage.getItem('nickName') || '水印'
  name.value = nickName
  const nameS = name.value + '\n' + moment().format('YYYY-MM-DD HH:mm:ss')
  nextTick(() => {
    Watermark.set(nameS, containerS.value)
  })
}

// 监听路由变化
watch(route, () => {
  setWatermark()
})

// 组件挂载时
onMounted(() => {
  setWatermark()
})
</script>

<style>
/* 全局变量 - Apifox 风格 */
:root {
  /* 主题色 */
  --primary-color: #2468f2;
  --primary-hover: #4785f5;
  --primary-active: #1b4fc9;
  --primary-light: #e8f3ff;

  /* 功能色 */
  --success-color: #00b578;
  --warning-color: #ff8f1f;
  --danger-color: #f53f3f;
  --info-color: #86909c;

  /* 文字颜色 */
  --text-primary: #1f2329;
  --text-secondary: #4e5969;
  --text-tertiary: #86909c;
  --text-disabled: #c9cdd4;

  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7f9;
  --bg-tertiary: #f2f3f5;
  --bg-quaternary: #fafafa;
  --bg-mask: rgba(0, 0, 0, 0.45);

  /* 边框颜色 */
  --border-color: #e5e6eb;
  --border-light: #f0f0f0;
  --border-split: #f2f3f5;

  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.12);

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* 字体 */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif;

  /* 字号 */
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;

  /* 行高 */
  --line-height-compact: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  /* 动画 */
  --transition-quick: 0.2s;
  --transition-normal: 0.3s;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 覆盖 Vant 默认主题色 */
:root:root {
  --van-primary-color: var(--primary-color);
  --van-success-color: var(--success-color);
  --van-danger-color: var(--danger-color);
  --van-warning-color: var(--warning-color);
  --van-text-color: var(--text-primary);
  --van-text-color-2: var(--text-secondary);
  --van-text-color-3: var(--text-tertiary);
  --van-active-color: var(--bg-tertiary);
  --van-background: var(--bg-primary);
  --van-background-2: var(--bg-secondary);
  --van-border-color: var(--border-color);
  --van-padding-xs: 8px;
  --van-padding-sm: 12px;
  --van-padding-md: 16px;
  --van-padding-lg: 24px;
  --van-font-size-xs: var(--font-size-xs);
  --van-font-size-sm: var(--font-size-sm);
  --van-font-size-md: var(--font-size-base);
  --van-font-size-lg: var(--font-size-lg);
  --van-radius-sm: var(--radius-sm);
  --van-radius-md: var(--radius-md);
  --van-radius-lg: var(--radius-lg);
}

/* 全局基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.app {
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

/* 水印样式优化 */
.watermark {
  color: var(--text-disabled);
  opacity: 0.1;
  font-size: var(--font-size-sm);
  pointer-events: none;
}

/* 全局过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal) var(--easing-standard);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--text-disabled);
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

/* 文本选择样式 */
::selection {
  background: var(--primary-light);
  color: var(--primary-color);
}
</style>

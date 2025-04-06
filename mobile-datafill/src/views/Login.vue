<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { getUserInfo, getPublicKey, login } from '@/api/user'
import Cookies from 'js-cookie'
import { encrypt } from '@/utils/rsaEncrypt'

const router = useRouter()
const username = ref('')
const password = ref('')

// 在组件挂载前获取公钥
onBeforeMount(async () => {
  try {
    const res = await getPublicKey()
    if (res.success && res.data) {
      localStorage.setItem('publicKey', res.data)
    } else {
      showToast('获取公钥失败')
    }
  } catch (error) {
    console.error('获取公钥失败:', error)
    showToast('获取公钥失败')
  }
})



const onSubmit = async (values) => {
  try {
    const publicKey = localStorage.getItem('publicKey')
    if (!publicKey) {
      showToast('系统错误，请刷新重试')
      return
    }

    const params = {
      username: encrypt(values.username),
      password: encrypt(values.password),
      loginType: 0
    }

    const res = await login(params)
    if (res.success) {
      const token = res.data.token
      // 设置会话 cookie，不设置 expires，浏览器关闭即失效
      Cookies.set('token', token)

      // 获取用户信息，传入 token
      await getUserInfo(token)

      showToast('登录成功')
      router.push('/')
    } else {
      showToast(res.message || '登录失败')
    }
  } catch (error) {
    showToast('登录失败')
  }
}

// 组件卸载时清除公钥
onBeforeUnmount(() => {
  localStorage.removeItem('publicKey')
})
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7f9;  /* Apifox 的背景色 */
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;  /* Apifox 的登录卡片宽度 */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 32px;
  border: 1px solid #e5e6eb;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2329;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #86909c;
}

/* 表单样式优化 */
:deep(.van-cell-group) {
  background: transparent;
}

:deep(.van-field) {
  padding: 12px 0;
}

:deep(.van-field__label) {
  color: #1f2329;
  font-weight: 500;
  font-size: 14px;
  width: 60px;
}

:deep(.van-field__value) {
  background: #f5f7f9;
  border-radius: 4px;
  padding: 4px 12px;
}

:deep(.van-field__control) {
  color: #1f2329;
  height: 32px;
  font-size: 14px;
}

:deep(.van-field__control::placeholder) {
  color: #c9cdd4;
}

/* 登录按钮样式 */
.login-button {
  margin-top: 24px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  background: #2468f2;  /* Apifox 的主题色 */
  border: none;
}

.login-button:active {
  background: #1b4fc9;
}

/* 错误提示样式 */
.error-message {
  color: #f53f3f;  /* Apifox 的错误色 */
  font-size: 13px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.error-message .van-icon {
  font-size: 14px;
}

/* 加载状态 */
:deep(.van-loading) {
  color: #fff;
}

/* 输入框激活状态 */
:deep(.van-field__control:focus) {
  background: #fff;
}

:deep(.van-cell) {
  background: transparent;
  padding: 12px 0;
}

/* 输入框图标 */
:deep(.van-field__right-icon .van-icon) {
  color: #86909c;
  font-size: 16px;
}

/* 记住密码选项 */
.remember-password {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.van-checkbox__label) {
  color: #4e5969;
  font-size: 14px;
}

:deep(.van-checkbox__icon) {
  border-color: #c9cdd4;
}

:deep(.van-checkbox__icon--checked) {
  background-color: #2468f2;
  border-color: #2468f2;
}

/* 其他登录方式 */
.other-login {
  margin-top: 24px;
  text-align: center;
  color: #86909c;
  font-size: 13px;
}

.other-login-options {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.login-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #4e5969;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}

.login-option:hover {
  color: #2468f2;
}

.login-option .van-icon {
  font-size: 24px;
}

/* 底部文字 */
.login-footer {
  margin-top: 32px;
  text-align: center;
  color: #86909c;
  font-size: 13px;
}

.login-footer a {
  color: #2468f2;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* 动画效果 */
.van-button,
.login-option,
:deep(.van-field__control),
:deep(.van-checkbox__icon) {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

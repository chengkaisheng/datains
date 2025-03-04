<template>
  <div class="data-fill-home">
    <van-nav-bar title="数据填报" />
    <div class="content">
      <van-button type="primary" block @click="startFill">开始填报</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const startFill = () => {
  router.push('/fill-form')
}
</script>

<style scoped>
.data-fill-home {
  height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 20px;
}
</style> 
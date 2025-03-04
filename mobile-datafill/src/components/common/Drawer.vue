<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="drawer-container">
        <div class="drawer-mask" @click="handleClose"></div>
        <div class="drawer-content" :style="{ width: width }">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '80%'
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleClose = () => {
  if (props.closeOnClickOverlay) {
    emit('update:modelValue', false)
  }
}
</script>

<style>
.drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.drawer-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.drawer-content {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  overflow: auto;
}

/* 抽屉动画 */
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease-out;
}

.drawer-enter-from {
  opacity: 0;
}

.drawer-enter-from .drawer-content {
  transform: translateX(100%);
}

.drawer-enter-to {
  opacity: 1;
}

.drawer-enter-to .drawer-content {
  transform: translateX(0);
}

.drawer-leave-from {
  opacity: 1;
}

.drawer-leave-from .drawer-content {
  transform: translateX(0);
}

.drawer-leave-to {
  opacity: 0;
}

.drawer-leave-to .drawer-content {
  transform: translateX(100%);
}
</style> 
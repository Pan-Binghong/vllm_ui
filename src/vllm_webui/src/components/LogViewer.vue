<template>
  <el-card class="log-viewer" shadow="never">
    <div class="log-header">
      <div class="log-title">
        <el-icon class="status-icon"><i class="el-icon-monitor"></i></el-icon>
        <span>运行日志</span>
        <span :class="['status-badge', statusType]">{{ statusText }}</span>
      </div>
      <button class="google-button-icon" @click="$emit('clear')" title="清空日志">
        <i class="el-icon-delete"></i>
      </button>
    </div>
    <div class="log-container">
      <pre class="log-content" ref="logRef">{{ log || '暂无日志信息...' }}</pre>
    </div>
  </el-card>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
const props = defineProps(['log', 'status'])
const logRef = ref(null)

const statusType = computed(() => ({
  idle: 'status-info', 
  running: 'status-primary', 
  success: 'status-success', 
  error: 'status-error'
}[props.status] || 'status-info'))

const statusText = computed(() => ({
  idle: '待启动', 
  running: '运行中', 
  success: '已完成', 
  error: '错误'
}[props.status] || '未知'))

watch(() => props.log, () => {
  if (logRef.value) {
    logRef.value.scrollTop = logRef.value.scrollHeight
  }
})
</script>

<style scoped>
.log-viewer {
  margin-top: 20px;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #dadce0;
  overflow: hidden;
}

.log-viewer :deep(.el-card__body) {
  padding: 0;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f1f3f4;
  border-bottom: 1px solid #dadce0;
}

.log-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #202124;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
}

.status-icon {
  color: #5f6368;
}

.status-badge {
  padding: 2px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
}

.status-info {
  background-color: #e8f0fe;
  color: #1a73e8;
}

.status-primary {
  background-color: #e8f0fe;
  color: #1967d2;
}

.status-success {
  background-color: #e6f4ea;
  color: #34a853;
}

.status-error {
  background-color: #fce8e6;
  color: #ea4335;
}

.google-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  color: #5f6368;
  transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.google-button-icon:hover {
  background-color: rgba(60, 64, 67, 0.08);
}

.google-button-icon:active {
  background-color: rgba(60, 64, 67, 0.12);
}

.log-container {
  max-height: 240px;
  overflow: hidden;
  position: relative;
}

.log-content {
  height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 12px 16px;
  background: #fff;
  color: #202124;
  font-family: 'Roboto Mono', 'Fira Mono', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  border-radius: 0;
  scrollbar-width: thin;
  scrollbar-color: #dadce0 #f1f3f4;
}

.log-content::-webkit-scrollbar {
  width: 8px;
}

.log-content::-webkit-scrollbar-track {
  background: #f1f3f4;
}

.log-content::-webkit-scrollbar-thumb {
  background: #dadce0;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .log-header {
    padding: 10px 12px;
  }
  
  .log-title {
    font-size: 0.9rem;
  }
  
  .log-content {
    font-size: 0.8rem;
    padding: 10px 12px;
  }
}
</style> 
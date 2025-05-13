<template>
  <div class="vllm-bg">
    <el-container class="app-container">
      <el-header class="vllm-header">
        <div class="header-content">
          <h1>
            <img src="/unicom.png" alt="联通logo" class="unicom-logo">
            <span class="logo-text">上海联通</span> <span class="subtitle">模型管理平台</span>
          </h1>
        </div>
      </el-header>
      <el-main class="main-content">
        <div class="task-control-panel">
          <button class="google-button primary add-fab" @click="addTask">
            <i class="el-icon-plus"></i>
            <span>新增模型任务</span>
          </button>
        </div>
        <el-collapse v-model="activeNames" accordion class="task-container">
          <el-collapse-item
            v-for="(task, idx) in tasks"
            :key="idx"
            :name="String(idx)"
            class="task-collapse"
          >
            <template #title>
              <div class="task-title">
                <el-icon><i class="el-icon-cpu"></i></el-icon>
                <span>任务 {{ idx + 1 }} - {{ task.modelPath || '未填写模型路径' }}</span>
              </div>
            </template>
            <ModelLauncher v-model="tasks[idx]" />
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-footer class="vllm-footer">
        <p>© 2023-2025 上海联通 - 模型管理平台</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModelLauncher from './components/ModelLauncher.vue'
const tasks = ref([{}])
const activeNames = ref(['0'])
function addTask() {
  tasks.value.push({})
  activeNames.value = [String(tasks.value.length - 1)]
}
</script>

<style scoped>
.vllm-bg {
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c1616 100%);
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.vllm-header {
  background: rgba(0, 0, 0, 0.2);
  padding: 0;
  height: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  padding: 24px 48px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.vllm-header h1 {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 0;
  display: flex;
  align-items: center;
}

.unicom-logo {
  height: 40px;
  margin-right: 16px;
}

.logo-text {
  background: linear-gradient(90deg, #e64240 0%, #c21f20 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
}

.subtitle {
  color: #f8d0d0;
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 8px;
  opacity: 0.9;
}

.main-content {
  padding: 20px 48px;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  flex: 1;
  max-height: calc(100vh - 140px);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.main-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.task-control-panel {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
}

.add-btn {
  margin: 12px 0;
  font-size: 1.05rem;
  border-radius: 24px;
  padding: 10px 32px;
  background: linear-gradient(90deg, #e64240 0%, #c21f20 100%);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(194, 31, 32, 0.3);
}

.add-btn:hover {
  background: linear-gradient(90deg, #c21f20 0%, #e64240 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(194, 31, 32, 0.4);
}

.task-container {
  border-radius: 8px;
  overflow: hidden;
}

.task-collapse {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.task-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e64240;
  font-weight: 500;
}

.vllm-footer {
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  padding: 16px;
  font-size: 0.85rem;
  height: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .header-content {
    padding: 16px 24px;
  }
  
  .vllm-header h1 {
    font-size: 1.6rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .unicom-logo {
    height: 32px;
    margin-right: 12px;
  }
  
  .main-content {
    padding: 16px 24px;
  }
}

/* Google风格按钮 */
.google-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 120px;
  height: 36px;
  padding: 0 24px;
  border: none;
  border-radius: 4px;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  vertical-align: middle;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.google-button.primary {
  background-color: #e64240;
  color: white;
}

.google-button.primary:hover {
  background-color: #c21f20;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.add-fab {
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  font-size: 16px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
}

.add-fab:hover {
  box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15);
  transform: translateY(-1px);
}
</style>
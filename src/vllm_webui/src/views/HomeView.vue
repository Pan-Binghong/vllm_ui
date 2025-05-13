<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="vllm-bg">
    <el-container>
      <el-header class="vllm-header">
        <h1>vLLM <span>专业模型服务启动平台</span></h1>
      </el-header>
      <el-main>
        <el-row :gutter="32" justify="center">
          <el-col :span="8" v-for="(task, idx) in tasks" :key="idx">
            <ModelLauncher v-model="tasks[idx]" />
          </el-col>
        </el-row>
        <div class="add-btn-wrap">
          <el-button type="primary" icon="el-icon-plus" @click="addTask" class="add-btn">新增模型任务</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.vllm-bg {
  min-height: 100vh;
  background: #181a20;
  padding: 0;
}
.vllm-header {
  background: transparent;
  text-align: left;
  padding: 32px 0 16px 48px;
}
.vllm-header h1 {
  color: #e6f0ff;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 2px;
}
.vllm-header span {
  color: #7ab8ff;
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 8px;
}
.add-btn-wrap {
  text-align: center;
  margin: 32px 0 0 0;
}
.add-btn {
  font-size: 1.1rem;
  border-radius: 24px;
  padding: 10px 32px;
  background: linear-gradient(90deg, #3a8bfd 0%, #005bea 100%);
  border: none;
}
.add-btn:hover {
  background: linear-gradient(90deg, #005bea 0%, #3a8bfd 100%);
  color: #fff;
}
.el-form {
  font-size: 1.05em;
}
.el-form-item__label {
  font-weight: 600;
  color: #005bea;
}
.el-input, .el-input-number, .el-slider {
  border-radius: 8px;
}
.el-divider {
  margin: 12px 0;
  background: #e6f0ff;
}
</style>

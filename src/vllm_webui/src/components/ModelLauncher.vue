<template>
  <el-card class="model-launcher-card" shadow="hover">
    <div class="header">
      <div class="header-left">
        <el-icon class="header-icon"><i class="el-icon-cpu"></i></el-icon>
        <span class="title">模型启动配置</span>
      </div>
      <el-tooltip content="参考参数文档" placement="top">
        <el-link href="https://docs.vllm.ai/en/latest/serving/engine_args.html" target="_blank" class="doc-link" type="primary">
          <el-icon><i class="el-icon-link"></i></el-icon>
          <span>文档</span>
        </el-link>
      </el-tooltip>
    </div>
    <ParamForm v-model="form" :rules="rules" />
    <div class="cmd-preview">
      <div class="cmd-header">
        <span>命令预览</span>
        <button class="google-button-icon" @click="copyCmd" title="复制命令">
          <i class="el-icon-document-copy"></i>
        </button>
      </div>
      <div class="param-tips" v-if="form.extraArgs && form.extraArgs.length > 0">
        <el-tag type="success" effect="plain" size="small">已设置 {{ form.extraArgs.length }} 个高级参数</el-tag>
        <el-tooltip content="在高级参数选项卡中可以图形化配置更多参数" placement="top">
          <el-icon class="tip-icon"><i class="el-icon-info-filled"></i></el-icon>
        </el-tooltip>
      </div>
      <pre class="cmd-content"><code>{{ previewCmd }}</code></pre>
    </div>
    <div class="actions">
      <button class="google-button primary" :class="{'google-button-loading': loading}" @click="startVllm">
        <span class="google-button-content">
          <i class="el-icon-video-play" v-if="!loading"></i>
          <i class="el-icon-loading" v-else></i>
          <span>启动</span>
        </span>
      </button>
      <button class="google-button secondary" :disabled="!taskId" @click="stopVllm">
        <span class="google-button-content">
          <i class="el-icon-video-pause"></i>
          <span>终止</span>
        </span>
      </button>
    </div>
    <LogViewer :log="log" :status="status" />
  </el-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ParamForm from './ParamForm.vue'
import LogViewer from './LogViewer.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const props = defineProps()
const form = ref({
  modelPath: '',
  tensorParallel: 1,
  gpuUtil: 0.9,
  maxModelLen: 32768,
  extraArgs: []
})
const rules = {
  modelPath: [{ required: true, message: '模型路径必填', trigger: 'blur' }],
  tensorParallel: [{ type: 'number', min: 1, message: '至少1张卡' }],
  gpuUtil: [{ type: 'number', min: 0.1, max: 1, message: '0.1~1之间' }],
  maxModelLen: [{ type: 'number', min: 1, message: '必须大于0' }]
}
const log = ref('')
const loading = ref(false)
const status = ref('idle')
const taskId = ref(null)

const previewCmd = computed(() => {
  let args = [
    'vllm serve',
    form.value.modelPath,
    `--tensor-parallel-size ${form.value.tensorParallel}`,
    `--gpu-memory-utilization ${form.value.gpuUtil}`,
    `--max-model-len ${form.value.maxModelLen}`
  ]
  if (form.value.extraArgs.length) args = args.concat(form.value.extraArgs)
  return args.join(' ')
})

function copyCmd() {
  navigator.clipboard.writeText(previewCmd.value)
  ElMessage.success('命令已复制')
}

async function startVllm() {
  log.value = ''
  loading.value = true
  status.value = 'running'
  try {
    const response = await axios.post('http://localhost:3001/api/start-vllm', form.value, { responseType: 'text' })
    log.value = response.data
    status.value = 'success'
  } catch (e) {
    log.value = '启动失败：' + (e.message || e)
    status.value = 'error'
  }
  loading.value = false
}

function stopVllm() {
  ElMessage.info('终止功能待实现')
}
</script>

<style scoped>
.model-launcher-card {
  margin: 0 auto 16px auto;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 0;
  overflow: hidden;
  border: none;
  width: 100%;
  max-width: 100%;
}

.model-launcher-card :deep(.el-card__body) {
  padding: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  background: linear-gradient(135deg, #e64240 0%, #c21f20 100%);
  color: white;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-weight: 700;
  font-size: 1.25em;
  color: #202124;
  letter-spacing: 0.5px;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
}

.doc-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9em;
  color: #e64240;
  text-decoration: none;
}

.cmd-preview {
  background: #f8fafb;
  border-radius: 8px;
  margin: 20px 0 16px 0;
  overflow: hidden;
  border: 1px solid #dadce0;
}

.cmd-header {
  background: #f1f3f4;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  color: #5f6368;
  font-weight: 500;
  border-bottom: 1px solid #dadce0;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
}

.cmd-content {
  padding: 16px;
  margin: 0;
  font-family: 'Roboto Mono', 'Fira Mono', 'Consolas', monospace;
  font-size: 0.95em;
  color: #3c4043;
  word-break: break-all;
  line-height: 1.5;
  overflow-x: auto;
  background: #fff;
}

.param-tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #e6f4ea;
  border-bottom: 1px solid #dadce0;
}

.tip-icon {
  color: #34a853;
  cursor: pointer;
}

/* Google Material Design 风格按钮 */
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

.google-button.secondary {
  background-color: #e8eaed;
  color: #3c4043;
}

.google-button.primary:hover {
  background-color: #c21f20;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-button.secondary:hover {
  background-color: #dadce0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-button:active {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
}

.google-button:disabled {
  background-color: rgba(60, 64, 67, 0.12);
  color: rgba(60, 64, 67, 0.38);
  cursor: default;
  box-shadow: none;
}

.google-button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.google-button-loading {
  cursor: wait;
  opacity: 0.8;
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

.actions {
  margin: 24px 0 20px 0;
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .model-launcher-card :deep(.el-card__body) {
    padding: 16px;
  }
  
  .title {
    font-size: 1.1em;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
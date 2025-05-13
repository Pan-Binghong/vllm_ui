<template>
  <div class="param-form-container">
    <el-form :model="modelValue" :rules="rules" ref="formRef" label-width="140px" class="param-form">
      <!-- 基础参数部分 -->
      <el-form-item label="模型路径" prop="modelPath" class="form-item-with-tip">
        <div class="input-wrapper">
          <el-input 
            v-model="modelValue.modelPath" 
            placeholder="必填，如 /data/xxx"
            prefix-icon="el-icon-folder"
            clearable
            class="google-input"
          />
        </div>
      </el-form-item>
      
      <el-form-item label="算力卡数量" prop="tensorParallel" class="form-item-with-tip">
        <div class="input-with-tip">
          <el-input-number 
            v-model="modelValue.tensorParallel" 
            :min="1"
            controls-position="right"
            class="number-input google-input-number"
          />
          <el-tooltip content="用于并行推理的GPU卡数" placement="top" class="form-tooltip">
            <el-icon><i class="el-icon-info-filled"></i></el-icon>
          </el-tooltip>
        </div>
      </el-form-item>
      
      <el-form-item label="卡利用率" prop="gpuUtil" class="form-item-with-tip">
        <div class="slider-container">
          <el-slider 
            v-model="modelValue.gpuUtil" 
            :min="0.1" 
            :max="1" 
            :step="0.05" 
            show-input 
            class="custom-slider google-slider"
          />
          <span class="slider-hint">（0.1~1）</span>
        </div>
      </el-form-item>
      
      <el-form-item label="最长上下文" prop="maxModelLen" class="form-item-with-tip">
        <div class="input-with-tip">
          <el-input-number 
            v-model="modelValue.maxModelLen" 
            :min="1"
            controls-position="right"
            class="number-input google-input-number"
          />
          <el-tooltip content="最大支持的token长度" placement="top" class="form-tooltip">
            <el-icon><i class="el-icon-info-filled"></i></el-icon>
          </el-tooltip>
        </div>
      </el-form-item>
    </el-form>
    
    <!-- 高级参数部分，使用选项卡组织 -->
    <div class="advanced-params-section">
      <el-divider content-position="center">
        <span class="divider-content">高级参数</span>
      </el-divider>
      
      <el-tabs type="border-card" class="param-tabs google-tabs">
        <el-tab-pane label="模型选项">
          <el-form :model="advancedParams" label-width="140px" size="small">
            <el-form-item label="数据类型">
              <el-select v-model="advancedParams.dtype" placeholder="选择数据类型" class="google-select">
                <el-option label="自动" value="auto" />
                <el-option label="bfloat16" value="bfloat16" />
                <el-option label="float16" value="float16" />
                <el-option label="float32" value="float32" />
                <el-option label="half" value="half" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="量化类型">
              <el-select v-model="advancedParams.quantization" placeholder="选择量化类型" class="google-select">
                <el-option label="无" value="None" />
                <el-option label="AWQ" value="awq" />
                <el-option label="GPTQ" value="gptq" />
                <el-option label="bitsandbytes" value="bitsandbytes" />
                <el-option label="GGUF" value="gguf" />
                <el-option label="marlin" value="marlin" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="信任远程代码">
              <el-switch v-model="advancedParams.trustRemoteCode" class="google-switch" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="并行设置">
          <el-form :model="advancedParams" label-width="140px" size="small">
            <el-form-item label="流水线并行度">
              <el-input-number v-model="advancedParams.pipelineParallelSize" :min="1" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="数据并行度">
              <el-input-number v-model="advancedParams.dataParallelSize" :min="1" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="启用专家并行">
              <el-switch v-model="advancedParams.enableExpertParallel" class="google-switch" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="内存管理">
          <el-form :model="advancedParams" label-width="140px" size="small">
            <el-form-item label="块大小">
              <el-select v-model="advancedParams.blockSize" placeholder="选择块大小" class="google-select">
                <el-option label="1" value="1" />
                <el-option label="8" value="8" />
                <el-option label="16" value="16" />
                <el-option label="32" value="32" />
                <el-option label="64" value="64" />
                <el-option label="128" value="128" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="交换空间(GB)">
              <el-input-number v-model="advancedParams.swapSpace" :min="0" :step="0.5" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="KV缓存数据类型">
              <el-select v-model="advancedParams.kvCacheDtype" placeholder="选择KV缓存数据类型" class="google-select">
                <el-option label="自动" value="auto" />
                <el-option label="fp8" value="fp8" />
                <el-option label="fp8_e4m3" value="fp8_e4m3" />
                <el-option label="fp8_e5m2" value="fp8_e5m2" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="CPU卸载(GB)">
              <el-input-number v-model="advancedParams.cpuOffloadGb" :min="0" :step="0.5" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="启用前缀缓存">
              <el-switch v-model="advancedParams.enablePrefixCaching" class="google-switch" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="调度器">
          <el-form :model="advancedParams" label-width="140px" size="small">
            <el-form-item label="最大批处理Token">
              <el-input-number v-model="advancedParams.maxNumBatchedTokens" :min="1" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="最大序列数">
              <el-input-number v-model="advancedParams.maxNumSeqs" :min="1" controls-position="right" class="google-input-number" />
            </el-form-item>
            
            <el-form-item label="调度策略">
              <el-select v-model="advancedParams.schedulingPolicy" placeholder="选择调度策略" class="google-select">
                <el-option label="先到先服务" value="fcfs" />
                <el-option label="优先级" value="priority" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="启用分块预填充">
              <el-switch v-model="advancedParams.enableChunkedPrefill" class="google-switch" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 应用参数按钮 -->
    <div class="action-container">
      <button class="google-button primary" @click="applyAdvancedParams">
        <span class="google-button-content">
          <i class="el-icon-check"></i>
          应用参数
        </span>
      </button>
      <button class="google-button secondary" @click="resetAdvancedParams" v-if="hasAppliedParams">
        <span class="google-button-content">
          <i class="el-icon-refresh-left"></i>
          删除所有参数
        </span>
      </button>
    </div>
    
    <!-- 当前应用的参数列表 -->
    <div class="applied-params" v-if="modelValue.extraArgs && modelValue.extraArgs.length > 0">
      <el-divider content-position="center">
        <span class="divider-content">已应用参数</span>
      </el-divider>
      
      <div class="params-list">
        <el-tag 
          v-for="(arg, index) in modelValue.extraArgs" 
          :key="index"
          class="param-tag"
          closable
          @close="removeParam(index)"
          effect="light"
        >
          {{ arg }}
        </el-tag>
      </div>
      
      <div class="batch-actions" v-if="modelValue.extraArgs.length > 1">
        <button class="google-button danger" @click="resetAdvancedParams">
          <span class="google-button-content">
            <i class="el-icon-delete"></i>
            <span>删除全部参数</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps(['modelValue', 'rules'])
const emit = defineEmits(['update:modelValue'])
const { modelValue } = toRefs(props)

// 高级参数状态
const advancedParams = ref({
  // 模型选项
  dtype: 'auto',
  quantization: 'None',
  trustRemoteCode: false,
  
  // 并行设置
  pipelineParallelSize: 1,
  dataParallelSize: 1,
  enableExpertParallel: false,
  
  // 内存管理
  blockSize: '32',
  swapSpace: 0,
  kvCacheDtype: 'auto',
  cpuOffloadGb: 0,
  enablePrefixCaching: false,
  
  // 调度器
  maxNumBatchedTokens: 1024,
  maxNumSeqs: 256,
  schedulingPolicy: 'fcfs',
  enableChunkedPrefill: false
})

// 计算属性：是否有已应用的参数
const hasAppliedParams = computed(() => {
  return modelValue.value.extraArgs && modelValue.value.extraArgs.length > 0
})

// 将高级参数应用到extraArgs中
function applyAdvancedParams() {
  // 初始化参数数组（如果不存在）
  if (!modelValue.value.extraArgs) {
    modelValue.value.extraArgs = []
  }
  
  // 清空当前的自定义参数列表，准备添加新的参数
  modelValue.value.extraArgs = []
  
  // 添加模型选项
  if (advancedParams.value.dtype !== 'auto') {
    modelValue.value.extraArgs.push(`--dtype ${advancedParams.value.dtype}`)
  }
  
  if (advancedParams.value.quantization !== 'None') {
    modelValue.value.extraArgs.push(`--quantization ${advancedParams.value.quantization}`)
  }
  
  if (advancedParams.value.trustRemoteCode) {
    modelValue.value.extraArgs.push('--trust-remote-code')
  }
  
  // 添加并行设置
  if (advancedParams.value.pipelineParallelSize > 1) {
    modelValue.value.extraArgs.push(`--pipeline-parallel-size ${advancedParams.value.pipelineParallelSize}`)
  }
  
  if (advancedParams.value.dataParallelSize > 1) {
    modelValue.value.extraArgs.push(`--data-parallel-size ${advancedParams.value.dataParallelSize}`)
  }
  
  if (advancedParams.value.enableExpertParallel) {
    modelValue.value.extraArgs.push('--enable-expert-parallel')
  }
  
  // 添加内存管理
  modelValue.value.extraArgs.push(`--block-size ${advancedParams.value.blockSize}`)
  
  if (advancedParams.value.swapSpace > 0) {
    modelValue.value.extraArgs.push(`--swap-space ${advancedParams.value.swapSpace}`)
  }
  
  if (advancedParams.value.kvCacheDtype !== 'auto') {
    modelValue.value.extraArgs.push(`--kv-cache-dtype ${advancedParams.value.kvCacheDtype}`)
  }
  
  if (advancedParams.value.cpuOffloadGb > 0) {
    modelValue.value.extraArgs.push(`--cpu-offload-gb ${advancedParams.value.cpuOffloadGb}`)
  }
  
  if (advancedParams.value.enablePrefixCaching) {
    modelValue.value.extraArgs.push('--enable-prefix-caching')
  }
  
  // 添加调度器设置
  modelValue.value.extraArgs.push(`--max-num-batched-tokens ${advancedParams.value.maxNumBatchedTokens}`)
  modelValue.value.extraArgs.push(`--max-num-seqs ${advancedParams.value.maxNumSeqs}`)
  modelValue.value.extraArgs.push(`--scheduling-policy ${advancedParams.value.schedulingPolicy}`)
  
  if (advancedParams.value.enableChunkedPrefill) {
    modelValue.value.extraArgs.push('--enable-chunked-prefill')
  }
  
  ElMessage.success('已成功应用高级参数')
}

// 删除单个参数
function removeParam(index) {
  if (modelValue.value.extraArgs && index >= 0 && index < modelValue.value.extraArgs.length) {
    const removedParam = modelValue.value.extraArgs[index]
    modelValue.value.extraArgs.splice(index, 1)
    ElMessage.info(`已删除参数: ${removedParam}`)
  }
}

// 重置所有应用的参数
function resetAdvancedParams() {
  if (modelValue.value.extraArgs && modelValue.value.extraArgs.length > 0) {
    modelValue.value.extraArgs = []
    ElMessage.success('已清空所有高级参数')
  }
}
</script>

<style scoped>
.param-form-container {
  padding: 0;
}

.param-form {
  padding: 0;
}

.form-item-with-tip {
  margin-bottom: 20px;
}

.input-with-tip {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-wrapper {
  width: 100%;
}

.form-tooltip {
  color: #5f6368;
  cursor: pointer;
  transition: color 0.3s;
}

.form-tooltip:hover {
  color: #e64240;
}

.google-input {
  width: 100%;
}

.google-input :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dadce0 inset !important;
  border-radius: 4px;
  padding: 0 12px;
}

.google-input :deep(.el-input__inner) {
  height: 36px;
}

.google-input :deep(.el-input__wrapper:focus-within) {
  box-shadow: 0 0 0 2px rgba(230, 66, 64, 0.2), 0 0 0 1px #e64240 inset !important;
}

.number-input {
  width: 180px;
}

/* 修复el-input-number重复框的问题 */
.google-input-number {
  --el-color-primary: #e64240;
  width: 180px;
}

.google-input-number :deep(.el-input__wrapper) {
  padding: 0;
  box-shadow: 0 0 0 1px #dadce0 inset !important;
  border-radius: 4px;
}

.google-input-number :deep(.el-input__inner) {
  height: 36px;
  text-align: center;
}

.google-input-number :deep(.el-input-number__decrease),
.google-input-number :deep(.el-input-number__increase) {
  border: none;
  background-color: transparent;
  color: #5f6368;
  height: 18px;
  width: 32px;
  line-height: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-input-number :deep(.el-input-number__increase) {
  border-bottom: 1px solid #dadce0;
  top: 0;
  right: 0;
}

.google-input-number :deep(.el-input-number__decrease) {
  top: 18px;
  right: 0;
}

.google-input-number :deep(.el-input-number__decrease:hover),
.google-input-number :deep(.el-input-number__increase:hover) {
  color: #e64240;
  background-color: rgba(230, 66, 64, 0.04);
}

.slider-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.custom-slider {
  margin-right: 20px;
}

.slider-hint {
  font-size: 0.8rem;
  color: #5f6368;
  margin-top: 4px;
}

.divider-content {
  font-size: 0.95rem;
  color: #202124;
  font-weight: 500;
}

.advanced-params-section {
  margin-top: 24px;
  margin-bottom: 24px;
}

.param-tabs {
  margin-top: 16px;
}

.action-container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 16px;
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

.google-button.danger {
  background-color: #ea4335;
  color: white;
}

.google-button.primary:hover {
  background-color: #c21f20;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-button.secondary:hover {
  background-color: #dadce0;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-button.danger:hover {
  background-color: #d93025;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.google-button:active {
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
}

.google-button-content {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1;
}

.google-button-ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

/* 应用参数列表样式 */
.applied-params {
  margin-top: 24px;
}

.params-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.param-tag {
  background-color: #fdeaea;
  color: #e64240;
  border: none;
  font-family: 'Roboto Mono', monospace;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.param-tag:hover {
  background-color: #fad1d1;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
}

.param-tag .close-icon {
  margin-left: 4px;
  cursor: pointer;
  color: #5f6368;
}

.param-tag .close-icon:hover {
  color: #d93025;
}

.batch-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.text-button {
  background: transparent;
  color: #5f6368;
  padding: 0;
  min-width: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: none;
  font-size: 13px;
}

.text-button:hover {
  background: transparent;
  color: #e64240;
  box-shadow: none;
}

/* Google 风格选择器 */
.google-select {
  --el-color-primary: #e64240;
}

.google-select :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dadce0 inset !important;
  border-radius: 4px;
}

.google-select :deep(.el-input__wrapper:focus-within) {
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2), 0 0 0 1px #1a73e8 inset !important;
}

/* Google 风格滑块 */
.google-slider {
  --el-color-primary: #e64240;
}

/* Google 风格标签页 */
.google-tabs :deep(.el-tabs__header) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dadce0;
}

.google-tabs :deep(.el-tabs__item) {
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 14px;
  color: #5f6368;
  height: 48px;
  line-height: 48px;
}

.google-tabs :deep(.el-tabs__item.is-active) {
  color: #e64240;
  font-weight: 500;
}

.google-tabs :deep(.el-tabs__active-bar) {
  background-color: #e64240;
  height: 3px;
}

/* Google 风格开关 */
.google-switch {
  --el-switch-on-color: #e64240;
}

@media (max-width: 768px) {
  .number-input {
    width: 100%;
  }
  
  .action-container {
    flex-direction: column;
  }
}
</style> 
 
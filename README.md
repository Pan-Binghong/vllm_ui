# 上海联通模型管理平台 (VLLM Web UI)

![上海联通模型管理平台](assets/screenshot.png)

一个基于Vue3和Node.js开发的Web UI，用于简化大型语言模型的部署和管理。专为vLLM（高性能大型语言模型推理框架）设计，提供了直观的图形界面，使模型启动和参数配置变得简单高效。

## ✨ 特性

- 🖥️ 美观的Material Design风格界面
- 📊 参数可视化配置，避免命令行复杂操作
- 🚀 支持多任务并行管理
- ⚙️ 支持vLLM全部启动参数的可视化配置
- 📝 提供实时日志查看功能
- 🔄 支持一键复制生成的命令

## 🛠️ 技术栈

- 前端：Vue 3 + TypeScript + Vite + Element Plus
- 后端：Node.js + Express

## 📋 先决条件

- Node.js 16.0+
- NPM 8.0+ 或 Yarn 1.22+
- Python 3.8+ (用于vLLM运行环境)
- CUDA工具包 (支持GPU加速)

## 📦 安装步骤

### 克隆仓库

```bash
git clone https://github.com/yourusername/vllm-webui.git
cd vllm-webui
```

### 后端部署

1. 安装依赖
   ```bash
   npm install
   ```
2. 启动后端服务
   ```bash
   npm start
   ```
   默认监听3001端口。

### 前端部署

1. 进入前端项目目录
   ```bash
   cd src/vllm_webui
   ```
2. 安装依赖
   ```bash
   npm install
   ```
3. 开发模式启动
   ```bash
   npm run dev
   ```
4. 生产环境构建
   ```bash
   npm run build
   ```

## 🔧 配置选项

### 环境变量

可以通过创建`.env`文件来配置以下选项：

```
# 后端API端口
API_PORT=3001

# 日志路径
LOG_PATH=./logs
```

### 自定义vLLM安装路径

如果vLLM不在默认路径，可以在启动时指定路径：

```bash
VLLM_PATH=/path/to/vllm npm start
```

## 🚀 使用指南

1. 访问前端页面：http://localhost:5173/ (开发模式) 或 http://localhost:3001/ (生产模式)
2. 点击"新增模型任务"按钮创建新的模型部署任务
3. 填写必要的参数（模型路径、硬件配置等）
4. 在高级参数选项卡中配置更多详细参数
5. 点击"应用参数"生成命令
6. 点击"启动"按钮执行部署

## 📋 支持的vLLM参数

支持vLLM官方文档中的所有参数配置，包括但不限于：

- 模型选项：数据类型、量化方式、信任远程代码等
- 并行设置：张量并行、流水线并行、数据并行、专家并行等
- 内存管理：块大小、交换空间、KV缓存类型等
- 调度器设置：批处理Token、最大序列数、调度策略等

详细参数说明请参考[vLLM官方文档](https://docs.vllm.ai/en/latest/serving/engine_args.html)

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议。请按以下步骤操作：

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

## 📜 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

如有问题或建议，请通过Issues或以下方式联系我们：

- 邮箱：your.email@example.com
- 网站：https://your-website.com

## 📚 参考资料

- [vLLM官方文档](https://docs.vllm.ai/)
- [Vue 3文档](https://vuejs.org/)
- [Element Plus组件库](https://element-plus.org/) 
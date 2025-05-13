import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/start-vllm', (req, res) => {
  const { modelPath, tensorParallel, gpuUtil, maxModelLen, extraArgs } = req.body;
  if (!modelPath) return res.status(400).json({ error: '模型路径必填' });

  let args = [
    'serve',
    modelPath,
    '--tensor-parallel-size', tensorParallel,
    '--gpu-memory-utilization', gpuUtil,
    '--max-model-len', maxModelLen
  ];
  if (extraArgs && Array.isArray(extraArgs)) args = args.concat(extraArgs);

  const vllm = spawn('vllm', args);

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked'
  });

  vllm.stdout.on('data', (data) => res.write(data));
  vllm.stderr.on('data', (data) => res.write(data));
  vllm.on('close', (code) => res.end(`\n进程退出，代码: ${code}`));
});

app.listen(3001, () => console.log('后端服务已启动，端口3001')); 
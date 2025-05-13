import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // 允许所有域名访问，包括ngrok域名
    host: true,
    cors: true,
    hmr: {
      clientPort: 443
    },
    proxy: {
      // 如果有需要代理的API请求可以在这里配置
    },
    // 配置允许的域名(包括显式添加错误信息中提到的ngrok域名)
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '43d2-240e-86c-48-74a-b097-52b3-9faa-e0ee.ngrok-free.app',
      '.ngrok-free.app', // 允许所有ngrok-free.app的子域名
      '.ngrok.io'
    ]
  }
})

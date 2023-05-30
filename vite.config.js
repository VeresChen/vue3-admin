import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import path from "path"
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 指定别名
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

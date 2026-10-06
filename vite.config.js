import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // 'src/styles' is a load path, so every <style lang="scss"> can just do
        // @use 'abstracts' as * — no absolute path, so it survives spaces/renamed folders.
        loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
        // tokens + mixins auto-injected into every component's <style lang="scss">
        // additionalData: `@use "abstracts" as *;`,
        additionalData: `@use 'sass:color';\n@use "abstracts" as *;` // keep your existing line as it is
      }
    }
  }
})
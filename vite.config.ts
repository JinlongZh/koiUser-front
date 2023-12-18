import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from "path";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
    // 注册所有的svg文件生成svg雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")], // icon存放的目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__" // svg的id
    })

  ],
  resolve: {
    // src文件夹配置别名
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/assets/element/index.scss" as *;
        `,
      }
    }
  },
  server: {
    proxy: {
      '/app-api': {
        target: 'http://localhost:48080',
        changeOrigin: true,
      },
    }
  }
})

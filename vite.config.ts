/// <reference types="vitest" />
import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import Unocss from "./config/unocss";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

export default defineConfig({
  plugins: [
    vue(), // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    // 添加UnoCSS插件
    Unocss()
  ],
  // 添加库模式配置
  build: {
    rollupOptions,
    minify: false,
    lib: {
      entry: "./src/entry.ts",
      name: "SmartyUI",
      fileName: "smarty-ui",
      // 导出模块格式
      // @ts-ignore
      formats: ["esm", "umd", "iife"],
    },
  },
  // vitest配置
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
});

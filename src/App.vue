<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { ref, provide } from "vue"

useAppStore().initTheme() // 初始化 theme
const locale = zhCn // element-plus 设置为中文
let isRouterAlive = ref(true)

const reload = async () => {
  console.log(reload)
  isRouterAlive.value = false
  // await nextTick()
  // debugger
  setTimeout(() => {
    isRouterAlive.value = true
  }, 100)
}
provide("reload", reload)
</script>

<template>
  <ElConfigProvider :locale="locale">
    <router-view v-if="isRouterAlive" />
  </ElConfigProvider>
</template>

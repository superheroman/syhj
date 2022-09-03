<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue"
// import { useUserStore } from "@/store/modules/user"
import AdminDashboard from "./admin/index.vue"
import EditorDashboard from "./editor/index.vue"

const currentRole = ref("")
let userStorage = window.sessionStorage.getItem("user")
let userInfo: any = userStorage ? JSON.parse(userStorage) : {}
const roles = computed(() => {
  return userInfo.userRole?.items[0]?.name
})

onBeforeMount(() => {
  if (!roles.value?.includes("项目经理")) {
    currentRole.value = "editor"
  } else {
    currentRole.value = "admin"
  }
})
</script>

<template>
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>

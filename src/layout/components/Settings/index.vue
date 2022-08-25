<script lang="ts" setup>
import { reactive, watch, ref } from "vue"
import { useSettingsStore } from "@/store/modules/settings"
import { useProductStore } from "@/store/modules/productList"
const settingsStore = useSettingsStore()
const productStore = useProductStore()
let productId = ref(0)
const state = reactive({
  fixedHeader: settingsStore.fixedHeader,
  showTagsView: settingsStore.showTagsView,
  showSidebarLogo: settingsStore.showSidebarLogo,
  showThemeSwitch: settingsStore.showThemeSwitch,
  showScreenfull: settingsStore.showScreenfull,
  productList: productStore.productList
})

watch(
  () => state.fixedHeader,
  (value) => {
    settingsStore.changeSetting({
      key: "fixedHeader",
      value
    })
  }
)
watch(
  () => state.showTagsView,
  (value) => {
    settingsStore.changeSetting({
      key: "showTagsView",
      value
    })
  }
)
watch(
  () => state.showSidebarLogo,
  (value) => {
    settingsStore.changeSetting({
      key: "showSidebarLogo",
      value
    })
  }
)
watch(
  () => state.showThemeSwitch,
  (value) => {
    settingsStore.changeSetting({
      key: "showThemeSwitch",
      value
    })
  }
)
watch(
  () => state.showScreenfull,
  (value) => {
    settingsStore.changeSetting({
      key: "showScreenfull",
      value
    })
  }
)

watch(
  () => productId,
  (productId) => {
    console.log(productId.value)
    window.sessionStorage.setItem("productId", String(productId.value))
  }
)
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">零件切换</h3>
      <el-radio-group v-model="productId" size="large">
        <div style="margin-bottom: 10px" v-for="item in productStore.productList" :key="item.id">
          <el-radio :label="item.id" border>{{ item.product }}</el-radio>
        </div>
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
  }
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>

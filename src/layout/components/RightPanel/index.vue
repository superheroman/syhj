<script lang="ts" setup>
// import { Setting } from "@element-plus/icons-vue"
import { ref, reactive, onMounted, watch } from "vue"
import { useProductStore } from "@/store/modules/productList"
import getQuery from "@/utils/getQuery"
import { useRoute, useRouter } from "vue-router"
import { wahiteRotes } from "./common/const"
import IntroJs from "intro.js" // introjs库
import "intro.js/introjs.css" // introjs默认css样式
// introjs还提供了多种主题，可以通过以下方式引入
// import "intro.js/themes/introjs-modern.css"

defineProps({
  buttonTop: {
    type: Number,
    default: 250
  }
})

const show = ref(false)
let showPanel = ref(false)

const emit = defineEmits(["change"])
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const state = reactive({
  productId: 0,
  auditFlowId: ""
})

watch(
  () => router.currentRoute.value.name,
  (oldV, newV) => {
    console.log(oldV, newV, "监听路由变化")
    // 判断当前页面路由是否在白名单内
    if (wahiteRotes.includes(oldV)) {
      showPanel.value = true
      init()
    } else showPanel.value = false
  }
)

onMounted(() => {
  // 判断当前页面路由是否在白名单内
  if (wahiteRotes.includes(router.currentRoute.value.name)) {
    showPanel.value = true
    const intro = IntroJs().setOptions({
      steps: [
        {
          element: document.querySelector(".handle-button"),
          intro: "录入零件数据前请先选择零件"
        }
      ]
    })
    intro.start()
  } else showPanel.value = false
})

const init = async () => {
  // 未执行todocenter里的跳转时打开会造成state.auditFlowId为undefined
  const { productId, auditFlowId } = getQuery()
  if (auditFlowId) {
    await productStore.setProductList(Number(auditFlowId))
  }
  if (productId) {
    //如url中存在productId则选中
    state.productId = Number(productId)
    window.sessionStorage.setItem("productId", String(state.productId))
  } else {
    const intro = IntroJs().setOptions({
      steps: [
        {
          element: document.querySelector(".handle-button"),
          intro: "录入零件数据前请先选择零件"
        }
      ]
    })
    intro.start()
  }
}
// // 监听路由变化
// onBeforeRouteUpdate((to) => {
//   console.log(to, "onBeforeRouteUpdate")
// })

const handleChange = (productId: any) => {
  let { query } = route
  query.productId = productId
  let newQuery = Object.assign({ productId }, { ...query })
  productStore.setProductId(productId)
  window.sessionStorage.setItem("productId", productId)
  router.push({
    path: route.path,
    query: newQuery
  })
  emit("change")
}
</script>

<template>
  <div>
    <div class="handle-button" :style="{ top: buttonTop + 'px' }" @click="show = true" v-if="showPanel">
      <span>零件列表</span>
    </div>
    <el-drawer v-model="show" size="300px" :with-header="false">
      <div class="drawer-container">
        <div>
          <h3 class="drawer-title">零件切换</h3>
          <el-radio-group v-model="state.productId" size="large" @change="handleChange">
            <div style="margin-bottom: 10px" v-for="item in productStore.productList" :key="item.id">
              <el-radio :label="item.id" border>{{ item.product }}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 60px;
  height: 48px;
  background-color: #152d3d;
  position: absolute;
  right: 15px;
  text-align: center;
  font-size: 14px;
  // border-radius: 6px 0 0 6px !important;
  border-radius: 6px !important;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
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

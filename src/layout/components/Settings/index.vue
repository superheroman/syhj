<script lang="ts" setup>
import { reactive, onMounted } from "vue"
import { useProductStore } from "@/store/modules/productList"
import getQuery from "@/utils/getQuery"
import { useRoute } from "vue-router"
// const reload: any = inject("reload")

const route = useRoute()

// const router = useRouter()

const productStore = useProductStore()
const state = reactive({
  productId: "",
  productList: productStore.productList,
  auditFlowId: ""
})

onMounted(async () => {
  let { auditFlowId, productId } = getQuery()
  console.log("onMounted")
  state.auditFlowId = String(auditFlowId)
  if (auditFlowId) {
    await productStore.setProductList(Number(auditFlowId))
    state.productList = productStore.productList
  }
  if (productId) {
    state.productId = String(productId)
    console.log(state.productId)
  }
})

// watch(
//   () => state.productId,
//   (productId) => {
//     productStore.setProductId(productId)
//     window.history.replaceState(
//       { productId },
//       "",
//       `${route.path}?auditFlowId=${state.auditFlowId}&productId=${productId}`
//     )
//     reload()
//   }
// )
const emit = defineEmits(["change"])

const handleChange = (productId: any) => {
  console.log(productId)
  productStore.setProductId(productId)
  window.history.replaceState(
    { productId },
    "",
    `${route.path}?auditFlowId=${state.auditFlowId}&productId=${productId}`
  )
  emit("change")
}
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">零件切换</h3>
      <el-radio-group v-model="state.productId" size="large" @change="handleChange">
        <div style="margin-bottom: 10px" v-for="item in state.productList" :key="item.id">
          <el-radio :label="item.id + ''" border>{{ item.product }}</el-radio>
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

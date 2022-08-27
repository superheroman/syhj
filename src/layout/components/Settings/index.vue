<script lang="ts" setup>
import { reactive, watch, onMounted } from "vue"
import { useProductStore } from "@/store/modules/productList"
import getQuery from "@/utils/getQuery"
// import { useRoute, useRouter } from "vue-router"
// const reload: any = inject("reload")

// const route = useRoute()

// const router = useRouter()

const productStore = useProductStore()
const state = reactive({
  productId: "",
  productList: productStore.productList
})

onMounted(async () => {
  let { auditFlowId } = getQuery()
  console.log("onMounted")
  if (auditFlowId) {
    await productStore.setProductList(Number(auditFlowId))
    state.productList = productStore.productList
  }
})

watch(
  () => state.productId,
  (productId) => {
    productStore.setProductId(productId)
    debugger
    window.history.replaceState({ productId }, "")
    // reload()
    // route.query.productId = productId
    // route.path
    // debugger
    // router.replace({
    //   path: route.path,
    //   query: route.query
    // })
    // console.log(route.query)
  }
)
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">零件切换</h3>
      <el-radio-group v-model="state.productId" size="large">
        <div style="margin-bottom: 10px" v-for="item in state.productList" :key="item.id">
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

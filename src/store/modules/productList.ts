import store from "@/store"
import { defineStore } from "pinia"
import { getProductByAuditFlowId } from "@/views/productList/service"

interface ProductState {
  productList: any[]
}

export const useProductStore = defineStore({
  id: "productList",
  state: (): ProductState => {
    return {
      productList: []
    }
  },
  actions: {
    async setProductList(id: number) {
      const res: any = await getProductByAuditFlowId(id)
      this.productList = res.result
    }
  }
})

/** 在 setup 外使用 */
export function useProductStoreHook() {
  return useProductStore(store)
}

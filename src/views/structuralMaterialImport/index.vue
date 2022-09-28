<template>
  <div class="electronic-import">
    <CustomerSpecificity />
    <div class="electronic-import__btn-container">
      <el-form :inline="true">
        <el-form-item label="">
          <el-upload
            :action="$baseUrl + '/api/services/app/StructionBom/LoadExcel'"
            :on-success="handleSuccess"
            show-file-list
            :on-progress="handleGetUploadProgress"
            :on-error="handleUploadError"
          >
            <el-button type="primary">结构料上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="downLoadTemplate">结构料模版下载</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-upload
            :action="$baseUrl + '/api/services/app/FileCommonService/UploadFile'"
            :on-success="handleSuccess3D"
            show-file-list
          >
            <el-button type="primary">附件上传：3D爆炸图</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <h5>结构料导入</h5>
    <el-table :data="data.tableData" border style="width: 100%" height="700">
      <el-table-column prop="categoryName" label="物料大类" width="180" />
      <el-table-column prop="typeName" label="物料种类" width="180" />
      <el-table-column prop="isInvolveItem" label="是否涉及" width="180" />
      <el-table-column prop="drawingNumName" label="图号名称" width="180" />
      <el-table-column prop="sapItemNum" label="物料编号" width="180" />
      <el-table-column prop="assemblyQuantity" label="装配数量" width="180" />
      <el-table-column prop="overallDimensionSize" label="外形尺寸mm" width="180" />
      <el-table-column prop="materialName" label="材料名称" width="180" />
      <el-table-column prop="weightNumber" label="重量" width="180" />
      <el-table-column prop="moldingProcess" label="成型工艺" width="180" />
      <el-table-column prop="isNewMouldProduct" label="是否新开模" width="180" />
      <el-table-column prop="secondaryProcessingMethod" label="二次加工方法" width="180" />
      <el-table-column prop="surfaceTreatmentMethod" label="表面处理" width="180" />
      <el-table-column prop="dimensionalAccuracyRemark" label="关键尺寸精度及重要要求" width="200" />
    </el-table>

    <el-card>
      <template #header>
        <div>物流基础信息</div>
      </template>
      <el-form :model="data.logisticsForm" inline>
        <!-- <h5>物流基础信息</h5> -->
        <h6>外包装体积</h6>
        <el-form-item label="外包装长">
          <el-input v-model="data.logisticsForm.outerPackagingLength">
            <template #append>cm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="外包装宽">
          <el-input v-model="data.logisticsForm.outerPackagingWidth">
            <template #append>cm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="外包装高">
          <el-input v-model="data.logisticsForm.outerPackagingHeight">
            <template #append>cm</template>
          </el-input>
        </el-form-item>
        <h6>重量</h6>
        <el-form-item label="单个产品重量">
          <el-input v-model="data.logisticsForm.singleProductWeight">
            <template #append>kg</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单箱数量">
          <el-input v-model="data.logisticsForm.singleBoxQuantity">
            <template #append>pcs</template>
          </el-input>
        </el-form-item>
        <h5>包装基础信息</h5>
        <h6>内包装体积</h6>
        <el-form-item label="内包装长">
          <el-input v-model="data.logisticsForm.innerPackagingLength">
            <template #append>mm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="内包装宽">
          <el-input v-model="data.logisticsForm.innerPackagingWidth">
            <template #append>mm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="内包装高">
          <el-input v-model="data.logisticsForm.innerPackagingHeight">
            <template #append>mm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否打托">
          <el-select v-model="data.logisticsForm.isHit" placeholder="Select">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="每托盘箱数">
          <el-input v-model="data.logisticsForm.boxesPerPallet">
            <template #append> 箱/托</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单箱包装数量">
          <el-input v-model="data.logisticsForm.quantityPerBox">
            <template #append> PCS/箱</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="data.logisticsForm.remarks" type="textarea" />
        </el-form-item>
      </el-form>
      <div style="float: right; margin: 20px 0">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue"
import type { UploadProps } from "element-plus"
import { ElMessage, ElLoading } from "element-plus"
import {
  SaveStructionBom,
  SaveBOM,
  getBomTemplate,
  SaveProductDevelopmentInput,
  GetStructionBom,
  getProductDevelopmentInput
} from "@/api/bom"
import getQuery from "@/utils/getQuery"
import CustomerSpecificity from "@/components/CustomerSpecificity/index.vue"
import { handleGetUploadProgress, handleUploadError } from "@/utils/upload"

let auditFlowId: any = null
let productId: any = null
const data = reactive<any>({
  tableData: [],
  setVisible: false,
  logisticsForm: {
    outerPackagingLength: "",
    outerPackagingWidth: "",
    outerPackagingHeight: "",
    singleProductWeight: "",
    singleBoxQuantity: "",
    innerPackagingLength: "",
    innerPackagingWidth: "",
    innerPackagingHeight: "",
    isHit: "",
    boxesPerPallet: "",
    quantityPerBox: "",
    remarks: "",
    picture3DFileId: ""
  }
})

onMounted(async () => {
  let query = getQuery()
  auditFlowId = Number(query.auditFlowId) || 0
  productId = Number(query.productId) || 0
  if (auditFlowId && productId) {
    let resStruction: any = await GetStructionBom({ auditFlowId, productId })
    data.tableData = resStruction.result
    let resForm: any = await getProductDevelopmentInput({ auditFlowId, productId })
    Object.keys(data.logisticsForm).forEach((key: string) => {
      data.logisticsForm[key] = resForm.result[key]
    })
  }
})
const handleSuccess: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    if (res.result.isSuccess === false) {
      ElMessage({
        message: res.result.message,
        type: "error"
      })
    } else {
      data.tableData = res.result.structureBomDtos
    }
  }
}
const handleSuccess3D: UploadProps["onSuccess"] = (res: any) => {
  console.log(res)
  if (res.success) {
    data.logisticsForm.picture3DFileId = res.result.fileId
    ElMessage({
      message: "上传成功",
      type: "success"
    })
  }
}

const downLoadTemplate = async () => {
  let res: any = await getBomTemplate()
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    let url = URL.createObjectURL(new Blob([blob]))
    let a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = "模板文件.xlsx"
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}
const submit = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "加载中",
    background: "rgba(0, 0, 0, 0.7)"
  })
  try {
    let params: SaveBOM = Object.assign(
      { auditFlowId, productId, structureBomDtos: data.tableData },
      data.logisticsForm
    )
    let res: any = await SaveStructionBom(params)
    let resO: any = await SaveProductDevelopmentInput(params)
    loading.close()
    if (res.success && resO.success) {
      ElMessage({
        message: "保存成功",
        type: "success"
      })
    }
  } catch (error) {
    loading.close()
  }
}
</script>
<style lang="scss" scoped>
.electronic-import {
  &__btn-container {
    margin: 20px 0;
    position: relative;
  }
}
</style>

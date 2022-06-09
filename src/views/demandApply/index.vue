<template>
  <div class="demand-apply">
    <el-form>
      <!-- 拟稿人信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标题:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿人工号:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿公司:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿部门:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="拟稿日期:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="单据编号:">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 项目信息 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="项目名称:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目代码:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户性质:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="终端名称:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="终端性质:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="报价形式:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="样品报价类型:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="SOP时间:">
              <el-date-picker type="date" placeholder="Pick a day" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目周期:">
              <el-date-picker type="date" placeholder="Pick a day" />
            </el-form-item>
          </el-col>
        </el-row>
        <h5>项目走量</h5>
        <h6>终端走量（PCS）</h6>
        <el-table :data="tableData" style="width: 100%" border :summary-method="getSummaries">
          <el-table-column label="车厂" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="车型" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column :label="item.year + ''" width="180" v-for="item in colYears" :key="item.year" sortable>
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="合计" />
        </el-table>
        <h6>模组数量</h6>
        <el-table :data="tableData" style="width: 100%" border :summary-method="getSummaries">
          <el-table-column type="index" width="50" />
          <el-table-column label="客户零件号" width="180">
            <template #default="{ row }">
              <el-input v-model="row.number" />
            </template>
          </el-table-column>
          <el-table-column label="产品名称" width="180">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="产品小类" width="180">
            <template #default="{ row }">
              <el-select v-model="row.value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="市场份额" width="180" prop="name" />
          <el-table-column label="模组搭载率" width="180">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="单车产品数量" width="180">
            <template #default="{ row }">
              <el-input v-model="row.name" />
            </template>
          </el-table-column>
          <el-table-column label="模组总量" prop="name" />
        </el-table>
        <h6>要求</h6>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="年份" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="年降率" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="年度返利要求" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="一次性折让率" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column :label="item.year + ''" width="180" v-for="item in colYears" :key="item.year" sortable>
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模具费分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="治具费分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备费分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信赖性费用分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开发费分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="落地工厂:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 产品信息 -->
      <el-card class="demand-apply__card">
        <h6>产品信息</h6>
        <h6>excel空余</h6>
        <div class="demand-apply__btn-container">
          <el-button type="primary" class="demand-apply__add-btn">新增产品</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="产品名称" width="180" fixed="left" />
          <el-table-column label="Sensor" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="Lens" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="ISP" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="串行芯片" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="线缆" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="LED" width="400">
            <template #default="{ row }">
              <el-input v-model="row.value" placeholder="名称">
                <template #prepend>
                  <el-select v-model="row.type">
                    <el-option value="1">我司推荐</el-option>
                    <el-option value="2">客户指定</el-option>
                    <el-option value="3">客户供应</el-option>
                  </el-select>
                </template>
                <template #append>
                  <el-input v-model="row.value" placeholder="单价" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="制程" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="安装位置" width="180">
            <template #default="{ row }">
              <el-input v-model="row.a" />
            </template>
          </el-table-column>
          <el-table-column label="备注" width="250">
            <template #default="{ row }">
              <el-input v-model="row.prize" />
            </template>
          </el-table-column>
        </el-table>
        <h6>客户指定/供应详情</h6>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="name" label="类型" />
          <el-table-column prop="name" label="零件名称" />
          <el-table-column prop="name" label="核心部件" />
          <el-table-column prop="name" label="品牌/型号" />
          <el-table-column label="单价">
            <template #default="{ row }">
              <el-input v-model="row.prize" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 商务需求 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="贸易方式:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款类型:"> <el-input /> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报价币种:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户目标价:"> <el-input /> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="汇率:"> <el-input /> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户特殊性要求:">
              <el-input type="textarea" :rows="10" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 其它 -->
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="运输方式:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="包装方式:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核价要求完成时间:">
              <el-date-picker type="date" placeholder="Pick a day" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目经理:"> <el-input :suffix-icon="Search" /> </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                multiple
                :limit="1"
              >
                <el-button type="primary">SOR文件上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货地点:">
              <el-input type="textarea" :rows="10" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div class="demand-apply__step">
      <el-steps :active="1" direction="vertical">
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
      </el-steps>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { reactive, ref } from "vue"
import { ref, reactive } from "vue"
// import { useRouter } from "vue-router"
import { Search } from "@element-plus/icons-vue"
// import type { UploadProps, UploadUserFile, ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps } from "element-plus"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"

interface Product {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}
interface SummaryMethodProps<T = Product> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Total Cost"
      return
    }
    const values = data.map((item) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `$ ${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = "N/A"
    }
  })

  return sums
}
const value = ref("")

const colYears = reactive([
  {
    year: 2022,
    value: ""
  },
  {
    year: 2023,
    value: ""
  }
])
const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
]
interface User {
  date: string
  name: string
  address: string
}
// const handleEdit = (index: number, row: User) => {
//   console.log(index, row)
// }
// const handleDelete = (index: number, row: User) => {
//   console.log(index, row)
// }
const tableData: User[] = [
  {
    date: "2022",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2023",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2024",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2025",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2026",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2027",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
]
// const checkList = ref(["selected and disabled", "Option A"])

// const value1 = ref()

// const data = [
//   {
//     value: "1",
//     label: "Level one 1",
//     children: [
//       {
//         value: "1-1",
//         label: "Level two 1-1",
//         children: [
//           {
//             value: "1-1-1",
//             label: "Level three 1-1-1"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     value: "2",
//     label: "Level one 2",
//     children: [
//       {
//         value: "2-1",
//         label: "Level two 2-1",
//         children: [
//           {
//             value: "2-1-1",
//             label: "Level three 2-1-1"
//           }
//         ]
//       },
//       {
//         value: "2-2",
//         label: "Level two 2-2",
//         children: [
//           {
//             value: "2-2-1",
//             label: "Level three 2-2-1"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     value: "3",
//     label: "Level one 3",
//     children: [
//       {
//         value: "3-1",
//         label: "Level two 3-1",
//         children: [
//           {
//             value: "3-1-1",
//             label: "Level three 3-1-1"
//           }
//         ]
//       },
//       {
//         value: "3-2",
//         label: "Level two 3-2",
//         children: [
//           {
//             value: "3-2-1",
//             label: "Level three 3-2-1"
//           }
//         ]
//       }
//     ]
//   }
// ]

// const fileList = ref<UploadUserFile[]>([
//   {
//     name: "food.jpeg",
//     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
//   },
//   {
//     name: "food2.jpeg",
//     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
//   }
// ])

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile)
}

// const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${
//       files.length + uploadFiles.length
//     } totally`
//   )
// }

// const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
//   return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
//     () => true,
//     () => false
//   )
// }
</script>

<style lang="scss" scoped>
.demand-apply {
  &__step {
    margin: 20px 0;
    height: 400px;
  }
  &__card {
    margin: 10px 0;
  }
  &__mass-production-table {
    margin: 20px 0;
  }
  &__btn-container {
    height: 60px;
    position: relative;
  }
  &__add-btn {
    position: absolute;
    right: 0px;
    top: 15px;
  }
}
</style>

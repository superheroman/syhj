<template>
  <div class="demand-apply">
    <el-form>
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="标题:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="拟稿人:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="拟稿人工号:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="拟稿公司:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="拟稿部门:">
              <el-date-picker type="date" placeholder="Pick a day" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="拟稿日期:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="流程编号:">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="客户性质:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="终端:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="终端性质:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="客户指定:">
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="品牌:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="型号:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="价格:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="客户供应:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="客户目标价:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="20">
            <el-form-item label="客户特殊性要求:">
              <el-input type="textarea" :rows="10" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="demand-apply__card">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="年份:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="核价梯度:">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="车厂/车型:">
              <el-tree-select v-model="value1" :data="data" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="产品类别:">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="前视感知" />
                <el-checkbox label="外摄显像" />
                <el-checkbox label="舱内监测" />
                <el-checkbox label="其它类别" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="项目周期:">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="demand-apply__mass-production-table">
          <h4>量产7年内信息</h4>
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="年份" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-icon><timer /></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="终端走量(K)" />
            <el-table-column prop="name" label="终端走量(%)" />
            <el-table-column prop="name" label="年度返利要求" />
            <el-table-column prop="name" label="一次性折让率" />
            <!-- <el-table-column label="Name" width="180">
              <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                  <template #default>
                    <div>name: {{ scope.row.name }}</div>
                    <div>address: {{ scope.row.address }}</div>
                  </template>
                  <template #reference>
                    <el-tag>{{ scope.row.name }}</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column> -->
            <!-- <el-table-column label="Operations">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="销售类型:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="贸易方式:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="付款方式:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="报价币种:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="汇率:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="产品名称:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="模组搭载率:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="单台车搭载数量:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="开发模具是否分摊:">
              <el-select v-model="value" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="落地工厂:"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="客户特殊性要求:">
              <el-input type="textarea" :rows="10" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="交货地点:">
              <el-input type="textarea" :rows="10" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="核价要求完成时间:">
              <el-date-picker type="date" placeholder="Pick a day" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="项目经理:"> <el-input :suffix-icon="Search" /> </el-form-item
          ></el-col>
          <el-col :span="4">
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
                <!-- <template #tip>
                  <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
                </template> -->
              </el-upload>
            </el-form-item></el-col
          >
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
// import { reactive, ref } from "vue"
import { ref } from "vue"
// import { useRouter } from "vue-router"
import { Timer, Search } from "@element-plus/icons-vue"
// import type { UploadProps, UploadUserFile, ElMessage, ElMessageBox } from "element-plus"
import type { UploadProps } from "element-plus"

const value = ref("")
const radio1 = ref("")
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
const checkList = ref(["selected and disabled", "Option A"])

const value1 = ref()

const data = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1"
          }
        ]
      }
    ]
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1"
          }
        ]
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1"
          }
        ]
      }
    ]
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1"
          }
        ]
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1"
          }
        ]
      }
    ]
  }
]

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
  &__card {
    margin: 10px 0;
  }
  &__mass-production-table {
    margin: 20px 0;
  }
}
</style>

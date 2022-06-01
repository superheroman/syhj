<template>
  <div class="electronic-import">
    <el-form :inline="true">
      <el-form-item label="Approved by">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <h5>电子料导入</h5>
    <el-table :data="tableData" style="width: 100%" :span-method="objectSpanMethod">
      <!-- <el-table-column prop="date" label="Date" width="150" /> -->
      <el-table-column label="内包装体积">
        <el-table-column label="长">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="宽">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="高">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <!-- <el-table-column label="重量" width="120" /> -->
      <el-table-column label="外包装体积">
        <el-table-column label="长">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="宽">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="高">
          <template #default="scope">
            <el-input v-model="scope.row.long" type="number">
              <template #append>cm</template>
            </el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="物料种类" />
      <el-table-column label="物料编号">
        <template #default="scope">
          <el-input v-model="scope.row.long" type="number">
            <!-- <template #append>箱</template> -->
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="材料名称">
        <template #default="scope">
          <el-input v-model="scope.row.long">
            <!-- <template #append>箱</template> -->
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="装配数量">
        <template #default="scope">
          <el-input v-model="scope.row.long" type="number">
            <!-- <template #append>个</template> -->
          </el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import { UploadFilled } from "@element-plus/icons-vue"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"
interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}
interface User {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}

const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  } else {
    return {
      rowspan: 0,
      colspan: 0
    }
  }
}
const tableData: User[] = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-08",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-06",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  },
  {
    date: "2016-05-07",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036"
  }
])
</script>

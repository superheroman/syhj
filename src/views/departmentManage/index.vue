<template>
  <div class="departmentManage">
    <div class="departmentManage__btn-container">
      <el-button type="primary" @click="data.dialogVisible = true">创建部门</el-button>
    </div>
    <el-tree :data="data.treeData" :props="defaultProps" @node-click="handleNodeClick" :load="loadNode" lazy>
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button style="margin-left: 8px" @click="editNode(node, data)" type="text"> 修改 </el-button>
            <el-button style="margin-left: 8px" @click="remove(node, data)" type="text"> 删除 </el-button>
          </span>
        </span>
      </template>
    </el-tree>
    <el-dialog v-model="data.dialogVisible" title="部门编辑">
      <el-form :model="data.addForm" ref="addForm">
        <el-form-item label="父级部门" v-if="clickTreeNode.name">
          <el-input v-model="clickTreeNode.name" disabled />
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="data.addForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="data.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDepartment">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from "vue"
import type Node from "element-plus/es/components/tree/src/model/node"
import {
  addDepartment,
  updateDepartment,
  getRootDepartment,
  getDepartmentChildren,
  deleteDerpartment,
  DepartmentInfo
} from "@/api/departmentManage"
import { ElMessage, ElMessageBox } from "element-plus"

interface Tree {
  /**
   * 子部门数量
   */
  childCount?: number
  /**
   * 该部门所属公司的Id，是本表Department的主键
   */
  companyId?: number
  creationTime?: Date
  creatorUserId?: number | null
  deleterUserId?: number | null
  deletionTime?: Date | null
  /**
   * 父部门
   */
  fid?: number | null
  id?: number
  isDeleted?: boolean
  lastModificationTime?: Date | null
  lastModifierUserId?: number | null
  /**
   * 部门等级。根目录是1，根目录的子级是2，子级的子级是3，以此类推
   */
  level?: number
  /**
   * 部门名称
   */
  name: null | string
  /**
   * 用点（.）分隔的路径，部门Id，是根部门，此字段为空。此字段是以Fid计算得到，目的是缩短查询的时间和复杂度。
   */
  pathId?: null | string
  /**
   * 用点（.）分隔的路径，部门名称，是根部门，此字段为空。此字段是以Fid计算得到，目的是缩短查询的时间和复杂度。
   */
  pathName?: null | string
}
// 选中节点
let clickTreeNode: Tree = reactive({
  name: ""
})
const editNode = (node: Node, nodeData: Tree[]) => {
  console.log(nodeData, node)
  data.isEdit = true
  data.addForm.name = node.data.name // 暂时
  data.addForm.fid = node.data.fid
  data.addForm.id = node.data.id
  data.dialogVisible = true
}
const handleNodeClick = (node: Tree) => {
  clickTreeNode.name = node.name
  data.addForm.fid = node.id
  console.log(clickTreeNode)
}
const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  console.log(node)
  // 获取子节点
  if (node.level === 0) {
    return resolve([])
  }
  getDepartmentChildren(node.id)
    .then((res: any) => {
      resolve(res.result.items)
    })
    .catch(() => {
      resolve([])
    })

  // if (node.level > 1) return resolve([])
}
const defaultProps = {
  children: "children",
  label: "name"
}
/**
 * 路由对象
 */
let treeData: Tree[] = []
let data = reactive({
  treeData,
  dialogVisible: false,
  addForm: {
    name: ""
  } as DepartmentInfo,
  isEdit: false
})
let saveDepartment = async () => {
  console.log("save")
  let res: any = null
  if (data.addForm.fid && !data.isEdit) {
    res = await addDepartment(data.addForm)
  } else {
    res = await addDepartment({
      name: data.addForm.name
    })
  }
  if (data.isEdit) {
    res = await updateDepartment(data.addForm)
  }
  console.log(res)
  ElMessage({
    type: "success",
    message: "保存成功"
  })
}
const remove = (node: Node, data: Tree[]) => {
  console.log(node, data)
  ElMessageBox.confirm("确定删除该部门?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      let res = await deleteDerpartment(node.id)
      console.log(res)
      ElMessage({
        type: "success",
        message: "删除成功"
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功"
      })
    })
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  // 获取根节点
  try {
    let res: any = await getRootDepartment()
    res.result.items.forEach((item: Tree) => {
      data.treeData.push(item)
    })
  } catch (error) {
    console.log(error)
  }

  let arr: Tree[] = [
    // {
    //   name: "Level one 1"
    // },
    // {
    //   name: "Level one 2"
    // },
    // {
    //   name: "Level one 3"
    // }
  ]
  arr.forEach((item) => {
    data.treeData.push(item)
  })
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss">
.departmentManage {
  &__btn-container {
    margin: 20px 0;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

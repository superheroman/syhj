/* eslint-disable vue/no-mutating-props */
<template>
  <div>
    <el-select v-model="value" :multiple="multiple" filterable placeholder="请选择姓名">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, watch } from "vue"
import { getUserListByRoleName } from "@/api/user"

const value = ref("")
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  },
  roleName: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["update:modelValue"])
watch(value, (val) => {
  console.log(val, props)
  emit("update:modelValue", val)
})

watch(
  () => props.roleName,
  (val) => {
    console.log(val)
    getList(val)
  }
)

interface user {
  id: number
  name: string
}
const options = ref<user[]>([])

// /**
//  * 路由对象
//  */
// const route = useRoute()
// /**
//  * 路由实例
//  */
// const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})
onBeforeMount(() => {
  getList(props.roleName)
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  // list.value = states.map((item) => {
  //   return { value: `value:${item}`, label: `label:${item}` }
  // })
})
const getList = async (query: string) => {
  let res: any = await getUserListByRoleName(query)
  options.value = res.result.items
}

onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})
</script>
<style scoped lang="scss"></style>

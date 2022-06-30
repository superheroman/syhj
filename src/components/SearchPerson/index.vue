/* eslint-disable vue/no-mutating-props */
<template>
  <div>
    <el-select
      v-model="value"
      :multiple="multiple"
      filterable
      remote
      reserve-keyword
      placeholder="请输入姓名"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, watch } from "vue"
// import { useRoute, useRouter } from "vue-router"
// import { GetUserInput } from "@/api/partEntry"
const value = ref("")
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["update:modelValue"])
watch(value, (val) => {
  console.log(val, props)
  emit("update:modelValue", val)
})
interface ListItem {
  value: string
  label: string
}
const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const loading = ref(false)

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
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
]
const remoteMethod = async (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
    // let res = await GetUserInput()
    // console.log(res)
  } else {
    options.value = []
  }
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

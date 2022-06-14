<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in dashboardPannel" :key="item.title">
          <el-card
            shadow="always"
            class="dashboard__header__item"
            :body-style="{ display: 'flex', 'align-items': 'center', width: '100%' }"
          >
            <img :src="item.img" class="dashboard__header__item__icon" />
            <div class="dashboard__header__item__content">
              <div class="dashboard__header__item__content__title">{{ item.title }}</div>
              <div class="dashboard__header__item__content__vlaue">{{ item.value }}</div>
            </div>
            <div class="dashboard__header__item__percentage" :style="{ color: 'red' }">{{ item.percentage }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="dashboard__body">
      <!-- 总成本图 -->
      <div id="costChart" />
    </div>
    <div class="dashboard__footer">
      <el-row :gutter="100">
        <el-col :span="14">
          <!-- 成本图根据时间 -->
          <div class="dashboard__footer__line-chart">
            <el-form inline>
              <el-form-item label="SOP时间:">
                <el-date-picker type="date" placeholder="Pick a day" />
              </el-form-item>
              <el-form-item label="成本:">
                <el-select v-model="value" placeholder="Select">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <div id="selectCostChart" /></div
        ></el-col>
        <el-col :span="8">
          <!-- 饼图和生成按钮 -->
          <div class="dashboard__footer__pie-chart">
            <div id="percentageCostChart" />
            <el-button type="primary" round size="large" style="width: 400px">生成核价表</el-button>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from "vue"
import iconBlue from "/src/assets/layout/dashboard-icon-blue.svg"
import iconRed from "/src/assets/layout/dashboard-icon-red.svg"
import iconGreen from "/src/assets/layout/dashboard-icon-green.svg"
import iconYellow from "/src/assets/layout/dashboard-icon-yellow.svg"
import * as echarts from "echarts"
// import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive } from "vue"
let data1 = {
  title: {
    text: "总成本"
  },
  tooltip: {},
  xAxis: {
    data: ["SOP", "SOP1", "SOP2", "SOP3", "SOP4"]
  },
  legend: {
    data: ["BOM", "制造", "物流", "损耗"]
  },
  yAxis: {},
  series: [
    {
      name: "BOM",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: "制造",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: "物流",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: "损耗",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: "损耗",
      type: "line",
      smooth: true,
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
let data2 = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true
    }
  ]
}
let data3 = {
  title: {
    text: "Referer of a Website",
    subtext: "Fake Data",
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    left: "left",
    show: false
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}
let chart1: any = null
let chart2: any = null
let chart3: any = null
const initCharts = (id: string, chartOption: any) => {
  // 基于准备好的dom，初始化echarts实例
  let chartEl: HTMLElement | null = document.getElementById(id)
  if (chartEl) {
    var chart = echarts.init(chartEl)
    // 绘制图表
    chart.setOption(chartOption)
    return chart
  }
}
onMounted(() => {
  console.log("onMounted")
  chart1 = initCharts("costChart", data1)
  chart2 = initCharts("selectCostChart", data2)
  chart3 = initCharts("percentageCostChart", data3)
})
onBeforeUnmount(() => {
  console.log("destory")
  chart1.dispose()
  chart2.dispose()
  chart3.dispose()
})
const value = ref("")
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
let dashboardPannel = reactive([
  {
    title: "BOM成本",
    value: "34",
    percentage: "+25%",
    img: iconBlue
  },
  {
    title: "制造成本",
    value: "34",
    percentage: "+25%",
    img: iconRed
  },
  {
    title: "物流成本",
    value: "34",
    percentage: "+25%",
    img: iconGreen
  },
  {
    title: "质量成本",
    value: "34",
    percentage: "+25%",
    img: iconYellow
  }
])
</script>
<style lang="scss" scoped>
.dashboard {
  &__header {
    margin: 20px 0;
    &__item {
      &__content {
        margin-left: 15px;
        min-width: 100px;
        // min-width: 120px;
        &__title {
          font-size: 14px;
          color: grey;
          margin-bottom: 5px;
        }
        &__vlaue {
          font-weight: bold;
        }
      }
      &__percentage {
        margin-left: 20px;
        font-size: 14px;
      }
      &__icon {
        width: 48px;
      }
    }
  }
  #costChart {
    margin: 10px 0;
    height: 400px;
  }
  #selectCostChart {
    margin: 10px 0;
    height: 400px;
  }
  #percentageCostChart {
    margin: 10px 0;
    height: 300px;
  }
}
</style>

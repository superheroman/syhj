export const percentageCostChartData = {
  title: {
    text: "产品成本",
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
      name: "产品成本",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "BOM" },
        { value: 735, name: "损耗" },
        { value: 580, name: "制造" },
        { value: 484, name: "物流" },
        { value: 300, name: "质量" }
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

export const costChartData = {
  title: {
    text: "产品成本利润分布图 - 客户目标价",
    subtext: "",
    left: "center"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    formatter: function (params: any) {
      const tar = params[1]
      return tar.name + "<br/>" + tar.seriesName + " : " + tar.value
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    splitLine: { show: false },
    data: ["BOM", "损耗", "制造", "物流", "质量"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "Placeholder",
      type: "bar",
      stack: "Total",
      itemStyle: {
        borderColor: "transparent",
        color: "transparent"
      },
      emphasis: {
        itemStyle: {
          borderColor: "transparent",
          color: "transparent"
        }
      },
      data: [0, 0, 0, 0, 0]
    },
    {
      name: "利润",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
        position: "inside"
      },
      data: [0, 0, 0, 0, 0]
    }
  ]
}

export const selectCostChartData = {
  xAxis: {
    type: "category",
    data: ["2021", "2022", "2023", "2024", "2025", "2026", "2027"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320, 2000],
      type: "line",
      smooth: true
    }
  ]
}

export const dashboardPannel = [
  {
    title: "BOM成本",
    value: "1"
  },
  {
    title: "损耗成本",
    value: "2"
  },
  {
    title: "制造成本",
    value: "3"
  },
  {
    title: "物流成本",
    value: "4"
  },
  {
    title: "质量成本",
    value: "5"
  }
]

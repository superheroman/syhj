export const percentageCostChartData = {
  title: {
    text: "产品成本",
    subtext: "",
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
        { value: 0, name: "bom成本" },
        { value: 0, name: "损耗成本" },
        { value: 0, name: "制造成本" },
        { value: 0, name: "物流成本" },
        { value: 0, name: "质量成本" }
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
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    splitLine: { show: false },
    data: ["bom成本", "损耗成本", "制造成本", "物流成本", "质量成本", "利润"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)"
      },
      data: [0, 0, 0, 0, 0, 0]
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
      data: [],
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

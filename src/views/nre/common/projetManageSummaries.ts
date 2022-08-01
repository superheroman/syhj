import { HandPieceCostModel, RestsCostModel } from "../data.type"
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults"

// 手板件费用合计
export interface HandPieceSummaryMethodProps<T = HandPieceCostModel> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

// 其他费用合计
export interface RestsCostSummaryMethodProps<T = RestsCostModel> {
  columns: TableColumnCtx<T>[]
  data: T[]
}

// 手板件费用合计
export const getHandPieceCostSummaries = (param: HandPieceSummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 4) {
      sums[index] = "手板件总费用"
      return
    }

    const values = data.map((item) => Number((item.quantity || 0) * (item.unitPrice || 0)))
    if (!values.every((value) => Number.isNaN(value)) && index === 5) {
      sums[index] = `¥ ${values.reduce((prev, curr) => {
        if (!Number.isNaN(curr)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = ""
    }
  })

  return sums
}

// 其他费用
export const getOtherCostSummaries = (param: RestsCostSummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 1) {
      sums[index] = "手板件总费用"
      return
    }

    const values = data.map((item) => Number(item.cost))
    if (!values.every((value) => Number.isNaN(value)) && index === 2) {
      sums[index] = `¥ ${values.reduce((prev, curr) => {
        if (!Number.isNaN(curr)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = ""
    }
  })

  return sums
}

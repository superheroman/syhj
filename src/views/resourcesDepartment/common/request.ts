import { request } from "@/utils/service"
import { ElectronicDto, ConstructionModel } from "../data.type"

// 资源部输入时,加载电子料结构件初始值
export function GetElectronic(data: { id: number }): any {
  return request({
    url: "/api/services/app/ResourceEntering/GetElectronic",
    method: "get",
    data
  })
}

// 计算电子料单价录入
export function PostElectronicMaterialCalculate(data: ElectronicDto[]): any {
  return request({
    url: "/api/services/app/ResourceEntering/PostElectronicMaterialCalculate",
    method: "post",
    data
  })
}
// 计算电子料单价录入 根据原币计算
export function PosToriginalCurrencyCalculate(data: ElectronicDto[]): any {
  return request({
    url: "/api/services/app/ResourceEntering/PosToriginalCurrencyCalculate",
    method: "post",
    data
  })
}

// 电子料单价录入录入确认/提交 有则添加无则修改
export function PostElectronicMaterialEntering(data: {
  isSubmit: number
  electronicDtoList: ElectronicDto[]
  auditFlowId: number
}): any {
  return request({
    url: "/api/services/app/ResourceEntering/PostElectronicMaterialEntering",
    method: "post",
    data
  })
}

// 资源部输入时,加载结构料初始值
export function GetStructural(data: { id: number }): any {
  return request({
    url: "/api/services/app/ResourceEntering/GetStructural",
    method: "get",
    data
  })
}

// 结构件单价录入提交 有则添加无则修改
export function PostStructuralMemberEntering(data: {
  isSubmit: boolean
  structuralMaterialEntering: ConstructionModel[]
  auditFlowId: number
}): any {
  return request({
    url: "/api/services/app/ResourceEntering/PostStructuralMemberEntering",
    method: "post",
    data
  })
}

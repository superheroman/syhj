import { request } from "@/utils/service"

export function getYears(data) {
  return request({
    url: "/api/services/app/LossRateInfo/SaveLossRateInfo",
    method: "post",
    data
  })
}

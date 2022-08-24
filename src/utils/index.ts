import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: any) => {
  if (time == null || time === "") {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
/** 下载excel */
export const downloadFileExcel = (res: any, fileName: string) => {
  const blob = res
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = function () {
    const url = URL.createObjectURL(new Blob([blob]))
    const a = document.createElement("a")
    document.body.appendChild(a) //此处增加了将创建的添加到body当中
    a.href = url
    a.download = `${fileName}.xlsx`
    a.target = "_blank"
    a.click()
    a.remove() //将a标签移除
  }
}

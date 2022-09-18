import { useRouter } from "vue-router"

export default function useJump() {
  const router = useRouter()

  const jumpTodoCenter = () => {
    router.push({
      path: "/todoCenter/index"
    })
  }

  const jumpPage = (path: any, query: any) => {
    router.push({
      path,
      query
    })
  }
  return {
    jumpTodoCenter,
    jumpPage
  }
}

import { useRouter } from "vue-router"

export default function useJump() {
  const router = useRouter()

  const jumpTodoCenter = () => {
    router.push({
      path: "/todoCenter/index"
    })
  }

  return {
    jumpTodoCenter
  }
}

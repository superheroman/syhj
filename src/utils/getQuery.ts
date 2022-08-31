import { useRoute } from "vue-router"
function getQuery() {
  const route = useRoute()
  // const { auditFlowId, productId } = route.query
  // const query = {
  //   productId,
  //   auditFlowId
  // }
  console.log(route, "route")
  return route.query
}

export default getQuery

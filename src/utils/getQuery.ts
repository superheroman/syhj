import { useRoute } from "vue-router"
function getQuery() {
  console.log(useRoute, useRoute())
  const route = useRoute()
  // const { auditFlowId, productId } = route.query
  // const query = {
  //   productId,
  //   auditFlowId
  // }
  return route.query
}

export default getQuery

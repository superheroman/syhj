import { useRoute } from "vue-router"
function getQuery() {
  console.log(useRoute, useRoute())
  const route = useRoute()
  const { auditFlowId, productId } = route.query
  const query = {
    productId,
    auditFlowId
  }
  return query
}

export default getQuery

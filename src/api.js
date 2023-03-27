const baseURL = process.env.REACT_APP_BASE_URL
const api = {
  product: (id) => `${baseURL}/product/${id}/`,
  config: (appId) => `${baseURL}/configuration/${appId}/`,
  trl: `${baseURL}/trl`,
}

export default api

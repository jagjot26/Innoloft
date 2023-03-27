import axios from 'axios'
import api from '../../api'

const fetchById = async (productId) => {
  const url = api.product(productId)
  return axios.get(url)
}

const updateById = async (productId, reqData) => {
  const url = api.product(productId)
  return axios.put(url, reqData)
}

const fetchTRLs = async () => {
  const url = api.trl
  return axios.get(url)
}

const productAPI = {
  fetchById,
  updateById,
  fetchTRLs,
}

export default productAPI

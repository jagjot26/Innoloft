import axios from 'axios'
import api from '../api'

const fetchById = async (configId) => {
  const url = api.config(configId)
  return axios.get(url)
}

const configAPI = {
  fetchById,
}

export default configAPI

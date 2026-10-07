import apiClient from './client'

const BASE = '/api/forest/products'

export const productApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

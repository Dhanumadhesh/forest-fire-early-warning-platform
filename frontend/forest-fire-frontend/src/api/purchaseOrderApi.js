import apiClient from './client'

const BASE = '/api/forest/purchase-orders'

export const purchaseOrderApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

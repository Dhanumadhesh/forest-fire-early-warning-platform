import apiClient from './client'

const BASE = '/api/forest/vendor-bills'

export const vendorBillApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

import apiClient from './client'

const BASE = '/api/forest/sensors'

export const sensorApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

import apiClient from './client'

const BASE = '/api/forest/alarms'

export const alarmApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

import apiClient from './client'

const BASE = '/api/forest/budgets'

export const budgetApi = {
  getAll: () => apiClient.get(BASE).then((res) => res.data),
  create: (payload) => apiClient.post(BASE, payload).then((res) => res.data),
}

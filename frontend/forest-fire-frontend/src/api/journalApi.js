import apiClient from './client'

const BASE = '/api/forest/journal-entries'

export const journalApi = {
  getAll: () =>
    apiClient.get(BASE).then((res) => res.data),

  create: (payload) =>
    apiClient.post(BASE, payload).then((res) => res.data),

  remove: (id) =>
    apiClient.delete(`${BASE}/${id}`).then((res) => res.data),
}
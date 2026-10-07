import apiClient from './client'

export const reportApi = {
  getBudgetReport: () =>
    apiClient.get('/api/forest/reports/budget').then((res) => res.data),
  getProfitAndLoss: () =>
    apiClient.get('/api/forest/reports/profit-loss').then((res) => res.data),
  getBalanceSheet: () =>
    apiClient.get('/api/forest/reports/balance-sheet').then((res) => res.data),
}

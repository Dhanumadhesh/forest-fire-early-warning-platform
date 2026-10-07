import React from 'react'
import { reportApi } from '../../api/reportApi'
import { useApi } from '../../hooks/useApi'
import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'
import { LoadingState } from '../../components/ui/LoadingState'
import { ErrorState } from '../../components/ui/ErrorState'
import { HandCoins, TrendingDown, Scale } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function ProfitLoss() {
  const { data, loading, error, refresh } = useApi(reportApi.getProfitAndLoss, [])

  if (loading) return <LoadingState label="Loading profit & loss…" />
  if (error) return <ErrorState message={error} onRetry={refresh} />

  const revenue = Number(data?.totalGrantRevenue) || 0
  const expenses = Number(data?.totalExpenses) || 0
  const net = data?.netResult ?? revenue - expenses

  const chartData = [
    { name: 'Grant Revenue', value: revenue },
    { name: 'Total Expenses', value: expenses },
    { name: 'Net Result', value: net },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={HandCoins} label="Grant Revenue" value={`₹${revenue.toLocaleString()}`} />
        <StatCard icon={TrendingDown} label="Total Expenses" value={`₹${expenses.toLocaleString()}`} tone="alert" />
        <StatCard icon={Scale} label="Net Result" value={`₹${Number(net).toLocaleString()}`} tone={net < 0 ? 'alert' : 'light'} />
      </div>

      <Card>
        <h2 className="mb-4 text-sm font-bold text-forest-800">Revenue vs. Expenses</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dcedE0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#2c6b43" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

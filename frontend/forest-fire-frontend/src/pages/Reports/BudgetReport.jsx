import React from 'react'
import { reportApi } from '../../api/reportApi'
import { useApi } from '../../hooks/useApi'
import { Card } from '../../components/ui/Card'
import { DataTable } from '../../components/ui/DataTable'
import { LoadingState } from '../../components/ui/LoadingState'
import { ErrorState } from '../../components/ui/ErrorState'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

export default function BudgetReport() {
  const { data, loading, error, refresh } = useApi(reportApi.getBudgetReport, [])

  if (loading) return <LoadingState label="Loading budget report…" />
  if (error) return <ErrorState message={error} onRetry={refresh} />

  const rows = data || []
  const chartData = rows.map((r) => ({
    name: r.sector?.name || r.sectorName || `Sector #${r.sectorId ?? '—'}`,
    Allocated: Number(r.allocatedAmount) || 0,
    Spent: Number(r.spentAmount) || 0,
  }))

  return (
    <div className="space-y-5">
      <Card>
        <h2 className="mb-4 text-sm font-bold text-forest-800">Budget Utilization by Sector</h2>
        {chartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-forest-400">No budget report data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcedE0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Allocated" fill="#2c6b43" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Spent" fill="#f9622a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      <DataTable
        emptyMessage="No budget report data available."
        rows={rows}
        columns={[
          { key: 'sector', header: 'Sector', render: (row) => row.sector?.name || row.sectorName || '—' },
          { key: 'budgetYear', header: 'Budget Year' },
          { key: 'allocatedAmount', header: 'Allocated', render: (row) => `₹${Number(row.allocatedAmount || 0).toLocaleString()}` },
          { key: 'spentAmount', header: 'Spent', render: (row) => `₹${Number(row.spentAmount || 0).toLocaleString()}` },
          {
            key: 'remainingAmount',
            header: 'Remaining',
            render: (row) => {
              const remaining = row.remainingAmount ?? (Number(row.allocatedAmount || 0) - Number(row.spentAmount || 0))
              return `₹${Number(remaining).toLocaleString()}`
            },
          },
        ]}
      />
    </div>
  )
}

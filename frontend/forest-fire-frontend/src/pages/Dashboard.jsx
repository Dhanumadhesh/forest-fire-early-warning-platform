import React, { useEffect, useState } from 'react'
import {
  TreePine,
  Radio,
  FlameKindling,
  Siren,
  HandCoins,
  PiggyBank,
  TrendingDown,
  Wallet,
} from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts'

import { sectorApi } from '../api/sectorApi'
import { sensorApi } from '../api/sensorApi'
import { alarmApi } from '../api/alarmApi'
import { dispatchApi } from '../api/dispatchApi'
import { telemetryApi } from '../api/telemetryApi'
import { grantApi } from '../api/grantApi'
import { budgetApi } from '../api/budgetApi'

import { Card, SectionHeader } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'

// The dashboard pulls from several endpoints independently so that one
// failing API (e.g. reports not implemented yet) doesn't blank the whole page.
function useSafeResource(fetcherFn) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  const load = async () => {
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const data = await fetcherFn()
      setState({ data, loading: false, error: null })
    } catch (err) {
      setState({ data: null, loading: false, error: err?.message || 'Failed to load.' })
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...state, reload: load }
}

export default function Dashboard() {
  const sectors = useSafeResource(sectorApi.getAll)
  const sensors = useSafeResource(sensorApi.getAll)
  const alarms = useSafeResource(alarmApi.getAll)
  const dispatches = useSafeResource(dispatchApi.getAll)
  const telemetry = useSafeResource(telemetryApi.getAll)
  const grants = useSafeResource(grantApi.getAll)
  const budgets = useSafeResource(budgetApi.getAll)

  const anyLoading =
    sectors.loading || sensors.loading || alarms.loading || dispatches.loading ||
    telemetry.loading || grants.loading || budgets.loading

  const activeSensors = (sensors.data || []).filter(
    (s) => (s.status || '').toUpperCase() === 'ACTIVE'
  ).length

  const activeAlarms = (alarms.data || []).filter(
    (a) => (a.status || '').toUpperCase() === 'ACTIVE'
  ).length

  const totalGrantAmount = (grants.data || []).reduce(
    (sum, g) => sum + (Number(g.amount) || 0), 0
  )

  const totalAllocated = (budgets.data || []).reduce(
    (sum, b) => sum + (Number(b.allocatedAmount) || 0), 0
  )
  const totalSpent = (budgets.data || []).reduce(
    (sum, b) => sum + (Number(b.spentAmount) || 0), 0
  )
  const totalRemaining = totalAllocated - totalSpent

  const budgetChartData = (budgets.data || []).map((b) => ({
    name: b.forestSector?.name || b.sector?.name || `Budget #${b.id}`,
    Allocated: Number(b.allocatedAmount) || 0,
    Spent: Number(b.spentAmount) || 0,
  }))

  const telemetryChartData = (telemetry.data || [])
    .slice(-12)
    .map((t, idx) => ({
      name: t.recordedAt || t.timestamp || `#${idx + 1}`,
      Temperature: Number(t.temperature) || 0,
      Smoke: Number(t.smokeLevel) || 0,
    }))

  const recentAlarms = [...(alarms.data || [])].slice(-5).reverse()
  const recentDispatches = [...(dispatches.data || [])].slice(-5).reverse()
  const recentTelemetry = [...(telemetry.data || [])].slice(-5).reverse()

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Command Center Overview"
        subtitle="Live operational and financial status across all monitored forest sectors."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TreePine}
          label="Total Forest Sectors"
          value={sectors.error ? '—' : sectors.loading ? '…' : sectors.data?.length ?? 0}
        />
        <StatCard
          icon={Radio}
          label="Active Sensors"
          value={sensors.error ? '—' : sensors.loading ? '…' : activeSensors}
        />
        <StatCard
          icon={FlameKindling}
          label="Active Fire Alarms"
          value={alarms.error ? '—' : alarms.loading ? '…' : activeAlarms}
          tone={activeAlarms > 0 ? 'alert' : 'forest'}
        />
        <StatCard
          icon={Siren}
          label="Ranger Dispatches"
          value={dispatches.error ? '—' : dispatches.loading ? '…' : dispatches.data?.length ?? 0}
        />
        <StatCard
          icon={HandCoins}
          label="Total Grants"
          value={grants.error ? '—' : grants.loading ? '…' : `₹${totalGrantAmount.toLocaleString()}`}
        />
        <StatCard
          icon={PiggyBank}
          label="Allocated Budget"
          value={budgets.error ? '—' : budgets.loading ? '…' : `₹${totalAllocated.toLocaleString()}`}
        />
        <StatCard
          icon={TrendingDown}
          label="Total Expenses"
          value={budgets.error ? '—' : budgets.loading ? '…' : `₹${totalSpent.toLocaleString()}`}
        />
        <StatCard
          icon={Wallet}
          label="Remaining Budget"
          value={budgets.error ? '—' : budgets.loading ? '…' : `₹${totalRemaining.toLocaleString()}`}
          tone={totalRemaining < 0 ? 'alert' : 'light'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-bold text-forest-800">Budget Allocated vs. Spent</h2>
          {budgets.loading ? (
            <LoadingState label="Loading budget data…" />
          ) : budgets.error ? (
            <ErrorState message={budgets.error} onRetry={budgets.reload} />
          ) : budgetChartData.length === 0 ? (
            <EmptyState message="No budgets recorded yet." />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={budgetChartData}>
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

        <Card>
          <h2 className="mb-4 text-sm font-bold text-forest-800">Sensor Telemetry Trends</h2>
          {telemetry.loading ? (
            <LoadingState label="Loading telemetry…" />
          ) : telemetry.error ? (
            <ErrorState message={telemetry.error} onRetry={telemetry.reload} />
          ) : telemetryChartData.length === 0 ? (
            <EmptyState message="No telemetry submitted yet." />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={telemetryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcedE0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Temperature" stroke="#ea4419" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Smoke" stroke="#2c6b43" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <h2 className="mb-3 text-sm font-bold text-forest-800">Recent Fire Alarms</h2>
          {alarms.loading ? (
            <LoadingState label="Loading…" />
          ) : alarms.error ? (
            <ErrorState message={alarms.error} onRetry={alarms.reload} />
          ) : recentAlarms.length === 0 ? (
            <EmptyState message="No fire alarms reported." />
          ) : (
            <ul className="space-y-2">
              {recentAlarms.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-lg bg-forest-50 px-3 py-2 text-sm">
                  <span className="text-forest-700">Alarm #{a.id} · {a.sensor?.sensorName || 'Sensor'}</span>
                  <Badge>{a.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-bold text-forest-800">Recent Ranger Dispatches</h2>
          {dispatches.loading ? (
            <LoadingState label="Loading…" />
          ) : dispatches.error ? (
            <ErrorState message={dispatches.error} onRetry={dispatches.reload} />
          ) : recentDispatches.length === 0 ? (
            <EmptyState message="No dispatches yet." />
          ) : (
            <ul className="space-y-2">
              {recentDispatches.map((d) => (
                <li key={d.id} className="flex items-center justify-between rounded-lg bg-forest-50 px-3 py-2 text-sm">
                  <span className="text-forest-700">{d.rangerTeam || `Dispatch #${d.id}`}</span>
                  <Badge>{d.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 text-sm font-bold text-forest-800">Recent Telemetry</h2>
          {telemetry.loading ? (
            <LoadingState label="Loading…" />
          ) : telemetry.error ? (
            <ErrorState message={telemetry.error} onRetry={telemetry.reload} />
          ) : recentTelemetry.length === 0 ? (
            <EmptyState message="No telemetry yet." />
          ) : (
            <ul className="space-y-2">
              {recentTelemetry.map((t, idx) => (
                <li key={t.id ?? idx} className="flex items-center justify-between rounded-lg bg-forest-50 px-3 py-2 text-sm">
                  <span className="text-forest-700">{t.sensor?.sensorName || 'Sensor'}</span>
                  <span className={`font-semibold ${Number(t.temperature) > 45 ? 'text-alert-600' : 'text-forest-600'}`}>
                    {t.temperature}°C
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}

import React from 'react'
import { alarmApi } from '../api/alarmApi'
import { useApi } from '../hooks/useApi'
import { SectionHeader, Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'
import { DataTable } from '../components/ui/DataTable'
import { FlameKindling, RefreshCcw } from 'lucide-react'

export default function FireAlarms() {
  const { data: alarms, loading, error, refresh } = useApi(alarmApi.getAll, [])

  const activeAlarms = (alarms || []).filter(
    (a) => (a.status || '').toUpperCase() === 'ACTIVE'
  )

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Fire Alarms"
        subtitle="Alarms are created automatically by the backend when telemetry crosses fire thresholds."
        action={
          <button onClick={refresh} className="btn-secondary">
            <RefreshCcw size={15} /> Refresh
          </button>
        }
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <>
          <Card className="border-alert-200 bg-gradient-to-br from-alert-50 to-white">
            <div className="mb-4 flex items-center gap-2">
              <FlameKindling className="text-alert-600" size={20} />

              <h2 className="text-base font-bold text-alert-700">
                ACTIVE FIRE ALARMS
              </h2>

              <span className="ml-auto rounded-full bg-alert-600 px-2.5 py-0.5 text-xs font-bold text-white">
                {activeAlarms.length}
              </span>
            </div>

            {activeAlarms.length === 0 ? (
              <EmptyState message="No active fire alarms. All sectors currently clear." />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {activeAlarms.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-col gap-2 rounded-xl border border-alert-200 bg-white p-4 shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-alert-700">
                        Alarm #{a.id}
                      </span>

                      <Badge tone="redSolid">ACTIVE</Badge>
                    </div>

                    <p className="text-xs text-forest-500">
                      Sensor:{' '}
                      {a.sensor?.sensorName ||
                        `#${a.sensor?.id ?? '—'}`}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-alert-600">
                        {a.temperature}°C
                      </span>

                      <span className="font-semibold text-alert-600">
                        {a.smokeLevel} ppm smoke
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div>
            <h2 className="mb-3 text-sm font-bold text-forest-800">
              All Fire Alarms
            </h2>

            <DataTable
              emptyMessage="No fire alarms recorded yet."
              rows={alarms}
              columns={[
                {
                  key: 'id',
                  header: 'Alarm ID',
                },

                {
                  key: 'sensor',
                  header: 'Sensor',
                  render: (row) =>
                    row.sensor?.sensorName ||
                    `#${row.sensor?.id ?? '—'}`,
                },

                {
                  key: 'temperature',
                  header: 'Temperature (°C)',
                },

                {
                  key: 'smokeLevel',
                  header: 'Smoke Level (ppm)',
                },

                {
                  key: 'status',
                  header: 'Status',
                  render: (row) => <Badge>{row.status}</Badge>,
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  )
}
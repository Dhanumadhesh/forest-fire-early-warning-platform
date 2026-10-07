import React, { useState } from 'react'
import { telemetryApi } from '../api/telemetryApi'
import { sensorApi } from '../api/sensorApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader, Card } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { AlertTriangle } from 'lucide-react'

// Mirrors the backend's automatic fire-alarm rule.
// Temperature > 45°C AND smoke level > 50 ppm.
function isDangerousReading(temperature, smokeLevel) {
  return Number(temperature) > 45 && Number(smokeLevel) > 50
}

// Formats the LocalDateTime received from Spring Boot.
// Example:
// 2026-09-26T14:30:25
// becomes:
// 26/09/2026, 14:30:25
function formatRecordedAt(recordedAt) {
  if (!recordedAt) {
    return '—'
  }

  const value = String(recordedAt)

  // Spring Boot LocalDateTime normally arrives like:
  // 2026-09-26T14:30:25
  const parts = value.split('T')

  if (parts.length === 2) {
    const date = parts[0].split('-')
    const time = parts[1].split(':').slice(0, 3).join(':')

    if (date.length === 3) {
      return `${date[2]}/${date[1]}/${date[0]}, ${time}`
    }
  }

  return value
}

export default function Telemetry() {
  const { data: telemetry, loading, error, refresh } = useApi(telemetryApi.getAll, [])
  const { data: sensors } = useApi(sensorApi.getAll, [])
  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    temperature: '',
    smokeLevel: '',
    sensorId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.sensorId) {
      toast.error('Please select a sensor.')
      return
    }

    setSaving(true)

    try {
      await telemetryApi.create({
        temperature: Number(form.temperature),
        smokeLevel: Number(form.smokeLevel),
        sensor: {
          id: Number(form.sensorId),
        },
      })

      const dangerous = isDangerousReading(
        form.temperature,
        form.smokeLevel
      )

      toast.success(
        dangerous
          ? 'Telemetry submitted — reading exceeds fire thresholds, check Fire Alarms.'
          : 'Telemetry submitted successfully.'
      )

      setModalOpen(false)

      setForm({
        temperature: '',
        smokeLevel: '',
        sensorId: '',
      })

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to submit telemetry.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      <SectionHeader
        title="Telemetry"
        subtitle="Live sensor readings from across all forest sectors."
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            Submit Telemetry
          </PrimaryButton>
        }
      />

      <Card className="flex items-start gap-3 border-alert-100 bg-alert-50">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-alert-600"
          size={18}
        />

        <p className="text-sm text-alert-700">
          Readings above <strong>45°C</strong> temperature and{' '}
          <strong>50 ppm</strong> smoke level automatically trigger a fire
          alarm on the backend.
        </p>
      </Card>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No telemetry submitted yet."
          rows={telemetry}
          columns={[
            {
              key: 'id',
              header: 'ID',
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
              render: (row) => (
                <span
                  className={
                    Number(row.temperature) > 45
                      ? 'font-semibold text-alert-600'
                      : ''
                  }
                >
                  {row.temperature}
                </span>
              ),
            },

            {
              key: 'smokeLevel',
              header: 'Smoke Level (ppm)',
              render: (row) => (
                <span
                  className={
                    Number(row.smokeLevel) > 50
                      ? 'font-semibold text-alert-600'
                      : ''
                  }
                >
                  {row.smokeLevel}
                </span>
              ),
            },

            {
              key: 'recordedAt',
              header: 'Recorded At',
              render: (row) =>
                formatRecordedAt(row.recordedAt),
            },
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title="Submit Telemetry"
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="form-label">
              Sensor
            </label>

            <select
              required
              className="form-select"
              value={form.sensorId}
              onChange={(e) =>
                setForm({
                  ...form,
                  sensorId: e.target.value,
                })
              }
            >
              <option value="">
                Select a sensor…
              </option>

              {(sensors || []).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.sensorName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              Temperature (°C)
            </label>

            <input
              required
              type="number"
              step="0.1"
              className="form-input"
              value={form.temperature}
              onChange={(e) =>
                setForm({
                  ...form,
                  temperature: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="form-label">
              Smoke Level (ppm)
            </label>

            <input
              required
              type="number"
              step="0.1"
              className="form-input"
              value={form.smokeLevel}
              onChange={(e) =>
                setForm({
                  ...form,
                  smokeLevel: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>

            <PrimaryButton
              type="submit"
              loading={saving}
            >
              Submit
            </PrimaryButton>

          </div>
        </form>
      </Modal>

    </div>
  )
}
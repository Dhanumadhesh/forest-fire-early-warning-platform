import React, { useState } from 'react'
import { sensorApi } from '../api/sensorApi'
import { sectorApi } from '../api/sectorApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

const SENSOR_TYPES = ['THERMAL_SMOKE', 'TEMPERATURE', 'HUMIDITY', 'MOTION']
const STATUSES = ['ACTIVE', 'INACTIVE', 'MAINTENANCE']

export default function Sensors() {
  const {
    data: sensors,
    loading,
    error,
    refresh
  } = useApi(sensorApi.getAll, [])

  const { data: sectors } = useApi(sectorApi.getAll, [])

  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    sensorName: '',
    sensorType: SENSOR_TYPES[0],
    status: 'ACTIVE',
    sectorId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.sectorId) {
      toast.error('Please select a forest sector for this sensor.')
      return
    }

    setSaving(true)

    try {
      await sensorApi.create({
        sensorName: form.sensorName,
        sensorType: form.sensorType,
        status: form.status,
        sector: {
          id: Number(form.sectorId)
        },
      })

      toast.success('Sensor registered successfully.')

      setModalOpen(false)

      setForm({
        sensorName: '',
        sensorType: SENSOR_TYPES[0],
        status: 'ACTIVE',
        sectorId: ''
      })

      refresh()

    } catch (err) {
      toast.error(err?.message || 'Failed to register sensor.')

    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      <SectionHeader
        title="Sensors"
        subtitle="Thermal, smoke, and environmental sensors deployed across forest sectors."
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            Add Sensor
          </PrimaryButton>
        }
      />

      {loading ? (
        <LoadingState />

      ) : error ? (
        <ErrorState
          message={error}
          onRetry={refresh}
        />

      ) : (
        <DataTable
          emptyMessage="No sensors registered yet."
          rows={sensors || []}
          columns={[
            {
              key: 'id',
              header: 'ID'
            },

            {
              key: 'sensorName',
              header: 'Sensor Name'
            },

            {
              key: 'sensorType',
              header: 'Type'
            },

            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge>
                  {row.status}
                </Badge>
              )
            },

            {
              key: 'sector',
              header: 'Sector',
              render: (row) =>
                row.sector?.sectorName ||
                `#${row.sector?.id ?? '—'}`
            },
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title="Register Sensor"
        onClose={() => setModalOpen(false)}
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="form-label">
              Sensor Name
            </label>

            <input
              required
              className="form-input"
              value={form.sensorName}
              onChange={(e) =>
                setForm({
                  ...form,
                  sensorName: e.target.value
                })
              }
              placeholder="e.g. Sector 9 Sensor 01"
            />
          </div>

          <div>
            <label className="form-label">
              Sensor Type
            </label>

            <select
              className="form-select"
              value={form.sensorType}
              onChange={(e) =>
                setForm({
                  ...form,
                  sensorType: e.target.value
                })
              }
            >
              {SENSOR_TYPES.map((t) => (
                <option
                  key={t}
                  value={t}
                >
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value
                })
              }
            >
              {STATUSES.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              Forest Sector
            </label>

            <select
              required
              className="form-select"
              value={form.sectorId}
              onChange={(e) =>
                setForm({
                  ...form,
                  sectorId: e.target.value
                })
              }
            >
              <option value="">
                Select a sector…
              </option>

              {(sectors || []).map((s) => (
                <option
                  key={s.id}
                  value={s.id}
                >
                  {s.sectorName}
                </option>
              ))}
            </select>
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
              Save Sensor
            </PrimaryButton>

          </div>

        </form>

      </Modal>

    </div>
  )
}
import React, { useState } from 'react'
import { dispatchApi } from '../api/dispatchApi'
import { alarmApi } from '../api/alarmApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

const STATUSES = ['DISPATCHED', 'PENDING', 'COMPLETED']

export default function RangerDispatch() {
  const {
    data: dispatches,
    loading,
    error,
    refresh,
  } = useApi(dispatchApi.getAll, [])

  const { data: alarms } = useApi(alarmApi.getAll, [])

  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    rangerTeam: '',
    vehicleNumber: '',
    status: 'DISPATCHED',
    alarmId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.alarmId) {
      toast.error('Please select a fire alarm.')
      return
    }

    const selectedAlarm = (alarms || []).find(
      (alarm) => alarm.id === Number(form.alarmId)
    )

    if (!selectedAlarm) {
      toast.error('Selected fire alarm could not be found.')
      return
    }

    setSaving(true)

    try {
      await dispatchApi.create({
        rangerTeam: form.rangerTeam,
        vehicleNumber: form.vehicleNumber,
        status: form.status,

        // Send the complete alarm structure expected by the backend
        alarm: {
          id: selectedAlarm.id,
          temperature: selectedAlarm.temperature,
          smokeLevel: selectedAlarm.smokeLevel,
          status: selectedAlarm.status,
          sensor: selectedAlarm.sensor
            ? {
                id: selectedAlarm.sensor.id,
              }
            : undefined,
        },
      })

      toast.success('Ranger dispatch created successfully.')

      setModalOpen(false)

      setForm({
        rangerTeam: '',
        vehicleNumber: '',
        status: 'DISPATCHED',
        alarmId: '',
      })

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to create dispatch.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      <SectionHeader
        title="Ranger Dispatch"
        subtitle="Coordinate ranger teams and vehicles responding to active fire alarms."
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            New Dispatch
          </PrimaryButton>
        }
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No ranger dispatches recorded yet."
          rows={dispatches}
          columns={[
            {
              key: 'id',
              header: 'ID',
            },

            {
              key: 'rangerTeam',
              header: 'Ranger Team',
            },

            {
              key: 'vehicleNumber',
              header: 'Vehicle Number',
            },

            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge>{row.status}</Badge>
              ),
            },

            {
              key: 'alarm',
              header: 'Related Alarm',
              render: (row) =>
                row.alarm
                  ? `Alarm #${row.alarm.id}`
                  : '—',
            },
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title="Create Ranger Dispatch"
        onClose={() => setModalOpen(false)}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="form-label">
              Ranger Team
            </label>

            <input
              required
              className="form-input"
              value={form.rangerTeam}
              onChange={(e) =>
                setForm({
                  ...form,
                  rangerTeam: e.target.value,
                })
              }
              placeholder="e.g. Alpha Response Team"
            />
          </div>

          <div>
            <label className="form-label">
              Vehicle Number
            </label>

            <input
              required
              className="form-input"
              value={form.vehicleNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  vehicleNumber: e.target.value,
                })
              }
              placeholder="e.g. TN-45-FR-1123"
            />
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
                  status: e.target.value,
                })
              }
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              Related Fire Alarm
            </label>

            <select
              required
              className="form-select"
              value={form.alarmId}
              onChange={(e) =>
                setForm({
                  ...form,
                  alarmId: e.target.value,
                })
              }
            >
              <option value="">
                Select a fire alarm…
              </option>

              {(alarms || [])
                .filter(
                  (a) =>
                    (a.status || '').toUpperCase() === 'ACTIVE'
                )
                .map((a) => (
                  <option
                    key={a.id}
                    value={a.id}
                  >
                    Alarm #{a.id} —{' '}
                    {a.sensor?.sensorName || 'Sensor'}
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
              Save Dispatch
            </PrimaryButton>

          </div>

        </form>
      </Modal>
    </div>
  )
}
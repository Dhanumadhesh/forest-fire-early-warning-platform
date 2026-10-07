import React, { useState } from 'react'
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

const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH']

export default function ForestSectors() {
  const {
    data: sectors,
    loading,
    error,
    refresh
  } = useApi(sectorApi.getAll, [])

  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    location: '',
    riskLevel: 'LOW'
  })

  const highRiskCount = (sectors || []).filter(
    (s) => (s.riskLevel || '').toUpperCase() === 'HIGH'
  ).length

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Backend expects "sectorName", not "name"
      const sectorData = {
        sectorName: form.name,
        location: form.location,
        riskLevel: form.riskLevel
      }

      await sectorApi.create(sectorData)

      toast.success('Forest sector added successfully.')

      setModalOpen(false)

      setForm({
        name: '',
        location: '',
        riskLevel: 'LOW'
      })

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to add sector.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      <SectionHeader
        title="Forest Sectors"
        subtitle={
          highRiskCount > 0
            ? `${highRiskCount} sector(s) currently at HIGH risk.`
            : 'All sectors within normal risk levels.'
        }
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            Add Sector
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
          emptyMessage="No forest sectors registered yet."
          rows={sectors || []}
          columns={[
            {
              key: 'id',
              header: 'ID'
            },
            {
              key: 'sectorName',
              header: 'Sector Name'
            },
            {
              key: 'location',
              header: 'Location'
            },
            {
              key: 'riskLevel',
              header: 'Risk Level',
              render: (row) => (
                <Badge>
                  {row.riskLevel}
                </Badge>
              )
            }
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title="Add Forest Sector"
        onClose={() => setModalOpen(false)}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="form-label">
              Sector Name
            </label>

            <input
              required
              className="form-input"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              placeholder="e.g. Sector 9 - Northern Ridge"
            />
          </div>

          <div>
            <label className="form-label">
              Location
            </label>

            <input
              required
              className="form-input"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value
                })
              }
              placeholder="e.g. Nilgiris North Range"
            />
          </div>

          <div>
            <label className="form-label">
              Risk Level
            </label>

            <select
              className="form-select"
              value={form.riskLevel}
              onChange={(e) =>
                setForm({
                  ...form,
                  riskLevel: e.target.value
                })
              }
            >
              {RISK_LEVELS.map((r) => (
                <option
                  key={r}
                  value={r}
                >
                  {r}
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
              Save Sector
            </PrimaryButton>

          </div>

        </form>
      </Modal>

    </div>
  )
}
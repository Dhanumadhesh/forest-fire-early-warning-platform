import React, { useState } from 'react'
import { grantApi } from '../api/grantApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

export default function Grants() {
  const { data: grants, loading, error, refresh } = useApi(grantApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ grantName: '', amount: '', grantDate: '', source: '', status: 'ACTIVE' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await grantApi.create({ ...form, amount: Number(form.amount) })
      toast.success('Grant recorded successfully.')
      setModalOpen(false)
      setForm({ grantName: '', amount: '', grantDate: '', source: '', status: 'ACTIVE' })
      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to record grant.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Grants"
        subtitle="Government and NGO grants funding forest protection operations."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>Add Grant</PrimaryButton>}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No grants recorded yet."
          rows={grants}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'grantName', header: 'Grant Name' },
            { key: 'amount', header: 'Amount', render: (row) => `₹${Number(row.amount).toLocaleString()}` },
            { key: 'grantDate', header: 'Date' },
            { key: 'source', header: 'Source' },
            { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Add Grant" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Grant Name</label>
            <input required className="form-input" value={form.grantName} onChange={(e) => setForm({ ...form, grantName: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Amount</label>
            <input required type="number" step="0.01" className="form-input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Grant Date</label>
            <input required type="date" className="form-input" value={form.grantDate} onChange={(e) => setForm({ ...form, grantDate: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Source</label>
            <input required className="form-input" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. Ministry of Environment" />
          </div>
          <div>
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="CLOSED">CLOSED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Grant</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

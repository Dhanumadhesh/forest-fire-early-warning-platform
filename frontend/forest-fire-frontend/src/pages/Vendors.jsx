import React, { useState } from 'react'
import { vendorApi } from '../api/vendorApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

export default function Vendors() {
  const { data: vendors, loading, error, refresh } = useApi(vendorApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ vendorName: '', vendorType: '', contactNumber: '', email: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await vendorApi.create(form)
      toast.success('Vendor added successfully.')
      setModalOpen(false)
      setForm({ vendorName: '', vendorType: '', contactNumber: '', email: '' })
      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to add vendor.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Vendors"
        subtitle="Suppliers of equipment, materials, and operational services."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>Add Vendor</PrimaryButton>}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No vendors registered yet."
          rows={vendors}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'vendorName', header: 'Vendor Name' },
            { key: 'vendorType', header: 'Type' },
            { key: 'contactNumber', header: 'Contact Number' },
            { key: 'email', header: 'Email' },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Add Vendor" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Vendor Name</label>
            <input required className="form-input" value={form.vendorName} onChange={(e) => setForm({ ...form, vendorName: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Vendor Type</label>
            <input required className="form-input" value={form.vendorType} onChange={(e) => setForm({ ...form, vendorType: e.target.value })} placeholder="e.g. Equipment Supplier" />
          </div>
          <div>
            <label className="form-label">Contact Number</label>
            <input required className="form-input" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input required type="email" className="form-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Vendor</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

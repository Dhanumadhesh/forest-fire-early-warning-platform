import React, { useState } from 'react'
import { vendorBillApi } from '../api/vendorBillApi'
import { purchaseOrderApi } from '../api/purchaseOrderApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

export default function VendorBills() {
  const { data: bills, loading, error, refresh } = useApi(vendorBillApi.getAll, [])
  const { data: purchaseOrders } = useApi(purchaseOrderApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ billNumber: '', amount: '', status: 'PENDING', purchaseOrderId: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.purchaseOrderId) {
      toast.error('Please select a purchase order.')
      return
    }
    setSaving(true)
    try {
      await vendorBillApi.create({
        billNumber: form.billNumber,
        amount: Number(form.amount),
        status: form.status,
        purchaseOrder: { id: Number(form.purchaseOrderId) },
      })
      toast.success('Vendor bill created successfully.')
      setModalOpen(false)
      setForm({ billNumber: '', amount: '', status: 'PENDING', purchaseOrderId: '' })
      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to create vendor bill.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Vendor Bills"
        subtitle="Bills raised by vendors against fulfilled purchase orders."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>New Vendor Bill</PrimaryButton>}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No vendor bills recorded yet."
          rows={bills}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'billNumber', header: 'Bill Number' },
            { key: 'amount', header: 'Amount', render: (row) => `₹${Number(row.amount).toLocaleString()}` },
            { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
            { key: 'purchaseOrder', header: 'Purchase Order', render: (row) => (row.purchaseOrder ? `PO #${row.purchaseOrder.id}` : '—') },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Create Vendor Bill" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Bill Number</label>
            <input required className="form-input" value={form.billNumber} onChange={(e) => setForm({ ...form, billNumber: e.target.value })} placeholder="e.g. BILL-2026-0091" />
          </div>
          <div>
            <label className="form-label">Amount</label>
            <input required type="number" step="0.01" className="form-input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
            </select>
          </div>
          <div>
            <label className="form-label">Purchase Order</label>
            <select required className="form-select" value={form.purchaseOrderId} onChange={(e) => setForm({ ...form, purchaseOrderId: e.target.value })}>
              <option value="">Select a purchase order…</option>
              {(purchaseOrders || []).map((po) => (
                <option key={po.id} value={po.id}>PO #{po.id} — {po.vendor?.vendorName || 'Vendor'}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Vendor Bill</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

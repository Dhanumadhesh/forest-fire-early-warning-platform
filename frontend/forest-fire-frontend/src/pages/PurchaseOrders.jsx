import React, { useState } from 'react'
import { purchaseOrderApi } from '../api/purchaseOrderApi'
import { vendorApi } from '../api/vendorApi'
import { productApi } from '../api/productApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

const STATUSES = ['CREATED', 'APPROVED', 'FULFILLED', 'CANCELLED']

export default function PurchaseOrders() {
  const { data: orders, loading, error, refresh } = useApi(purchaseOrderApi.getAll, [])
  const { data: vendors } = useApi(vendorApi.getAll, [])
  const { data: products } = useApi(productApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ vendorId: '', productId: '', quantity: '', totalAmount: '', status: 'CREATED' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.vendorId || !form.productId) {
      toast.error('Please select both a vendor and a product.')
      return
    }
    setSaving(true)
    try {
      await purchaseOrderApi.create({
        quantity: Number(form.quantity),
        totalAmount: Number(form.totalAmount),
        status: form.status,
        vendor: { id: Number(form.vendorId) },
        product: { id: Number(form.productId) },
      })
      toast.success('Purchase order created successfully.')
      setModalOpen(false)
      setForm({ vendorId: '', productId: '', quantity: '', totalAmount: '', status: 'CREATED' })
      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to create purchase order.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Purchase Orders"
        subtitle="Orders placed with vendors for equipment, suppressants, and services."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>New Purchase Order</PrimaryButton>}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No purchase orders created yet."
          rows={orders}
          columns={[
            { key: 'id', header: 'PO ID' },
            { key: 'vendor', header: 'Vendor', render: (row) => row.vendor?.vendorName || `#${row.vendor?.id ?? '—'}` },
            { key: 'product', header: 'Product', render: (row) => row.product?.productName || `#${row.product?.id ?? '—'}` },
            { key: 'quantity', header: 'Quantity' },
            { key: 'totalAmount', header: 'Total Amount', render: (row) => `₹${Number(row.totalAmount).toLocaleString()}` },
            { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Create Purchase Order" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Vendor</label>
            <select required className="form-select" value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })}>
              <option value="">Select a vendor…</option>
              {(vendors || []).map((v) => <option key={v.id} value={v.id}>{v.vendorName}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Product</label>
            <select required className="form-select" value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
              <option value="">Select a product…</option>
              {(products || []).map((p) => <option key={p.id} value={p.id}>{p.productName}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Quantity</label>
              <input required type="number" className="form-input" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div>
              <label className="form-label">Total Amount</label>
              <input required type="number" step="0.01" className="form-input" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Purchase Order</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

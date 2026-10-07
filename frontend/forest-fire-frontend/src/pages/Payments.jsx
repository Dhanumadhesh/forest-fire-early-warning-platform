import React, { useState } from 'react'
import { paymentApi } from '../api/paymentApi'
import { vendorBillApi } from '../api/vendorBillApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader, Card } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { Trash2, Info } from 'lucide-react'

const METHODS = ['BANK_TRANSFER', 'CASH', 'OTHER']
const STATUSES = ['PENDING', 'COMPLETED', 'FAILED']

export default function Payments() {
  const { data: payments, loading, error, refresh } = useApi(paymentApi.getAll, [])
  const { data: bills, refresh: refreshBills } = useApi(vendorBillApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [form, setForm] = useState({
    amount: '', paymentDate: '', paymentMethod: METHODS[0], status: 'PENDING', vendorBillId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.vendorBillId) {
      toast.error('Please select a vendor bill.')
      return
    }
    setSaving(true)
    try {
      await paymentApi.create({
        amount: Number(form.amount),
        paymentDate: form.paymentDate,
        paymentMethod: form.paymentMethod,
        status: form.status,
        vendorBill: { id: Number(form.vendorBillId) },
      })
      toast.success(
        form.status === 'COMPLETED'
          ? 'Payment recorded — related vendor bill marked as PAID by the backend.'
          : 'Payment recorded successfully.'
      )
      setModalOpen(false)
      setForm({ amount: '', paymentDate: '', paymentMethod: METHODS[0], status: 'PENDING', vendorBillId: '' })
      // Business logic (marking bills PAID) lives entirely in the backend.
      // We simply re-fetch the data views that could have changed.
      await Promise.all([refresh(), refreshBills()])
    } catch (err) {
      toast.error(err?.message || 'Failed to record payment.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await paymentApi.remove(id)
      toast.success('Payment deleted.')
      await Promise.all([refresh(), refreshBills()])
    } catch (err) {
      toast.error(err?.message || 'Failed to delete payment.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Payments"
        subtitle="Record and track payments issued against vendor bills."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>Record Payment</PrimaryButton>}
      />

      <Card className="flex items-start gap-3 border-forest-100 bg-forest-50">
        <Info className="mt-0.5 shrink-0 text-forest-600" size={18} />
        <p className="text-sm text-forest-700">
          Marking a payment as <strong>COMPLETED</strong> automatically updates the related vendor bill to
          <strong> PAID</strong> on the backend — this is not duplicated in the frontend.
        </p>
      </Card>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No payments recorded yet."
          rows={payments}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'amount', header: 'Amount', render: (row) => `₹${Number(row.amount).toLocaleString()}` },
            { key: 'paymentDate', header: 'Payment Date' },
            { key: 'paymentMethod', header: 'Method' },
            { key: 'status', header: 'Status', render: (row) => <Badge>{row.status}</Badge> },
            { key: 'vendorBill', header: 'Vendor Bill', render: (row) => (row.vendorBill ? `Bill #${row.vendorBill.id}` : '—') },
            {
              key: 'actions',
              header: '',
              render: (row) => (
                <button
                  onClick={() => handleDelete(row.id)}
                  disabled={deletingId === row.id}
                  className="btn-danger"
                >
                  <Trash2 size={13} /> Delete
                </button>
              ),
            },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Record Payment" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Amount</label>
            <input required type="number" step="0.01" className="form-input" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Payment Date</label>
            <input required type="date" className="form-input" value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} />
          </div>
          <div>
            <label className="form-label">Payment Method</label>
            <select className="form-select" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Vendor Bill</label>
            <select required className="form-select" value={form.vendorBillId} onChange={(e) => setForm({ ...form, vendorBillId: e.target.value })}>
              <option value="">Select a vendor bill…</option>
              {(bills || []).map((b) => (
                <option key={b.id} value={b.id}>Bill #{b.id} — {b.billNumber} ({b.status})</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Payment</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

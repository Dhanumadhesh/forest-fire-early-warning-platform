import React, { useState } from 'react'
import { productApi } from '../api/productApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'

export default function Products() {
  const { data: products, loading, error, refresh } = useApi(productApi.getAll, [])
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ productName: '', productType: '', price: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await productApi.create({ ...form, price: Number(form.price) })
      toast.success('Product added successfully.')
      setModalOpen(false)
      setForm({ productName: '', productType: '', price: '' })
      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to add product.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Products"
        subtitle="Catalog of purchasable products and services (e.g. sensors, suppressants, operations)."
        action={<PrimaryButton onClick={() => setModalOpen(true)}>Add Product</PrimaryButton>}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No products registered yet."
          rows={products}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'productName', header: 'Product Name' },
            { key: 'productType', header: 'Type' },
            { key: 'price', header: 'Price', render: (row) => `₹${Number(row.price).toLocaleString()}` },
          ]}
        />
      )}

      <Modal open={modalOpen} title="Add Product" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Product Name</label>
            <input required className="form-input" value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} placeholder="e.g. IoT Thermal Sensor" />
          </div>
          <div>
            <label className="form-label">Product Type</label>
            <input required className="form-input" value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} placeholder="e.g. Equipment / Service" />
          </div>
          <div>
            <label className="form-label">Price</label>
            <input required type="number" step="0.01" className="form-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <PrimaryButton type="submit" loading={saving}>Save Product</PrimaryButton>
          </div>
        </form>
      </Modal>
    </div>
  )
}

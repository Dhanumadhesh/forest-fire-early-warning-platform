import React, { useState } from 'react'
import { journalApi } from '../api/journalApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { DataTable } from '../components/ui/DataTable'
import { Badge } from '../components/ui/Badge'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { Trash2 } from 'lucide-react'

export default function Journal() {
  const { data: entries, loading, error, refresh } = useApi(journalApi.getAll, [])
  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [form, setForm] = useState({
    date: '',
    description: '',
    accountName: '',
    entryType: 'DEBIT',
    amount: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.date) {
      toast.error('Please select a date.')
      return
    }

    if (!form.description.trim()) {
      toast.error('Please enter a description.')
      return
    }

    if (!form.accountName.trim()) {
      toast.error('Please enter an account name.')
      return
    }

    if (!form.amount || Number(form.amount) <= 0) {
      toast.error('Please enter a valid amount.')
      return
    }

    setSaving(true)

    try {
      await journalApi.create({
        date: form.date,
        description: form.description.trim(),
        accountName: form.accountName.trim(),
        entryType: form.entryType,
        amount: Number(form.amount),
      })

      toast.success('Journal entry created successfully.')

      setModalOpen(false)

      setForm({
        date: '',
        description: '',
        accountName: '',
        entryType: 'DEBIT',
        amount: '',
      })

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to create journal entry.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)

    try {
      await journalApi.remove(id)

      toast.success('Journal entry deleted.')

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to delete journal entry.')
    } finally {
      setDeletingId(null)
    }
  }

  /*
   * Formats the date received from the backend.
   *
   * The backend may return:
   *   date
   *   entryDate
   *   transactionDate
   *
   * We check all three so the UI does not unnecessarily show "—".
   */
  const formatDate = (row) => {
    const dateValue =
      row?.date ||
      row?.entryDate ||
      row?.transactionDate

    if (!dateValue) {
      return '—'
    }

    /*
     * If backend returns YYYY-MM-DD,
     * formatting it manually avoids timezone shifting.
     */
    if (
      typeof dateValue === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ) {
      const [year, month, day] = dateValue.split('-')

      return `${day}/${month}/${year}`
    }

    const parsedDate = new Date(dateValue)

    if (Number.isNaN(parsedDate.getTime())) {
      return String(dateValue)
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Journal"
        subtitle="General ledger entries for all debit and credit transactions."
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            New Entry
          </PrimaryButton>
        }
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <DataTable
          emptyMessage="No journal entries recorded yet."
          rows={entries || []}
          columns={[
            {
              key: 'id',
              header: 'ID',
            },

            {
              key: 'date',
              header: 'Date',
              render: (row) => formatDate(row),
            },

            {
              key: 'description',
              header: 'Description',
            },

            {
              key: 'accountName',
              header: 'Account',
            },

            {
              key: 'entryType',
              header: 'Type',
              render: (row) => (
                <Badge>{row.entryType}</Badge>
              ),
            },

            {
              key: 'amount',
              header: 'Amount',
              render: (row) =>
                `₹${Number(row.amount || 0).toLocaleString('en-IN', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}`,
            },

            {
              key: 'actions',
              header: '',
              render: (row) => (
                <button
                  onClick={() => handleDelete(row.id)}
                  disabled={deletingId === row.id}
                  className="btn-danger"
                >
                  <Trash2 size={13} />

                  {deletingId === row.id ? 'Deleting...' : 'Delete'}
                </button>
              ),
            },
          ]}
        />
      )}

      <Modal
        open={modalOpen}
        title="New Journal Entry"
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DATE */}
          <div>
            <label className="form-label">
              Date
            </label>

            <input
              required
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="form-label">
              Description
            </label>

            <input
              required
              className="form-input"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="e.g. Purchase of fire suppressant liquid"
            />
          </div>

          {/* ACCOUNT NAME */}
          <div>
            <label className="form-label">
              Account Name
            </label>

            <input
              required
              className="form-input"
              value={form.accountName}
              onChange={(e) =>
                setForm({
                  ...form,
                  accountName: e.target.value,
                })
              }
              placeholder="e.g. Emergency Deployment Expense"
            />
          </div>

          {/* ENTRY TYPE + AMOUNT */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="form-label">
                Entry Type
              </label>

              <select
                className="form-select"
                value={form.entryType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    entryType: e.target.value,
                  })
                }
              >
                <option value="DEBIT">
                  DEBIT
                </option>

                <option value="CREDIT">
                  CREDIT
                </option>
              </select>
            </div>

            <div>
              <label className="form-label">
                Amount
              </label>

              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                className="form-input"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: e.target.value,
                  })
                }
                placeholder="0.00"
              />
            </div>

          </div>

          {/* BUTTONS */}
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
              Save Entry
            </PrimaryButton>

          </div>

        </form>
      </Modal>
    </div>
  )
}
import React, { useState } from 'react'
import { budgetApi } from '../api/budgetApi'
import { sectorApi } from '../api/sectorApi'
import { grantApi } from '../api/grantApi'
import { useApi } from '../hooks/useApi'
import { useToast } from '../context/ToastContext'
import { SectionHeader, Card } from '../components/ui/Card'
import { PrimaryButton } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { ProgressBar } from '../components/ui/ProgressBar'
import { LoadingState } from '../components/ui/LoadingState'
import { ErrorState } from '../components/ui/ErrorState'
import { EmptyState } from '../components/ui/EmptyState'

export default function Budgets() {
  const {
    data: budgets,
    loading,
    error,
    refresh,
  } = useApi(budgetApi.getAll, [])

  const { data: sectors } = useApi(sectorApi.getAll, [])
  const { data: grants } = useApi(grantApi.getAll, [])

  const toast = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    budgetYear: new Date().getFullYear(),
    allocatedAmount: '',
    spentAmount: '',
    sectorId: '',
    grantId: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.sectorId || !form.grantId) {
      toast.error('Please select both a forest sector and a grant.')
      return
    }

    setSaving(true)

    try {
      await budgetApi.create({
        budgetYear: Number(form.budgetYear),
        allocatedAmount: Number(form.allocatedAmount),
        spentAmount: Number(form.spentAmount || 0),

        // Backend field is "sector"
        sector: {
          id: Number(form.sectorId),
        },

        grant: {
          id: Number(form.grantId),
        },
      })

      toast.success('Budget created successfully.')

      setModalOpen(false)

      setForm({
        budgetYear: new Date().getFullYear(),
        allocatedAmount: '',
        spentAmount: '',
        sectorId: '',
        grantId: '',
      })

      refresh()
    } catch (err) {
      toast.error(err?.message || 'Failed to create budget.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* PAGE HEADER */}
      <SectionHeader
        title="Budgets"
        subtitle="Sector-wise budget allocation, spend, and remaining balance, funded by grants."
        action={
          <PrimaryButton onClick={() => setModalOpen(true)}>
            Add Budget
          </PrimaryButton>
        }
      />

      {/* LOADING */}
      {loading ? (
        <LoadingState />

      ) : error ? (
        <ErrorState
          message={error}
          onRetry={refresh}
        />

      ) : !budgets || budgets.length === 0 ? (
        <EmptyState message="No budgets created yet." />

      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {budgets.map((b) => {

            const allocated = Number(b.allocatedAmount) || 0
            const spent = Number(b.spentAmount) || 0

            const remaining = allocated - spent

            const percent =
              allocated > 0
                ? (spent / allocated) * 100
                : 0

            return (
              <Card key={b.id}>

                {/* SECTOR + YEAR */}
                <div className="mb-1 flex items-center justify-between">

                  <p className="text-sm font-bold text-forest-900">

                    {b.sector?.sectorName ||
                      `Sector #${b.sector?.id ?? '—'}`}

                  </p>

                  <span className="text-xs font-semibold text-forest-400">
                    {b.budgetYear}
                  </span>

                </div>

                {/* GRANT */}
                <p className="mb-3 text-xs text-forest-400">
                  Funded by:{' '}
                  {b.grant?.grantName ||
                    `Grant #${b.grant?.id ?? '—'}`}
                </p>

                {/* PROGRESS BAR */}
                <ProgressBar
                  percent={percent}
                  danger={remaining < 0}
                />

                {/* FINANCIAL VALUES */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">

                  {/* ALLOCATED */}
                  <div>
                    <p className="text-[10px] uppercase text-forest-400">
                      Allocated
                    </p>

                    <p className="text-sm font-bold text-forest-800">
                      ₹{allocated.toLocaleString()}
                    </p>
                  </div>

                  {/* SPENT */}
                  <div>
                    <p className="text-[10px] uppercase text-forest-400">
                      Spent
                    </p>

                    <p className="text-sm font-bold text-alert-600">
                      ₹{spent.toLocaleString()}
                    </p>
                  </div>

                  {/* REMAINING */}
                  <div>
                    <p className="text-[10px] uppercase text-forest-400">
                      Remaining
                    </p>

                    <p
                      className={`text-sm font-bold ${
                        remaining < 0
                          ? 'text-alert-600'
                          : 'text-forest-700'
                      }`}
                    >
                      ₹{remaining.toLocaleString()}
                    </p>
                  </div>

                </div>

              </Card>
            )
          })}

        </div>
      )}

      {/* ADD BUDGET MODAL */}
      <Modal
        open={modalOpen}
        title="Add Budget"
        onClose={() => setModalOpen(false)}
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* BUDGET YEAR */}
          <div>
            <label className="form-label">
              Budget Year
            </label>

            <input
              required
              type="number"
              className="form-input"
              value={form.budgetYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  budgetYear: e.target.value,
                })
              }
            />
          </div>

          {/* AMOUNTS */}
          <div className="grid grid-cols-2 gap-3">

            {/* ALLOCATED */}
            <div>
              <label className="form-label">
                Allocated Amount
              </label>

              <input
                required
                type="number"
                step="0.01"
                className="form-input"
                value={form.allocatedAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    allocatedAmount: e.target.value,
                  })
                }
              />
            </div>

            {/* SPENT */}
            <div>
              <label className="form-label">
                Spent Amount
              </label>

              <input
                type="number"
                step="0.01"
                className="form-input"
                value={form.spentAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    spentAmount: e.target.value,
                  })
                }
                placeholder="0"
              />
            </div>

          </div>

          {/* FOREST SECTOR */}
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
                  sectorId: e.target.value,
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

          {/* GRANT */}
          <div>
            <label className="form-label">
              Grant
            </label>

            <select
              required
              className="form-select"
              value={form.grantId}
              onChange={(e) =>
                setForm({
                  ...form,
                  grantId: e.target.value,
                })
              }
            >

              <option value="">
                Select a grant…
              </option>

              {(grants || []).map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                >
                  {g.grantName}
                </option>
              ))}

            </select>
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
              Save Budget
            </PrimaryButton>

          </div>

        </form>

      </Modal>

    </div>
  )
}
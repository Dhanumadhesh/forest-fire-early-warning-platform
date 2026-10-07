import React from 'react'
import { reportApi } from '../../api/reportApi'
import { useApi } from '../../hooks/useApi'
import { StatCard } from '../../components/ui/StatCard'
import { LoadingState } from '../../components/ui/LoadingState'
import { ErrorState } from '../../components/ui/ErrorState'
import { Wallet, ReceiptText } from 'lucide-react'

export default function BalanceSheet() {
  const { data, loading, error, refresh } = useApi(reportApi.getBalanceSheet, [])

  if (loading) return <LoadingState label="Loading balance sheet…" />
  if (error) return <ErrorState message={error} onRetry={refresh} />

  const totalPayments = Number(data?.totalPayments) || 0
  const unpaidBills = Number(data?.unpaidSupplierBills) || 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <StatCard icon={Wallet} label="Total Payments" value={`₹${totalPayments.toLocaleString()}`} />
      <StatCard
        icon={ReceiptText}
        label="Unpaid Supplier Bills"
        value={`₹${unpaidBills.toLocaleString()}`}
        tone={unpaidBills > 0 ? 'alert' : 'light'}
      />
    </div>
  )
}

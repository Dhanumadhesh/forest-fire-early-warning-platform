import React, { useState } from 'react'
import { SectionHeader } from '../../components/ui/Card'
import BudgetReport from './BudgetReport'
import ProfitLoss from './ProfitLoss'
import BalanceSheet from './BalanceSheet'

const TABS = [
  { key: 'budget', label: 'Budget Report', component: BudgetReport },
  { key: 'pnl', label: 'Profit & Loss', component: ProfitLoss },
  { key: 'balance', label: 'Balance Sheet', component: BalanceSheet },
]

export default function Reports() {
  const [active, setActive] = useState('budget')
  const ActiveComponent = TABS.find((t) => t.key === active)?.component

  return (
    <div className="space-y-5">
      <SectionHeader title="Reports" subtitle="Financial and operational reporting across the platform." />

      <div className="flex gap-2 overflow-x-auto border-b border-forest-100 pb-px">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`whitespace-nowrap rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              active === tab.key
                ? 'border-b-2 border-forest-700 text-forest-800'
                : 'text-forest-400 hover:text-forest-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ActiveComponent />
    </div>
  )
}

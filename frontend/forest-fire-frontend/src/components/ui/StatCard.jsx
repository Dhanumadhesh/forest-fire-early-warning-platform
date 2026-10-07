import React from 'react'

export function StatCard({ icon: Icon, label, value, tone = 'forest', hint }) {
  const toneClasses = {
    forest: 'bg-forest-700 text-white',
    alert: 'bg-alert-600 text-white',
    light: 'bg-forest-50 text-forest-700',
  }
  return (
    <div className="rounded-xl border border-forest-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-500">
          {label}
        </p>
        {Icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-forest-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-forest-400">{hint}</p>}
    </div>
  )
}

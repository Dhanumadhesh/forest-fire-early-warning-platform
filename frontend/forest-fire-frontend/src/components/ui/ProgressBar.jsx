import React from 'react'

export function ProgressBar({ percent = 0, danger = false }) {
  const clamped = Math.max(0, Math.min(100, percent))
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-forest-100">
      <div
        className={`h-full rounded-full transition-all ${
          danger || clamped >= 90 ? 'bg-alert-500' : clamped >= 70 ? 'bg-amber-400' : 'bg-forest-600'
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

import React from 'react'

const STYLES = {
  neutral: 'bg-forest-100 text-forest-700',
  green: 'bg-forest-600 text-white',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-alert-100 text-alert-700',
  redSolid: 'bg-alert-600 text-white',
  blue: 'bg-sky-100 text-sky-700',
}

// Maps common domain status strings to a visual tone automatically,
// but a `tone` prop can always override it.
const STATUS_TONE_MAP = {
  LOW: 'green',
  MEDIUM: 'amber',
  HIGH: 'redSolid',
  ACTIVE: 'redSolid',
  RESOLVED: 'green',
  DISPATCHED: 'amber',
  COMPLETED: 'green',
  PENDING: 'amber',
  PAID: 'green',
  CREATED: 'blue',
  DEBIT: 'red',
  CREDIT: 'green',
}

export function Badge({ children, tone }) {
  const key = typeof children === 'string' ? children.toUpperCase() : ''
  const resolvedTone = tone || STATUS_TONE_MAP[key] || 'neutral'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[resolvedTone]}`}
    >
      {children ?? '—'}
    </span>
  )
}

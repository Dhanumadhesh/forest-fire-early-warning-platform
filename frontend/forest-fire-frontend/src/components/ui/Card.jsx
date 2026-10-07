import React from 'react'

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-forest-100 bg-white p-5 shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-forest-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-forest-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

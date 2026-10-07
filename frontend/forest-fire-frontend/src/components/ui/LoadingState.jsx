import React from 'react'
import { Loader2 } from 'lucide-react'

export function LoadingState({ label = 'Loading data…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-forest-100 bg-white py-16 shadow-card">
      <Loader2 className="animate-spin text-forest-600" size={28} />
      <p className="text-sm font-medium text-forest-500">{label}</p>
    </div>
  )
}

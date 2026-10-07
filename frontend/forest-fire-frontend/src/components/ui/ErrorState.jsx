import React from 'react'
import { WifiOff, RefreshCcw } from 'lucide-react'

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-alert-100 bg-alert-50 py-16 text-center shadow-card">
      <WifiOff className="text-alert-600" size={28} />
      <p className="max-w-md text-sm font-medium text-alert-700">
        {message || 'Unable to connect to the backend. Please make sure Spring Boot is running on port 8080.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-1">
          <RefreshCcw size={15} /> Retry
        </button>
      )}
    </div>
  )
}

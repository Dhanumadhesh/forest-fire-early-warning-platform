import React from 'react'
import { Inbox } from 'lucide-react'

export function EmptyState({ message = 'No records found yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
      <Inbox className="text-forest-300" size={26} />
      <p className="text-sm font-medium text-forest-400">{message}</p>
    </div>
  )
}

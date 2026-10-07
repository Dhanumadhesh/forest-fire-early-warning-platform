import React from 'react'
import { X } from 'lucide-react'

export function Modal({ open, title, onClose, children, wide = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/50 p-4">
      <div
        className={`max-h-[90vh] w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} overflow-y-auto rounded-xl bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-forest-100 px-5 py-4">
          <h2 className="text-base font-bold text-forest-900">{title}</h2>
          <button onClick={onClose} className="rounded-md p-1 text-forest-400 hover:bg-forest-50 hover:text-forest-700">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

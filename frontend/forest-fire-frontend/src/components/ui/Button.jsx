import React from 'react'
import { Loader2, Plus } from 'lucide-react'

export function PrimaryButton({ children, loading, icon: Icon = Plus, ...props }) {
  return (
    <button className="btn-primary" disabled={loading} {...props}>
      {loading ? <Loader2 className="animate-spin" size={16} /> : <Icon size={16} />}
      {children}
    </button>
  )
}

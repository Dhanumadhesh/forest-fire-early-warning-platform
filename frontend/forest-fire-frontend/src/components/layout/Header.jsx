import React from 'react'
import { Menu, Bell, ShieldCheck } from 'lucide-react'

export function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-forest-100 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-forest-600 hover:bg-forest-50 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-sm font-bold text-forest-900 sm:text-base">
            Forest Fire Early Warning &amp; Ranger Dispatch Coordination Platform
          </h1>
          <p className="hidden text-xs text-forest-400 sm:block">
            Operations & Financial Command Center
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="relative rounded-full p-2 text-forest-500 hover:bg-forest-50">
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-alert-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-forest-100 bg-forest-50 px-2.5 py-1.5 sm:px-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-700 text-white">
            <ShieldCheck size={15} />
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-semibold text-forest-800">Admin User</p>
            <p className="text-[10px] text-forest-400">Operations Center</p>
          </div>
        </div>
      </div>
    </header>
  )
}

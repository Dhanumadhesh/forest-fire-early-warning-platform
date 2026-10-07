import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  TreePine,
  Radio,
  Activity,
  FlameKindling,
  Siren,
  Truck,
  Package,
  ClipboardList,
  Receipt,
  Wallet,
  HandCoins,
  PiggyBank,
  BookText,
  BarChart3,
  X,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/sectors', label: 'Forest Sectors', icon: TreePine },
  { to: '/sensors', label: 'Sensors', icon: Radio },
  { to: '/telemetry', label: 'Telemetry', icon: Activity },
  { to: '/alarms', label: 'Fire Alarms', icon: FlameKindling },
  { to: '/dispatch', label: 'Ranger Dispatch', icon: Siren },
  { to: '/vendors', label: 'Vendors', icon: Truck },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/purchase-orders', label: 'Purchase Orders', icon: ClipboardList },
  { to: '/vendor-bills', label: 'Vendor Bills', icon: Receipt },
  { to: '/payments', label: 'Payments', icon: Wallet },
  { to: '/grants', label: 'Grants', icon: HandCoins },
  { to: '/budgets', label: 'Budgets', icon: PiggyBank },
  { to: '/journal', label: 'Journal', icon: BookText },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
]

export function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-forest-950/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-forest-900 text-forest-50 transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-forest-800 px-5 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-600">
              <FlameKindling size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-white">Forest Fire</p>
              <p className="text-[11px] text-forest-300">Early Warning &amp; Dispatch</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-forest-300 hover:bg-forest-800 lg:hidden">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-forest-600 text-white shadow-sm'
                    : 'text-forest-200 hover:bg-forest-800 hover:text-white'
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-forest-800 px-5 py-4 text-[11px] text-forest-400">
          Forest Fire Early Warning &amp; Ranger Dispatch Coordination Platform
        </div>
      </aside>
    </>
  )
}

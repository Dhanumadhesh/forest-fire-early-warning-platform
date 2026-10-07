import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/layout/Layout'

import Dashboard from './pages/Dashboard'
import ForestSectors from './pages/ForestSectors'
import Sensors from './pages/Sensors'
import Telemetry from './pages/Telemetry'
import FireAlarms from './pages/FireAlarms'
import RangerDispatch from './pages/RangerDispatch'
import Vendors from './pages/Vendors'
import Products from './pages/Products'
import PurchaseOrders from './pages/PurchaseOrders'
import VendorBills from './pages/VendorBills'
import Payments from './pages/Payments'
import Grants from './pages/Grants'
import Budgets from './pages/Budgets'
import Journal from './pages/Journal'
import Reports from './pages/Reports/Reports'

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sectors" element={<ForestSectors />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/telemetry" element={<Telemetry />} />
            <Route path="/alarms" element={<FireAlarms />} />
            <Route path="/dispatch" element={<RangerDispatch />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/products" element={<Products />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/vendor-bills" element={<VendorBills />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        Vesting Platform - Stellar Soroban dApp
      </footer>
    </div>
  )
}

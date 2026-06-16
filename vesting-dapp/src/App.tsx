import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { WalletGuard } from './components/WalletGuard'
import { Dashboard } from './pages/Dashboard'
import { Vaults } from './pages/Vaults'
import { CreateVault } from './pages/CreateVault'
import { Staking } from './pages/Staking'
import { Governance } from './pages/Governance'
import { Inheritance } from './pages/Inheritance'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={
          <WalletGuard><Dashboard /></WalletGuard>
        } />
        <Route path="/vaults" element={
          <WalletGuard><Vaults /></WalletGuard>
        } />
        <Route path="/vaults/:id" element={
          <WalletGuard><div className="text-center py-12 text-gray-400">Vault detail page coming soon</div></WalletGuard>
        } />
        <Route path="/create" element={
          <WalletGuard><CreateVault /></WalletGuard>
        } />
        <Route path="/staking" element={
          <WalletGuard><Staking /></WalletGuard>
        } />
        <Route path="/governance" element={
          <WalletGuard><Governance /></WalletGuard>
        } />
        <Route path="/inheritance" element={
          <WalletGuard><Inheritance /></WalletGuard>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
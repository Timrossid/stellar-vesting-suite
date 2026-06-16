import { useEffect, useState } from 'react'
import { StatCard } from '../components/StatCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorDisplay } from '../components/ErrorDisplay'
import { useVault } from '../hooks/useVault'
import { useWalletStore } from '../store/walletStore'

export function Dashboard() {
  const { vaults, loadingState, error, fetchVaults } = useVault()
  const { publicKey } = useWalletStore()
  const [totalClaimed, setTotalClaimed] = useState('0')

  useEffect(() => {
    if (publicKey) fetchVaults()
  }, [publicKey])

  const stats = [
    { title: 'Total Vaults', value: String(vaults.length), icon: '🔒' },
    { title: 'Active Vaults', value: String(vaults.filter(v => !v.isFrozen).length), icon: '✅' },
    { title: 'Claimed', value: `${totalClaimed} XLM`, icon: '💰', trend: 'up' as const },
    { title: 'Network', value: 'Testnet', icon: '🌐' },
  ]

  if (loadingState === 'loading') return <LoadingSpinner text="Loading dashboard..." />
  if (loadingState === 'error') return <ErrorDisplay message={error || 'Failed to load'} onRetry={fetchVaults} />

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm">Overview of your vesting positions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Vaults</h2>
          {vaults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No vaults found</p>
              <a href="/create" className="text-purple-400 hover:text-purple-300 text-sm">
                Create your first vault →
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              {vaults.slice(0, 5).map((vault) => (
                <a
                  key={vault.id}
                  href={`/vaults/${vault.id}`}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">Vault #{vault.id}</p>
                    <p className="text-xs text-gray-400">{vault.title || 'No title'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${vault.isFrozen ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {vault.isFrozen ? 'Frozen' : 'Active'}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/create"
              className="flex flex-col items-center gap-2 p-4 bg-purple-600/10 hover:bg-purple-600/20 rounded-xl transition-colors"
            >
              <span className="text-2xl">➕</span>
              <span className="text-xs font-medium">Create Vault</span>
            </a>
            <a
              href="/vaults"
              className="flex flex-col items-center gap-2 p-4 bg-blue-600/10 hover:bg-blue-600/20 rounded-xl transition-colors"
            >
              <span className="text-2xl">🔒</span>
              <span className="text-xs font-medium">View Vaults</span>
            </a>
            <a
              href="/staking"
              className="flex flex-col items-center gap-2 p-4 bg-green-600/10 hover:bg-green-600/20 rounded-xl transition-colors"
            >
              <span className="text-2xl">💰</span>
              <span className="text-xs font-medium">Staking</span>
            </a>
            <a
              href="/governance"
              className="flex flex-col items-center gap-2 p-4 bg-orange-600/10 hover:bg-orange-600/20 rounded-xl transition-colors"
            >
              <span className="text-2xl">🗳️</span>
              <span className="text-xs font-medium">Governance</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

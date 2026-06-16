import { useEffect } from 'react'
import { useVault } from '../hooks/useVault'
import { useWalletStore } from '../store/walletStore'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorDisplay } from '../components/ErrorDisplay'

export function Vaults() {
  const { vaults, loadingState, error, fetchVaults } = useVault()
  const { publicKey } = useWalletStore()

  useEffect(() => {
    if (publicKey) fetchVaults()
  }, [publicKey])

  if (loadingState === 'loading') return <LoadingSpinner text="Loading vaults..." />
  if (loadingState === 'error') return <ErrorDisplay message={error || 'Failed to load vaults'} onRetry={fetchVaults} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Your Vaults</h1>
          <p className="text-gray-400 text-sm mt-1">{vaults.length} vault(s) found</p>
        </div>
        <a
          href="/create"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
        >
          + New Vault
        </a>
      </div>

      {vaults.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🔒</span>
          <h2 className="text-xl font-semibold mb-2">No Vaults Yet</h2>
          <p className="text-gray-400 mb-6">Create your first vesting vault to get started</p>
          <a
            href="/create"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-colors"
          >
            Create Vault
          </a>
        </div>
      ) : (
        <div className="grid gap-3">
          {vaults.map((vault) => (
            <a
              key={vault.id}
              href={`/vaults/${vault.id}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🏦</span>
                </div>
                <div>
                  <p className="font-medium">Vault #{vault.id}</p>
                  <p className="text-xs text-gray-400">{vault.title || 'Vesting Schedule'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 text-sm">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Status</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${vault.isFrozen ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {vault.isFrozen ? 'Frozen' : 'Active'}
                  </span>
                </div>
                <span className="text-gray-500 hidden sm:inline">→</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

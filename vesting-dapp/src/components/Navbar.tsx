import { Link, useLocation } from 'react-router-dom'
import { useWalletStore } from '../store/walletStore'
import { shortenAddress } from '../lib/stellar'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/vaults', label: 'Vaults', icon: '🔒' },
  { path: '/create', label: 'Create', icon: '➕' },
  { path: '/staking', label: 'Staking', icon: '💰' },
  { path: '/governance', label: 'Governance', icon: '🗳️' },
  { path: '/inheritance', label: 'Inheritance', icon: '👥' },
]

export function Navbar() {
  const location = useLocation()
  const { publicKey, isConnected, connect, disconnect, isConnecting } = useWalletStore()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🏦</span>
            <span className="font-bold text-lg hidden sm:inline">Vesting dApp</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {isConnected && publicKey ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 hidden sm:inline">
                  {shortenAddress(publicKey)}
                </span>
                <button
                  onClick={disconnect}
                  className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto gap-1 pb-2 -mx-4 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

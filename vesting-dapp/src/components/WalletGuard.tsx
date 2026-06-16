import { useLocation } from 'react-router-dom'
import { useWalletStore } from '../store/walletStore'

interface WalletGuardProps {
  children: React.ReactNode
}

export function WalletGuard({ children }: WalletGuardProps) {
  const { isConnected, connect, isConnecting } = useWalletStore()
  const location = useLocation()

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="w-20 h-20 rounded-full bg-purple-900/30 flex items-center justify-center">
          <span className="text-4xl">🔌</span>
        </div>
        <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
        <p className="text-gray-400 text-sm max-w-md text-center">
          Connect your Freighter wallet to interact with the Vesting Platform
        </p>
        <button
          onClick={connect}
          disabled={isConnecting}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect Freighter Wallet'}
        </button>
      </div>
    )
  }

  return <>{children}</>
}

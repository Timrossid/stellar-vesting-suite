import { useState } from 'react'
import { useWalletStore } from '../store/walletStore'
import toast from 'react-hot-toast'

export function Staking() {
  const { publicKey } = useWalletStore()
  const [vaultId, setVaultId] = useState('')
  const [isStaking, setIsStaking] = useState(false)

  const handleStake = async () => {
    if (!vaultId) return
    setIsStaking(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      toast.success('Vault staked successfully! (Simulated)')
    } catch (err: any) {
      toast.error(err.message || 'Staking failed')
    } finally {
      setIsStaking(false)
    }
  }

  const handleUnstake = async () => {
    if (!vaultId) return
    setIsStaking(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      toast.success('Vault unstaked successfully! (Simulated)')
    } catch (err: any) {
      toast.error(err.message || 'Unstaking failed')
    } finally {
      setIsStaking(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Staking</h1>
        <p className="text-gray-400 text-sm">Stake your vault tokens to earn yield</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Manage Staking</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Vault ID</label>
              <input
                type="number"
                value={vaultId}
                onChange={e => setVaultId(e.target.value)}
                placeholder="Enter vault ID..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleStake}
                disabled={isStaking || !vaultId}
                className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
              >
                {isStaking ? 'Processing...' : 'Stake'}
              </button>
              <button
                onClick={handleUnstake}
                disabled={isStaking || !vaultId}
                className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
              >
                {isStaking ? 'Processing...' : 'Unstake'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Staking Info</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Total Staked</span>
              <span className="font-medium">0 XLM</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Accumulated Yield</span>
              <span className="font-medium text-green-400">0 XLM</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Status</span>
              <span className="font-medium text-yellow-400">Not Staked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

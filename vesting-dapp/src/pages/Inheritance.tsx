import { useState } from 'react'
import toast from 'react-hot-toast'
import { useWalletStore } from '../store/walletStore'

export function Inheritance() {
  const { publicKey } = useWalletStore()
  const [vaultId, setVaultId] = useState('')
  const [backupAddress, setBackupAddress] = useState('')
  const [switchDuration, setSwitchDuration] = useState('15552000')
  const [challengeWindow, setChallengeWindow] = useState('604800')

  const handleNominate = async () => {
    if (!vaultId || !backupAddress) return
    try {
      await new Promise(r => setTimeout(r, 1000))
      toast.success('Backup nominated successfully! (Simulated)')
    } catch (err: any) {
      toast.error(err.message || 'Failed to nominate backup')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Inheritance</h1>
        <p className="text-gray-400 text-sm">Set up dead-man's switch for your vaults</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Nominate Backup</h2>
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
            <div>
              <label className="block text-sm font-medium mb-1.5">Backup Address</label>
              <input
                type="text"
                value={backupAddress}
                onChange={e => setBackupAddress(e.target.value)}
                placeholder="G..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Switch Duration</label>
                <select
                  value={switchDuration}
                  onChange={e => setSwitchDuration(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="2592000">30 days</option>
                  <option value="7776000">90 days</option>
                  <option value="15552000">180 days</option>
                  <option value="31536000">365 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Challenge Window</label>
                <select
                  value={challengeWindow}
                  onChange={e => setChallengeWindow(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="86400">1 day</option>
                  <option value="259200">3 days</option>
                  <option value="604800">7 days</option>
                  <option value="1209600">14 days</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleNominate}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              Nominate Backup
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">How It Works</h2>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 p-3 bg-gray-800/50 rounded-lg">
              <span className="text-purple-400 font-bold">1.</span>
              <p className="text-gray-300">Nominate a backup address for your vault</p>
            </div>
            <div className="flex gap-3 p-3 bg-gray-800/50 rounded-lg">
              <span className="text-purple-400 font-bold">2.</span>
              <p className="text-gray-300">Set inactivity period (switch duration)</p>
            </div>
            <div className="flex gap-3 p-3 bg-gray-800/50 rounded-lg">
              <span className="text-purple-400 font-bold">3.</span>
              <p className="text-gray-300">If you are inactive, backup can claim after challenge period</p>
            </div>
            <div className="flex gap-3 p-3 bg-gray-800/50 rounded-lg">
              <span className="text-purple-400 font-bold">4.</span>
              <p className="text-gray-300">You can cancel the claim at any time during the challenge window</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
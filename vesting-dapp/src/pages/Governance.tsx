import { useState } from 'react'
import { useWalletStore } from '../store/walletStore'
import toast from 'react-hot-toast'

export function Governance() {
  const { publicKey } = useWalletStore()
  const [votingPower, setVotingPower] = useState('0')

  const proposals = [
    { id: 1, title: 'Admin Rotation', status: 'Active', votes: '1,234 / 2,000' },
    { id: 2, title: 'Contract Upgrade v2', status: 'Challenge', votes: '890 / 2,000' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Governance</h1>
        <p className="text-gray-400 text-sm">Vote on proposals and manage the protocol</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{proposal.title}</h3>
                  <p className="text-xs text-gray-400">Proposal #{proposal.id}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-900/30 text-yellow-400">
                  {proposal.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Votes: {proposal.votes}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.success('Voted Yes! (Simulated)')}
                    className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => toast.success('Voted No! (Simulated)')}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-xs transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Your Voting Power</h2>
          <div className="text-center py-6">
            <p className="text-3xl font-bold text-purple-400">{votingPower}</p>
            <p className="text-sm text-gray-400 mt-1">Votes</p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Voting power is based on locked token value
          </p>
        </div>
      </div>
    </div>
  )
}

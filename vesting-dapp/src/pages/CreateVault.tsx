import { useState } from 'react'
import toast from 'react-hot-toast'
import { useWalletStore } from '../store/walletStore'

export function CreateVault() {
  const { publicKey } = useWalletStore()
  const [formData, setFormData] = useState({
    owner: publicKey || '',
    amount: '',
    startTime: '',
    endTime: '',
    stepDuration: '2592000',
    keeperFee: '0',
    isRevocable: true,
    isTransferable: false,
    title: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Vault created successfully! (Simulated)')
    } catch (err: any) {
      toast.error(err.message || 'Failed to create vault')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create Vesting Vault</h1>
        <p className="text-gray-400 text-sm">Set up a new vesting schedule for a beneficiary</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Beneficiary Address</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Amount (tokens)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            required
            min="1"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Step Duration (seconds)</label>
          <select
            name="stepDuration"
            value={formData.stepDuration}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="86400">Daily (86,400s)</option>
            <option value="604800">Weekly (604,800s)</option>
            <option value="2592000">Monthly (2,592,000s)</option>
            <option value="31536000">Yearly (31,536,000s)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Title (optional)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Team Token Allocation"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isRevocable"
              checked={formData.isRevocable}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 accent-purple-600"
            />
            <span className="text-sm">Revocable</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isTransferable"
              checked={formData.isTransferable}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 accent-purple-600"
            />
            <span className="text-sm">Transferable</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
        >
          {isSubmitting ? 'Creating...' : 'Create Vault'}
        </button>
      </form>
    </div>
  )
}

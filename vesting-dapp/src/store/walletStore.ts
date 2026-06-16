import { create } from 'zustand'
import toast from 'react-hot-toast'

interface WalletState {
  publicKey: string | null
  isConnected: boolean
  isConnecting: boolean
  balance: string
  connect: () => Promise<void>
  disconnect: () => void
  setBalance: (balance: string) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  publicKey: null,
  isConnected: false,
  isConnecting: false,
  balance: '0',

  connect: async () => {
    set({ isConnecting: true })
    try {
      if (typeof window !== 'undefined' && (window as any).freighter) {
        const { address } = await (window as any).freighter.getAddress({ network: 'testnet' })
        set({ publicKey: address, isConnected: true, isConnecting: false })
        toast.success('Wallet connected')
      } else {
        window.open('https://freighter.app', '_blank')
        toast.error('Please install Freighter wallet extension')
        set({ isConnecting: false })
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to connect wallet')
      set({ isConnecting: false })
    }
  },

  disconnect: () => {
    set({ publicKey: null, isConnected: false, balance: '0' })
    toast.success('Wallet disconnected')
  },

  setBalance: (balance: string) => set({ balance }),
}))

import { useEffect } from 'react'
import { useWalletStore } from '../store/walletStore'

export function useWallet() {
  const store = useWalletStore()

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (typeof window !== 'undefined' && (window as any).freighter) {
          const { address } = await (window as any).freighter.getAddress({ network: 'testnet' })
          if (address && !store.isConnected) {
            store.connect()
          }
        }
      } catch {
        // Not connected
      }
    }
    checkConnection()
  }, [])

  return store
}

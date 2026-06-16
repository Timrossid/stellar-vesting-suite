import { useCallback } from 'react'
import { useVaultStore } from '../store/vaultStore'
import { useWalletStore } from '../store/walletStore'
import { getUserVaults, getClaimableAmount } from '../lib/stellar'
import type { Vault } from '../lib/types'

export function useVault() {
  const store = useVaultStore()
  const wallet = useWalletStore()

  const fetchVaults = useCallback(async () => {
    if (!wallet.publicKey) return
    store.setLoadingState('loading')
    try {
      const vaultIds = await getUserVaults({ publicKey: wallet.publicKey })
      const vaults: Vault[] = vaultIds.map((id: number) => ({
        id,
        owner: wallet.publicKey || '',
        totalAmount: '0',
        claimedAmount: '0',
        startTime: 0,
        endTime: 0,
        isRevocable: true,
        isTransferable: false,
        isInitialized: true,
        isFrozen: false,
        stepDuration: 0,
        keeperFee: '0',
        title: `Vault #${id}`,
      }))
      store.setVaults(vaults)
      store.setLoadingState('success')
    } catch (err: any) {
      store.setError(err.message)
      store.setLoadingState('error')
    }
  }, [wallet.publicKey])

  return {
    ...store,
    fetchVaults,
  }
}

import { create } from 'zustand'
import type { Vault, GovernanceProposal, ClaimEvent, StakeInfo, LoadingState } from '../lib/types'

interface VaultState {
  vaults: Vault[]
  selectedVault: Vault | null
  proposals: GovernanceProposal[]
  claims: ClaimEvent[]
  stakeInfo: StakeInfo | null
  loadingState: LoadingState
  error: string | null
  setVaults: (vaults: Vault[]) => void
  setSelectedVault: (vault: Vault | null) => void
  setProposals: (proposals: GovernanceProposal[]) => void
  addClaim: (claim: ClaimEvent) => void
  setStakeInfo: (info: StakeInfo | null) => void
  setLoadingState: (state: LoadingState) => void
  setError: (error: string | null) => void
}

export const useVaultStore = create<VaultState>((set) => ({
  vaults: [],
  selectedVault: null,
  proposals: [],
  claims: [],
  stakeInfo: null,
  loadingState: 'idle',
  error: null,

  setVaults: (vaults) => set({ vaults }),
  setSelectedVault: (vault) => set({ selectedVault: vault }),
  setProposals: (proposals) => set({ proposals }),
  addClaim: (claim) => set((state) => ({ claims: [claim, ...state.claims] })),
  setStakeInfo: (info) => set({ stakeInfo: info }),
  setLoadingState: (state) => set({ loadingState: state }),
  setError: (error) => set({ error }),
}))

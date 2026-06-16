export interface Vault {
  id: number
  owner: string
  totalAmount: string
  claimedAmount: string
  startTime: number
  endTime: number
  isRevocable: boolean
  isTransferable: boolean
  isInitialized: boolean
  isFrozen: boolean
  stepDuration: number
  keeperFee: string
  title?: string
}

export interface GovernanceProposal {
  id: number
  action: string
  proposer: string
  createdAt: number
  challengeEnd: number
  isExecuted: boolean
  isCancelled: boolean
  yesVotes: string
  noVotes: string
}

export interface StakeInfo {
  vaultId: number
  state: 'Unstaked' | 'Staked'
  tokensStaked: string
  accumulatedYield: string
}

export interface SuccessionInfo {
  primary: string
  backup: string | null
  switchDuration: number
  lastActivity: number
  timeRemaining: number | null
  state: 'None' | 'Nominated' | 'ClaimPending' | 'Succeeded'
}

export interface ClaimEvent {
  beneficiary: string
  amount: string
  timestamp: number
  vestingId: number
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  state: LoadingState
  error: string | null
}

import {
  rpc,
  Contract,
  Address,
  TransactionBuilder,
  scValToNative,
  nativeToScVal,
} from '@stellar/stellar-sdk'
import { NETWORK_PASSPHRASE, RPC_URL, CONTRACT_ADDRESSES } from './constants'

let server: rpc.Server | null = null

export function getServer(): rpc.Server {
  if (!server) {
    server = new rpc.Server(RPC_URL)
  }
  return server
}

export async function getAccount(publicKey: string) {
  const s = getServer()
  return await s.getAccount(publicKey)
}

export function getContract(contractId: string): Contract {
  return new Contract(contractId)
}

export async function simulateContractCall(
  method: string,
  args: any[],
  source: string,
  contractId: string = CONTRACT_ADDRESSES.VESTING_CONTRACT
) {
  const s = getServer()
  const contract = getContract(contractId)
  const tx = new TransactionBuilder(
    await s.getAccount(source),
    { fee: '10000', networkPassphrase: NETWORK_PASSPHRASE }
  )
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build()

  return await s.simulateTransaction(tx)
}

export async function getVault(env: { publicKey: string }, vaultId: number) {
  const sim = await simulateContractCall(
    'get_vault',
    [nativeToScVal(vaultId, { type: 'u64' })],
    env.publicKey
  )
  if ((sim as any).result?.retval) {
    return scValToNative((sim as any).result.retval)
  }
  return null
}

export async function getUserVaults(env: { publicKey: string }) {
  const sim = await simulateContractCall(
    'get_user_vaults',
    [new Address(env.publicKey).toScVal()],
    env.publicKey
  )
  if ((sim as any).result?.retval) {
    return scValToNative((sim as any).result.retval) as number[]
  }
  return []
}

export async function getClaimableAmount(env: { publicKey: string }, vaultId: number) {
  const sim = await simulateContractCall(
    'get_claimable_amount',
    [nativeToScVal(vaultId, { type: 'u64' })],
    env.publicKey
  )
  if ((sim as any).result?.retval) {
    return scValToNative((sim as any).result.retval) as number
  }
  return 0
}

export async function getVotingPower(env: { publicKey: string }) {
  const sim = await simulateContractCall(
    'get_voting_power',
    [new Address(env.publicKey).toScVal()],
    env.publicKey
  )
  if ((sim as any).result?.retval) {
    return scValToNative((sim as any).result.retval) as number
  }
  return 0
}

export const formatBalance = (balance: string | number): string => {
  const num = typeof balance === 'string' ? parseFloat(balance) : balance
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K'
  return num.toFixed(2)
}

export const shortenAddress = (address: string): string => {
  if (!address) return ''
  return address.slice(0, 6) + '...' + address.slice(-4)
}

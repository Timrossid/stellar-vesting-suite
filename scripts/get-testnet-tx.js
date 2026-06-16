import { rpc, Keypair, TransactionBuilder, BASE_FEE, Networks, Operation } from '@stellar/stellar-sdk'

async function main() {
  const RPC_URL = 'https://soroban-testnet.stellar.org'
  const server = new rpc.Server(RPC_URL)

  // 1. Create a new keypair
  const kp = Keypair.random()
  console.log('Public Key:', kp.publicKey())
  console.log('Secret:', kp.secret())

  // 2. Fund via Friendbot
  console.log('\nFunding account via Friendbot...')
  const friendbotRes = await fetch(
    `https://friendbot-testnet.stellar.org?addr=${kp.publicKey()}`
  )
  const fbJson = await friendbotRes.json()
  const fundTxHash = fbJson.hash
  console.log('✅ Friendbot funding TX hash:', fundTxHash)
  console.log('   View: https://stellar.expert/explorer/testnet/tx/' + fundTxHash)

  // 3. Wait for account to activate
  await new Promise(r => setTimeout(r, 3000))

  // 4. Submit a simple payment to self as a second tx
  console.log('\nSubmitting a simple account transaction...')
  const account = await server.getAccount(kp.publicKey())
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.setOptions({
      homeDomain: 'vesting-dapp-test',
    }))
    .setTimeout(30)
    .build()

  tx.sign(kp)
  const result = await server.sendTransaction(tx)

  if (result.status === 'PENDING') {
    // Wait for confirmation
    let status = result.status
    let attrs
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 2000))
      attrs = await server.getTransaction(result.hash)
      if (attrs.status !== 'NOT_FOUND') break
    }
    if (attrs?.status === 'SUCCESS') {
      console.log('✅ Transaction hash:', result.hash)
      console.log('   View: https://stellar.expert/explorer/testnet/tx/' + result.hash)
    } else {
      console.log('❌ Transaction failed:', attrs?.resultXdr)
    }
  }

  // 5. Try interacting with the vesting contract (simulation)
  console.log('\nContract interaction (simulation):')
  const contractId = 'CD6OGC46OFCV52IJQKEDVKLX5ASA3ZMSTHAAZQIPDSJV6VZ3KUJDEP4D'
  const { Contract, nativeToScVal } = await import '@stellar/stellar-sdk'
  const contract = new Contract(contractId)
  
  const simTx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call('is_paused'))
    .setTimeout(30)
    .build()

  const sim = await server.simulateTransaction(simTx)
  if ((sim as any).result?.retval) {
    const { scValToNative } = await import('@stellar/stellar-sdk')
    console.log('Contract is_paused:', scValToNative((sim as any).result.retval))
  } else {
    console.log('Simulation result:', JSON.stringify(sim, null, 2).slice(0, 500))
  }

  console.log('\n--- Summary ---')
  console.log('Transaction Hash 1 (fund):', fundTxHash)
  console.log('Transaction Hash 2 (setOptions):', result?.hash || 'N/A')
  console.log('Account Public Key:', kp.publicKey())
  console.log('Account Secret Key:', kp.secret())
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})

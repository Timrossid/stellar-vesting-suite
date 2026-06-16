import { rpc } from '@stellar/stellar-sdk'
import { RPC_URL, CONTRACT_ADDRESSES } from './constants'

type EventCallback = (event: any) => void

class EventStream {
  private subscriptions: Map<string, Set<EventCallback>> = new Map()
  private pollingInterval: number | null = null
  private lastLedger: number = 0

  subscribe(eventType: string, callback: EventCallback) {
    if (!this.subscriptions.has(eventType)) {
      this.subscriptions.set(eventType, new Set())
    }
    this.subscriptions.get(eventType)!.add(callback)
    this.startPolling()
    return () => this.unsubscribe(eventType, callback)
  }

  unsubscribe(eventType: string, callback: EventCallback) {
    this.subscriptions.get(eventType)?.delete(callback)
    if (this.subscriptions.size === 0) this.stopPolling()
  }

  private startPolling() {
    if (this.pollingInterval) return
    this.pollInterval()
    this.pollingInterval = window.setInterval(() => this.pollInterval(), 5000)
  }

  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
    }
  }

  private async pollInterval() {
    try {
      const server = new rpc.Server(RPC_URL)
      const ledger = await server.getLatestLedger()
      if (ledger.sequence <= this.lastLedger) return
      this.lastLedger = ledger.sequence

      const response = await server.getEvents({
        startLedger: Math.max(1, ledger.sequence - 10),
        filters: [{ contractIds: [CONTRACT_ADDRESSES.VESTING_CONTRACT] }],
        limit: 50,
      })

      for (const event of response.events) {
        const type = event.type
        const callbacks = this.subscriptions.get(type) || this.subscriptions.get('*')
        callbacks?.forEach(cb => cb(event))
      }
    } catch {
      // Silently retry on next interval
    }
  }
}

export const eventStream = new EventStream()

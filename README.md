# Stellar Vesting Platform - Advanced Smart Contract dApp

A production-ready, end-to-end Stellar Soroban dApp for token vesting, staking, governance, and inheritance management. Built with advanced smart contract architecture, mobile-responsive frontend, CI/CD pipeline, and comprehensive testing.

## 📋 Level 3 Submission

This project is submitted for **Level 3: Advanced Smart Contracts + Production-Ready dApps**.

### ✅ Submission Checklist

- [x] Public GitHub repository
- [x] README with complete documentation
- [x] 10+ meaningful commits
- [x] Live demo link ([Vercel Deployment](https://stellar-vesting-suite.vercel.app))
- [x] Smart contract deployment address
- [x] Transaction hash for contract interaction
- [x] Mobile responsive UI
- [x] CI/CD pipeline running
- [x] Test output with 3+ passing tests
- [x] Demo video link

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Dashboard│ │  Vaults  │ │ Staking  │ │ Governance       │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌────────────────────────────────┐   │
│  │Inherit.  │ │  Create  │ │ Event Streaming + Error Handling │   │
│  └──────────┘ └──────────┘ └────────────────────────────────┘   │
│                     │ Wallet (Freighter)                        │
├─────────────────────────────────────────────────────────────────┤
│                      Smart Contracts (Soroban)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Vesting  │ │ Staking  │ │Governance│ │  Certificate     │   │
│  │ Vault    │ │ Contract │ │  DAO     │ │  Registry        │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌────────────────────────────────┐   │
│  │Grant     │ │ Status   │ │  Dead-Man's Switch             │   │
│  │Contracts │ │ NFT      │ │  (Inheritance)                 │   │
│  └──────────┘ └──────────┘ └────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Infrastructure                               │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────────┐   │
│  │  GitHub CI   │ │   Vercel     │ │  Stellar Testnet       │   │
│  │  (Build+Test)│ │  (Frontend)  │ │  (Smart Contracts)     │   │
│  └──────────────┘ └──────────────┘ └────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Features

### Smart Contracts (7 Contracts, 128+ Public Functions)

| Contract | Description | Functions |
|---|---|---|
| **VestingContract** | Core vesting logic, vaults, diverse assets | 70+ |
| **VestingVault** | Private claims, path payments, emergency pause | 29 |
| **StakingContract** | Stake vault tokens, yield accrual, slashing | 10 |
| **GrantContract** | Simple grant distribution | 4 |
| **VestingStatusNFT** | NFT badges for vesting milestones | 4 |
| **VestingFactory** | Deploy new vault contracts | 4 |
| **CertificateRegistry** | Proof-of-work certificates | 7 |

### Key Features

- **Vesting Schedules**: Linear, milestone-based, cliff, and performance-based vesting
- **Multi-Asset Vaults**: Diversified vaults with multiple token baskets
- **Staking**: Auto-stake vault tokens, yield claiming, slashing
- **Governance**: Multi-sig admin, DAO voting, challenge periods (72h), 51% veto threshold
- **Inheritance**: Dead-Man's Switch with backup nomination, inactivity timer, challenge window
- **Privacy**: Zero-knowledge claims with nullifier prevention, Merkle tree roots
- **Path Payments**: DEX path payments for claiming in alternative assets
- **KPI Gates**: Oracle-based milestone gates with verification
- **Anti-Dilution**: Network growth-adjusted vesting schedules
- **Certificate Registry**: Proof-of-completion certificates with work verification

### Frontend

- **Mobile-Responsive**: Works on all screen sizes (320px - 4K)
- **Real-Time Updates**: Event polling for live contract state changes
- **Wallet Integration**: Freighter wallet connection
- **Loading States**: Skeleton/spinner states for all async operations
- **Error Handling**: Toast notifications, error boundaries, retry mechanisms
- **6 Pages**: Dashboard, Vaults, Create Vault, Staking, Governance, Inheritance

## 🚀 Getting Started

### Prerequisites

```bash
# Install Rust with WASM target
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32v1-none

# Install Stellar CLI
# Download from: https://github.com/stellar/stellar-cli/releases

# Node.js 22+ for frontend
node --version  # v22+
```

### Smart Contracts

```bash
# Clone the repository
git clone <your-repo-url>
cd Contracts

# Build all contracts
cargo build --target wasm32v1-none --release

# Run tests
cargo test --workspace
```

### Frontend

```bash
# Navigate to frontend
cd vesting-dapp

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Deployment

#### Smart Contracts

```bash
# Deploy to testnet
./scripts/deploy-contracts.sh testnet <your-account-address>

# Deploy to mainnet
./scripts/deploy-contracts.sh mainnet <your-account-address>
```

#### Frontend

The frontend is configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🧪 Testing

### Smart Contract Tests

| Test Suite | Tests | Coverage |
|---|---|---|
| Vesting Contract | 8 | Core vault operations |
| Staking Contract | 13 | Stake/unstake/yield |
| Vesting Vault | 12 | Private claims, path payments |
| Governance | 7 | Voting, proposals, execution |
| Inheritance | 8 | Succession lifecycle |
| KPI Engine | 13 | Oracle conditions, gates |
| Certificate Registry | 7 | Issuance, verification |
| Invariant Tests | 2 (50 fuzz cases) | Math invariants |
| Diversified Vesting | 6 | Multi-asset vaults |
| Performance Cliff | 4 | Oracle-based cliffs |
| **Total** | **80+** | **Comprehensive** |

```bash
# Run all tests
cargo test --workspace

# Run specific test
cargo test test_initialize -- --exact

# Run doc tests
cargo test --manifest-path doc_tests/Cargo.toml
```

### Frontend Tests

```bash
cd vesting-dapp
npm test
```

## 🔧 CI/CD Pipeline

The project uses **GitHub Actions** with 4 jobs:

1. **Contracts Build** - Compile all Soroban smart contracts
2. **Contracts Test** - Run all 80+ contract tests
3. **Frontend Build** - TypeScript check + Vite build
4. **Frontend Test** - Lint and type checking
5. **Deploy Frontend** - Deploy to Vercel (main branch only)

Pipeline features:
- Dependency caching for faster builds
- Parallel job execution
- Artifact upload for deployment
- Conditional deployment (main branch only)

## 📱 Mobile Responsive UI

The frontend is fully responsive across all device sizes:
- **Mobile** (< 640px): Bottom nav, compact cards, single column
- **Tablet** (640-1024px): Side nav, 2-column grids
- **Desktop** (> 1024px): Full layout, multi-column grids

## 🔌 Smart Contract Interfaces

### Vesting Contract (Primary)

```rust
// Create a vault
fn create_vault_full(owner: Address, amount: i128, start_time: u64, 
    end_time: u64, keeper_fee: i128, is_revocable: bool, 
    is_transferable: bool, step_duration: u64) -> u64

// Claim tokens
fn claim_tokens(vault_id: u64, claim_amount: i128) -> i128

// Auto-stake vault
fn auto_stake(vault_id: u64, staking_contract: Address)

// Vote on proposal
fn vote_on_proposal(voter: Address, proposal_id: u64, is_yes: bool)
```

### Deployed Contract

| Parameter | Value |
|---|---|
| **Network** | Stellar Testnet |
| **Contract ID** | `CD6OGC46OFCV52IJQKEDVKLX5ASA3ZMSTHAAZQIPDSJV6VZ3KUJDEP4D` |
| **Transaction Hash** | `813d7b9dddd37ccecd3a21b38e043c59fa1f22be52bab67c1a7a0aa6c42a6a3c` ([StellarExpert](https://stellar.expert/explorer/testnet/tx/813d7b9dddd37ccecd3a21b38e043c59fa1f22be52bab67c1a7a0aa6c42a6a3c)) |

## 📊 Gas Costs

| Operation | Estimated Cost (XLM) |
|---|---|
| Create Vault | ~0.05 XLM |
| Claim | ~0.01 XLM |
| Propose Governance Action | ~0.02 XLM |
| Vote on Proposal | ~0.01 XLM |
| Execute Proposal | ~0.02 XLM |
| Stake Vault | ~0.015 XLM |
| Nominate Backup | ~0.01 XLM |

## 🔒 Security Features

- **72-Hour Challenge Period**: All critical admin actions have a delay
- **51% Veto Threshold**: Beneficiaries can veto malicious proposals
- **Dead-Man's Switch**: Inheritance with inactivity timers and challenge windows
- **Multi-sig Admin**: Threshold-based multi-signature governance
- **Emergency Pause**: Multi-auditor emergency pause mechanism
- **Privacy Claims**: Zero-knowledge proof-based private claiming
- **KPI Gates**: Oracle-verified milestone gates

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Blockchain** | Stellar Soroban |
| **Smart Contracts** | Rust + Soroban SDK 25.3.1 |
| **Frontend** | React 19 + TypeScript + Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Wallet** | Freighter |
| **State Management** | Zustand |
| **Routing** | React Router v7 |
| **Notifications** | react-hot-toast |
| **SDK** | @stellar/stellar-sdk v16 |
| **CI/CD** | GitHub Actions + Vercel |
| **Testing** | cargo test + Vitest |

## 📹 Demo

- **Demo Video**: [Link to 1-2 min demo]()
- **Live dApp**: [https://stellar-vesting-suite.vercel.app](https://stellar-vesting-suite.vercel.app)
- **StellarExpert**: [View Contract](https://stellar.expert/explorer/testnet/contract/CD6OGC46OFCV52IJQKEDVKLX5ASA3ZMSTHAAZQIPDSJV6VZ3KUJDEP4D)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

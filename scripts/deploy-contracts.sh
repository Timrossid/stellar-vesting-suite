#!/usr/bin/env bash
set -euo pipefail

echo "================================================"
echo "  Stellar Soroban Vesting Suite Deployer"
echo "================================================"

NETWORK="${1:-testnet}"
ACCOUNT="${2:-}"
RPC_URL="https://soroban-${NETWORK}.stellar.org"
NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

if [ "$NETWORK" == "mainnet" ]; then
  NETWORK_PASSPHRASE="Public Global Stellar Network ; September 2015"
fi

if [ -z "$ACCOUNT" ]; then
  echo "Usage: $0 <testnet|mainnet> <account-address>"
  exit 1
fi

deploy_contract() {
  local contract_path=$1
  local contract_name=$2
  
  echo ""
  echo "Deploying $contract_name..."
  
  local result=$(stellar contract deploy \
    --wasm "target/wasm32v1-none/release/${contract_name}.wasm" \
    --source "$ACCOUNT" \
    --network "$NETWORK" 2>&1)
  
  local contract_id=$(echo "$result" | grep -oP 'Contract ID: \K[a-zA-Z0-9]+' | head -1)
  
  if [ -z "$contract_id" ]; then
    echo "ERROR: Failed to deploy $contract_name"
    echo "$result"
    exit 1
  fi
  
  echo "✅ $contract_name deployed: $contract_id"
  echo "$contract_id"
}

echo ""
echo "Network: $NETWORK"
echo "Account: $ACCOUNT"
echo ""

# Deploy contracts in order (dependencies first)
STAKING_ID=$(deploy_contract "contracts/staking_contract" "staking_contract")
NFT_ID=$(deploy_contract "contracts/vesting_status_nft" "vesting_status_nft")
GRANT_ID=$(deploy_contract "contracts/grant_contracts" "grant_contracts")
VAULT_ID=$(deploy_contract "contracts/vesting_vault" "vesting_vault")
VESTING_ID=$(deploy_contract "contracts/vesting_contracts" "vesting_contracts")

echo ""
echo "================================================"
echo "  Deployment Summary"
echo "================================================"
echo "Staking Contract:    $STAKING_ID"
echo "NFT Contract:        $NFT_ID"
echo "Grant Contract:      $GRANT_ID"
echo "Vesting Vault:       $VAULT_ID"
echo "Vesting Contract:    $VESTING_ID"
echo "================================================"

# Save to file
cat > .soroban/contract-ids.env <<EOF
STAKING_CONTRACT_ID=$STAKING_ID
NFT_CONTRACT_ID=$NFT_ID
GRANT_CONTRACT_ID=$GRANT_ID
VAULT_CONTRACT_ID=$VAULT_ID
VESTING_CONTRACT_ID=$VESTING_ID
EOF

echo ""
echo "✅ Contract IDs saved to .soroban/contract-ids.env"

#!/usr/bin/env bash
set -euo pipefail

echo "================================================"
echo "  Running Smart Contract Tests"
echo "================================================"

echo ""
echo "Building contracts..."
cargo build --target wasm32v1-none --release 2>&1

echo ""
echo "Running unit tests..."
cargo test --workspace 2>&1

echo ""
echo "Running doc tests..."
cargo test --manifest-path doc_tests/Cargo.toml 2>&1

echo ""
echo "================================================"
echo "  Test Summary"
echo "================================================"

# Count tests
TOTAL=$(cargo test --workspace 2>&1 | grep -c "test result:")
PASSED=$(cargo test --workspace 2>&1 | grep -oP '\d+(?= passed)' || echo "0")
FAILED=$(cargo test --workspace 2>&1 | grep -oP '\d+(?= failed)' || echo "0")

echo "Total test suites: $TOTAL"
echo "Tests passed: $PASSED"
echo "Tests failed: $FAILED"

if [ "$FAILED" -gt 0 ]; then
  echo ""
  echo "❌ Some tests failed!"
  exit 1
else
  echo ""
  echo "✅ All tests passed!"
fi

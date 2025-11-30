# ReactiAid Deployment Status

## ✅ Completed Deployments

### DisasterOracle (Origin Contract)
- **Chain**: Base Sepolia (Chain ID: 84532)
- **Address**: `0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e`
- **Transaction**: `0x721e0fa2cca918ef1279a2d1336850205624bc29c712f9b0fa838ad0bbb25c64`
- **Block**: 34387415
- **Status**: ✅ Deployed & Verified
- **Explorer**: https://sepolia.basescan.org/address/0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e

### AidVault (Destination Contract)
- **Chain**: Base Sepolia (Chain ID: 84532)
- **Address**: `0x85Bb445AE2a5EC84BD44e83506Ba87C5a1439600`
- **Transaction**: `0xf06acbdc4e3bc54cee6e31ea694cf89fabafd57b9bc27362847b54f933852378`
- **Block**: 34387909
- **Status**: ✅ Deployed & Verified
- **Explorer**: https://sepolia.basescan.org/address/0x85Bb445AE2a5EC84BD44e83506Ba87C5a1439600
- **Note**: Using placeholder callback proxy address (Base Sepolia doesn't have Reactive Network callback proxy yet)

## ⏳ Pending Deployments

### EmergencyResponse (Reactive Contract)
- **Target Chain**: Reactive Network (Lasna Testnet - Chain ID: 5318007)
- **Status**: ⏳ Waiting for Reactive Network RPC connectivity
- **Required**:
  - ✅ `ORIGIN_CONTRACT_ADDR`: `0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e`
  - ✅ `CALLBACK_CONTRACT_ADDR`: `0x85Bb445AE2a5EC84BD44e83506Ba87C5a1439600`
  - ✅ `SEVERITY_THRESHOLD`: 3
- **Issue**: Reactive Network RPC endpoints currently unreachable
- **Deployment Command**:
  ```bash
  cd contracts
  source .env
  forge script script/DeployEmergencyResponse.s.sol:DeployEmergencyResponse \
    --rpc-url $REACTIVE_RPC \
    --private-key $REACTIVE_PRIVATE_KEY \
    --chain-id $REACTIVE_CHAIN_ID \
    --broadcast \
    --verify \
    --verifier sourcify \
    --verifier-url $SOURCIFY_VERIFIER_URL
  ```

## 📋 Next Steps

1. **Deploy EmergencyResponse to Reactive Network**
   - Ensure you have REACT tokens for gas fees (get from REACT faucet on Sepolia)
   - Ensure Reactive Network RPC is accessible
   - Run the deployment command above
   - Save the deployed address to `.env`: `REACTIVE_CONTRACT_ADDR=0x...`

2. **Update Callback Proxy Address (When Available)**
   - Base Sepolia doesn't currently have a Reactive Network callback proxy
   - When available, update AidVault contract with correct callback proxy address
   - Or redeploy AidVault with the correct callback proxy address

3. **Set Up Subscription**
   - Configure subscription on Reactive Network to monitor `DisasterDeclared` events
   - Chain ID: 84532 (Base Sepolia)
   - Contract: `0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e`
   - Event: `DisasterDeclared(uint8,uint256,string,uint256,address)`

## 🔗 Useful Links

- **Base Sepolia Explorer**: https://sepolia.basescan.org
- **Reactive Network Docs**: https://dev.reactive.network
- **Reactscan (Lasna Testnet)**: https://lasna.reactscan.io
- **GitHub Repository**: https://github.com/morelucks/reactiaid

## 📝 Notes

- All contracts are verified and ready for interaction
- Ensure sufficient gas tokens on each chain before deployment
- Reactive Network RPC may require specific configuration

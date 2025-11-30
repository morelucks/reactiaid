# ReactiAid Deployment Status

## ✅ Completed Deployments

### DisasterOracle (Origin Contract)
- **Chain**: Base Sepolia (Chain ID: 84532)
- **Address**: `0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e`
- **Transaction**: `0x721e0fa2cca918ef1279a2d1336850205624bc29c712f9b0fa838ad0bbb25c64`
- **Block**: 34387415
- **Status**: ✅ Deployed & Verified
- **Explorer**: https://sepolia.basescan.org/address/0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e

## ⏳ Pending Deployments

### AidVault (Destination Contract)
- **Target Chain**: Base Sepolia
- **Status**: ⏳ Waiting for callback proxy address
- **Required**: `DESTINATION_CALLBACK_PROXY_ADDR` (Reactive Network callback proxy for Base Sepolia)
- **Deployment Command**:
  ```bash
  cd contracts
  source .env
  forge script script/DeployAidVault.s.sol:DeployAidVault \
    --rpc-url https://sepolia.base.org \
    --private-key $SEPOLIA_PRIVATE_KEY \
    --broadcast \
    --verify
  ```

### EmergencyResponse (Reactive Contract)
- **Target Chain**: Reactive Network (Lasna Testnet - Chain ID: 5318007)
- **Status**: ⏳ Waiting for AidVault deployment
- **Required**:
  - ✅ `ORIGIN_CONTRACT_ADDR`: `0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e`
  - ⏳ `CALLBACK_CONTRACT_ADDR`: (AidVault address - to be deployed)
  - ✅ `SEVERITY_THRESHOLD`: 3
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

1. **Get Reactive Network Callback Proxy Address**
   - Contact Reactive Network support or check their documentation
   - Update `.env` file: `DESTINATION_CALLBACK_PROXY_ADDR=0x...`

2. **Deploy AidVault to Base Sepolia**
   - Run the deployment command above
   - Save the deployed address to `.env`: `CALLBACK_CONTRACT_ADDR=0x...`

3. **Deploy EmergencyResponse to Reactive Network**
   - Ensure you have REACT tokens for gas fees
   - Run the deployment command above
   - Save the deployed address to `.env`: `REACTIVE_CONTRACT_ADDR=0x...`

4. **Set Up Subscription**
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

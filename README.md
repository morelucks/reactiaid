
# ReactiAid : Decentralized Emergency Response System

**Powered by Reactive Smart Contracts**

ReactiAid is a decentralized emergency-coordination platform that leverages **Reactive Smart Contracts** to trigger, route, and allocate critical aid during disasters or emergency events. It listens to real-time on-chain or external signals and automatically dispatches resources, updates statuses, and coordinates responders — with transparency and zero downtime.

---


##  Problem Statement

Traditional emergency response systems face critical limitations:
- **Delayed communication** between agencies and affected areas
- **Centralized bottlenecks** in decision-making and resource allocation  
- **Lack of transparency** in fund distribution and resource tracking
- **Manual coordination** leading to slow response times during crises

---

##  Solution: ReactiAid

ReactiAid leverages **Reactive Smart Contracts** to create an autonomous, transparent, and efficient emergency response coordination platform that automatically triggers aid distribution based on real-time disaster data.

---

## System Architecture

### Smart Contract Structure

| Contract | Type | Deployment Chain | Purpose |
|----------|------|------------------|---------|
| **DisasterOracle** | Origin | Ethereum Sepolia | Receives disaster alerts from trusted data sources |
| **EmergencyResponse** | Reactive | **Reactive Network** | Processes disaster data and triggers cross-chain responses |
| **AidVault** | Destination | Optimism Sepolia | Manages and distributes emergency funds/resources |

### Why Reactive Contracts Are Essential

This emergency response system **cannot function** without Reactive Contracts. Here's why traditional approaches fail and how Reactive Contracts solve this:

#### The Problem: Why Standard Smart Contracts Fail

1. **No Autonomous Monitoring**
   - Standard smart contracts are passive - they only execute when directly called
   - They cannot monitor events on other chains or contracts
   - Manual monitoring services (bots, oracles) are required, creating:
     - Single points of failure
     - Centralization risks
     - Additional costs and complexity
     - Delays in critical emergency situations

2. **Cross-Chain Coordination is Impossible**
   - Standard contracts exist in isolation on a single chain
   - Emergency data (Origin) and aid funds (Destination) are on different chains
   - No native way to trigger actions across chains automatically
   - Requires trusted bridges or manual intervention

3. **Event-Driven Automation Doesn't Exist**
   - Standard contracts can't subscribe to events
   - No mechanism to react to external state changes
   - Every action requires a user transaction
   - In emergencies, waiting for user action costs lives

4. **Real-Time Response is Not Possible**
   - Traditional systems require:
     - Off-chain monitoring services
     - Manual transaction submission
     - Multi-step coordination across chains
   - This introduces delays that are unacceptable in emergencies

#### The Solution: How Reactive Contracts Enable This System

1. **Autonomous Event Monitoring**
   - Reactive Contracts automatically subscribe to events on Origin chains
   - No external services or bots needed
   - Zero-downtime monitoring built into the network
   - Immediate detection of disaster events

2. **Native Cross-Chain Execution**
   - Reactive Network handles cross-chain communication
   - Automatic callback execution on Destination chains
   - No trusted bridges or manual steps required
   - Secure, verifiable cross-chain transactions

3. **Event-Driven Automation**
   - Contracts react automatically to subscribed events
   - No user intervention needed after initial setup
   - Deterministic execution based on event data
   - Trustless automation at the protocol level

4. **Real-Time Emergency Response**
   - Event detection → Processing → Action happens in seconds
   - No manual steps in the critical path
   - Transparent and auditable on-chain
   - Works 24/7 without human intervention

**Conclusion:** Without Reactive Contracts, this emergency response system would require centralized monitoring services, manual cross-chain coordination, and human intervention at every step - making it slow, unreliable, and unsuitable for emergency situations. Reactive Contracts enable true autonomous, cross-chain, event-driven emergency response coordination.

---

## Technical Implementation

### Core Contracts

```solidity
// DisasterOracle.sol - Origin Contract
contract DisasterOracle {
    event DisasterDeclared(
        uint8 indexed disasterType, 
        uint256 indexed severity, 
        string location,
        uint256 timestamp,
        address indexed declaredBy
    );
    
    function triggerDisaster(
        uint8 _type, 
        uint256 _severity, 
        string calldata _location
    ) external onlyAuthorized {
        emit DisasterDeclared(_type, _severity, _location, block.timestamp, msg.sender);
    }
}

// EmergencyResponse.sol - Reactive Contract  
// Demonstrates MEANINGFUL REACTIVITY:
contract EmergencyResponse {
    enum ResponseLevel { LOW, MEDIUM, HIGH, CRITICAL }
    
    // State tracking across reactions
    mapping(bytes32 => DisasterRecord) public processedDisasters;
    mapping(string => uint256) public locationLastResponse;
    
    function react(bytes calldata eventData) external {
        // 1. Decode and validate event data
        (uint8 disasterType, uint256 severity, string memory location, ...) = 
            abi.decode(eventData, ...);
        
        // 2. Create unique ID to prevent duplicate processing
        bytes32 disasterId = keccak256(...);
        require(!processedDisasters[disasterId].processed, "Already processed");
        
        // 3. Rate limiting per location
        require(block.timestamp >= locationLastResponse[location] + cooldownPeriod, "In cooldown");
        
        // 4. Conditional logic based on severity
        if (severity >= severityThreshold) {
            ResponseLevel level = _determineResponseLevel(severity);
            
            // 5. Trigger cross-chain callback
            emit Callback(callbackContract, callbackData);
        }
        
        // 6. Update state tracking
        processedDisasters[disasterId] = DisasterRecord(...);
        totalDisastersProcessed++;
    }
}
```

### Meaningful Reactivity Features

The `EmergencyResponse` contract demonstrates **meaningful reactivity** beyond simple event passthrough:

1. **Complex Event Processing**: Decodes and validates event data from Origin chain
2. **Duplicate Prevention**: Tracks processed disasters using unique IDs to prevent double-processing
3. **Rate Limiting**: Implements cooldown periods per location to prevent spam
4. **Conditional Logic**: Makes decisions based on severity thresholds and disaster types
5. **State Management**: Maintains state across multiple reactions (processed disasters, location tracking, counters)
6. **Autonomous Cross-Chain Execution**: Triggers callbacks to destination chain without user intervention
7. **Transparency**: Emits events for monitoring and auditing reactive behavior

---

## Core Features

### 1. Reactive Event Triggers

Automatically reacts to:

* On-chain alerts
* Oracle feeds (weather, earthquake, flood alerts)
* Manual SOS requests from verified responders or citizens

### 2. Automated Resource Dispatch

Based on pre-defined rules, the system can:

* Unlock emergency funds
* Assign responders
* Allocate supplies
* Notify local units on-chain

### 3. Transparent Emergency Logs

Every action is:

* Immutable
* Auditable
* Publicly verifiable

Prevents corruption or manipulation during relief operations.

### 4. Multi-Responder Coordination

Local responders, NGOs, government agencies, and volunteers can view:

* Event severity
* Assigned tasks
* Supplies status
* Response progress

All accessible through a decentralized UI.

---

##  Tech Stack

* **Reactive Smart Contracts** – Event-based automation
* **Solidity / Vyper** – Contract logic
* **Reactive Network** – Orchestration triggers
* **Next.js / React** – Frontend dashboard
* **The Graph / Subgraphs** – Event indexing
* **Chainlink / Redstone** – Oracle triggers for disaster data
* **WalletConnect & WalletKit** – Secure wallet connection

---

##  How It Works

1. **Signal Detected:**
   Flood alert, earthquake API, or responder SOS triggers a reactive event.

2. **Reactive Contract Fires:**
   Example rules:

   ```text
   IF severity >= threshold THEN release emergency_fund
   IF location = X THEN assign nearest responder
   ```

3. **UI Updates Live:**
   Subgraph streams new state to the dashboard.

4. **Responders Take Action:**
   Units, supplies, or funds are dispatched automatically.

### Example Reactive Flow

```text
TriggerEvent: FloodWarning(level=5)
→ Smart contract unlocks 2000 USDT from reliefPool
→ Notifies responders in Region-3
→ Updates public dashboard
→ Logs event on-chain
```

---

##  WalletConnect Integration

ReactiAid supports WalletConnect using `@reown/walletkit`, `@walletconnect/core`, and `@walletconnect/utils`. Responders and admins can securely connect their wallets and approve on-chain actions.

### Installation

```bash
npm install @reown/walletkit @walletconnect/utils @walletconnect/core
# or
yarn add @reown/walletkit @walletconnect/utils @walletconnect/core
```

### Initialization

```javascript
import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";

const core = new Core({
  projectId: process.env.PROJECT_ID,
});

const walletKit = await WalletKit.init({
  core,
  metadata: {
    name: "ReactiAid",
    description: "Decentralized Emergency Response Wallet Integration",
    url: "https://reactiaid.example.com",
    icons: [],
  },
});
```

### Handling Sessions

#### Approve Session

```javascript
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';

walletKit.on('session_proposal', async ({ id, params }) => {
  try {
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: ['eip155:1', 'eip155:137'],
          methods: ['eth_sendTransaction', 'personal_sign'],
          events: ['accountsChanged', 'chainChanged'],
          accounts: ['eip155:1:0xYourWalletAddress']
        }
      }
    });

    await walletKit.approveSession({ id, namespaces: approvedNamespaces });
  } catch (error) {
    await walletKit.rejectSession({ id, reason: getSdkError("USER_REJECTED") });
  }
});
```

#### Handle Session Requests

```javascript
walletKit.on('session_request', async ({ topic, params, id }) => {
  const message = hexToUtf8(params.request.params[0]);
  const signedMessage = await wallet.signMessage(message);

  await walletKit.respondSessionRequest({
    topic,
    response: { id, result: signedMessage, jsonrpc: "2.0" },
  });
});
```

#### Disconnect Session

```javascript
await walletKit.disconnectSession({
  topic,
  reason: getSdkError("USER_DISCONNECTED"),
});
```

---

---

## 📦 Deployment Instructions

### Prerequisites

1. **Install Foundry:**
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   source ~/.bashrc
   foundryup
   ```

2. **Install Dependencies:**
   ```bash
   cd contracts
   forge install
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the `contracts` directory:
   ```bash
   # Ethereum Sepolia (Origin Chain)
   SEPOLIA_RPC=https://sepolia.infura.io/v3/YOUR_KEY
   SEPOLIA_PRIVATE_KEY=your_private_key_here
   
   # Reactive Network
   REACTIVE_RPC=https://rpc.reactive.network
   REACTIVE_PRIVATE_KEY=your_private_key_here
   
   # Optimism Sepolia (Destination Chain)
   OPTIMISM_SEPOLIA_RPC=https://sepolia.optimism.io
   OPTIMISM_SEPOLIA_PRIVATE_KEY=your_private_key_here
   
   # Reactive Network Callback Proxy (get from Reactive docs)
   DESTINATION_CALLBACK_PROXY_ADDR=0x...
   
   # Deployment addresses (will be filled after deployment)
   ORIGIN_CONTRACT_ADDR=
   REACTIVE_CONTRACT_ADDR=
   CALLBACK_CONTRACT_ADDR=
   
   # Configuration
   SEVERITY_THRESHOLD=3
   CLIENT_WALLET=your_wallet_address
   ```

### Step 1: Deploy Origin Contract (DisasterOracle) on Ethereum Sepolia

```bash
cd contracts
forge script script/DeployDisasterOracle.s.sol:DeployDisasterOracle \
  --rpc-url $SEPOLIA_RPC \
  --private-key $SEPOLIA_PRIVATE_KEY \
  --broadcast \
  --verify
```

**Expected Output:**
```
DisasterOracle deployed at: 0x...
```

**Save the address** and update your `.env`:
```bash
export ORIGIN_CONTRACT_ADDR=0x...
```

### Step 2: Deploy Destination Contract (AidVault) on Optimism Sepolia

```bash
forge script script/DeployAidVault.s.sol:DeployAidVault \
  --rpc-url $OPTIMISM_SEPOLIA_RPC \
  --private-key $OPTIMISM_SEPOLIA_PRIVATE_KEY \
  --broadcast \
  --verify
```

**Expected Output:**
```
AidVault deployed at: 0x...
```

**Save the address** and update your `.env`:
```bash
export CALLBACK_CONTRACT_ADDR=0x...
```

### Step 3: Deploy Reactive Contract (EmergencyResponse) on Reactive Network

```bash
forge script script/DeployEmergencyResponse.s.sol:DeployEmergencyResponse \
  --rpc-url $REACTIVE_RPC \
  --private-key $REACTIVE_PRIVATE_KEY \
  --broadcast \
  --verify
```

**Expected Output:**
```
EmergencyResponse deployed at: 0x...
Origin contract: 0x...
Callback contract: 0x...
Severity threshold: 3
```

**Save the address** and update your `.env`:
```bash
export REACTIVE_CONTRACT_ADDR=0x...
```

### Step 4: Configure Subscription

After deploying the Reactive contract, you need to set up a subscription to monitor `DisasterDeclared` events from the Origin contract. This is typically done through the Reactive Network dashboard or API.

**Subscription Parameters:**
- **Chain ID:** 11155111 (Ethereum Sepolia)
- **Contract Address:** `$ORIGIN_CONTRACT_ADDR`
- **Event Topic:** `DisasterDeclared(uint8,uint256,string,uint256,address)`
- **Reactive Contract:** `$REACTIVE_CONTRACT_ADDR`

---

## 🔄 Workflow Description

### How ReactiAid Works After Deployment

1. **Disaster Detection (Origin Chain - Ethereum Sepolia)**
   - An authorized oracle or responder calls `triggerDisaster()` on the `DisasterOracle` contract
   - The contract emits a `DisasterDeclared` event with disaster type, severity, location, and timestamp
   - **Transaction Hash:** `[TO_BE_FILLED_AFTER_DEPLOYMENT]`

2. **Reactive Processing (Reactive Network)**
   - The Reactive Network monitors the Origin chain for `DisasterDeclared` events
   - When an event is detected, the Reactive Network calls the `react()` function on `EmergencyResponse`
   - The contract evaluates the severity against the threshold
   - If severity >= threshold, it determines the response level (LOW/MEDIUM/HIGH/CRITICAL)
   - The contract emits a `Callback` event with encoded data for aid distribution
   - **Transaction Hash:** `[TO_BE_FILLED_AFTER_DEPLOYMENT]`

3. **Aid Distribution (Destination Chain - Optimism Sepolia)**
   - The Reactive Network's callback proxy calls `distributeAid()` on the `AidVault` contract
   - The contract verifies the caller is authorized (callback proxy)
   - It calculates the aid amount based on severity and response level
   - Funds are allocated to the location and `AidDistributed` event is emitted
   - **Transaction Hash:** `[TO_BE_FILLED_AFTER_DEPLOYMENT]`

### Complete Workflow Example

```
1. Authorized user triggers disaster on Sepolia:
   → DisasterOracle.triggerDisaster(1, 5, "New York")
   → TX: [ORIGIN_TX_HASH]

2. Reactive Network detects event and processes:
   → EmergencyResponse.react(eventData)
   → Determines: ResponseLevel.HIGH (severity 5 >= threshold 3)
   → Emits: Callback(callbackContract, encodedData)
   → TX: [REACTIVE_TX_HASH]

3. Reactive Network executes callback on Optimism Sepolia:
   → AidVault.distributeAid(1, 5, "New York", 2)
   → Calculates: 5 * (2+1) * 1e18 = 15e18 tokens
   → Updates: locationFunds["New York"] += 15e18
   → Emits: AidDistributed(...)
   → TX: [DESTINATION_TX_HASH]
```

---

## 📋 Contract Addresses

After deployment, update this section with actual addresses:

| Contract | Chain | Address | Status |
|----------|-------|---------|--------|
| DisasterOracle | Ethereum Sepolia | `[TO_BE_FILLED]` | ⏳ Pending |
| EmergencyResponse | Reactive Network | `[TO_BE_FILLED]` | ⏳ Pending |
| AidVault | Optimism Sepolia | `[TO_BE_FILLED]` | ⏳ Pending |

---

## 🧪 Testing

Run the test suite:

```bash
cd contracts
forge test -vvv
```

Expected output:
- ✅ DisasterOracle tests pass
- ✅ EmergencyResponse tests pass
- ✅ AidVault tests pass

---

## 🛡️ Security

* Multi-sig approvals for fund allocation
* Role-based permissions for responders
* Oracle proof verification
* Rate-limited emergency triggers
* Authorized caller verification on destination contract

---

## 🤝 Contributing

Pull requests are welcome! Suggest features, improvements, or new reactive flows.

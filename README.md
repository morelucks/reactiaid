
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

This emergency response system **cannot function** without Reactive Contracts because:
- Traditional smart contracts cannot **autonomously monitor and respond** to external disaster events
- **Cross-chain coordination** between data sources and resource pools requires event-driven execution
- Emergency situations demand **zero-downtime automation** without manual intervention
- **Real-time response coordination** across multiple chains is impossible with standard smart contracts

---

## Technical Implementation

### Core Contracts

```solidity
// DisasterOracle.sol - Origin Contract
contract DisasterOracle {
    event DisasterDeclared(
        uint8 disasterType, 
        uint256 severity, 
        string location,
        uint256 timestamp
    );
    
    function triggerDisaster(
        uint8 _type, 
        uint256 _severity, 
        string calldata _location
    ) external onlyAuthorized {
        emit DisasterDeclared(_type, _severity, _location, block.timestamp);
    }
}

// EmergencyResponse.sol - Reactive Contract  
contract EmergencyResponse {
    enum ResponseLevel { LOW, MEDIUM, HIGH, CRITICAL }
    
    function onDisasterDeclared(
        uint8 disasterType,
        uint256 severity,
        string memory location
    ) external {
        ResponseLevel level = determineResponseLevel(severity);
        uint256 aidAmount = calculateAidAmount(level, location);
        
        // Trigger cross-chain aid distribution
        CrossChainAid.dispatchResources(location, aidAmount, level);
    }
}
```

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

## 🛡️ Security

* Multi-sig approvals for fund allocation
* Role-based permissions for responders
* Oracle proof verification
* Rate-limited emergency triggers

---

## 🤝 Contributing

Pull requests are welcome! Suggest features, improvements, or new reactive flows.

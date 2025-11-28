
# ReactiAid : Decentralized Emergency Response System

**Powered by Reactive Smart Contracts**

ReactiAid is a decentralized emergency-coordination platform that leverages **Reactive Smart Contracts** to trigger, route, and allocate critical aid during disasters or emergency events. It listens to real-time on-chain or external signals and automatically dispatches resources, updates statuses, and coordinates responders — with transparency and zero downtime.

---

## Why ReactiAid?

Traditional emergency response systems face:

* Delays in communication
* Centralized decision bottlenecks
* Corruption or misallocation of relief resources
* Lack of transparent, tamper-proof records

**ReactiAid** solves these using **trustless automation, open state, and reactive logic**.

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

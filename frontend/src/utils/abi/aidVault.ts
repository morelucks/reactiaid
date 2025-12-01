export const AID_VAULT_ADDRESS_BASE_SEPOLIA =
  '0x85Bb445AE2a5EC84BD44e83506Ba87C5a1439600' as const;

export const AID_VAULT_ABI = [
  {
    type: 'constructor',
    inputs: [{ name: '_callbackProxy', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'coverDebt',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'distributeAid',
    inputs: [
      { name: 'disasterType', type: 'uint8' },
      { name: 'severity', type: 'uint256' },
      { name: 'location', type: 'string' },
      { name: 'responseLevel', type: 'uint8' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'locationFunds',
    inputs: [{ name: '', type: 'string' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pay',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalDistributed',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'AidDistributed',
    inputs: [
      {
        name: 'disasterType',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'severity',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'location',
        type: 'string',
        indexed: false,
      },
      {
        name: 'responseLevel',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'recipient',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
] as const;



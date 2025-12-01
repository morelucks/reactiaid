export const DISASTER_ORACLE_ADDRESS_BASE_SEPOLIA =
  '0xaEC3257524637d1B5Aa02CbFA0ADF9b064Fd281e' as const;

export const DISASTER_ORACLE_ABI = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addAuthorized',
    inputs: [{ name: '_address', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'authorized',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeAuthorized',
    inputs: [{ name: '_address', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'triggerDisaster',
    inputs: [
      { name: '_type', type: 'uint8' },
      { name: '_severity', type: 'uint256' },
      { name: '_location', type: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'DisasterDeclared',
    inputs: [
      {
        name: 'disasterType',
        type: 'uint8',
        indexed: true,
      },
      {
        name: 'severity',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'location',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'declaredBy',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
] as const;



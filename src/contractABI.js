export const CONTRACT_ADDRESS = '0xb46ae02609c38ddc8d3135834b6789ec6c043898'

export const ABI = [
  {
    name: 'submitProof',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'incomeThreshold', type: 'uint32' }
    ],
    outputs: []
  },
  {
    name: 'getCredential',
    type: 'function',
    stateMutability: 'view',
    inputs:  [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'tier',   type: 'uint8'   },
      { name: 'expiry', type: 'uint256' },
      { name: 'valid',  type: 'bool'    }
    ]
  },
  {
    name: 'CredentialMinted',
    type: 'event',
    inputs: [
      { name: 'user',    type: 'address', indexed: true  },
      { name: 'tokenId', type: 'uint256', indexed: false },
      { name: 'tier',    type: 'uint8',   indexed: false }
    ]
  }
]
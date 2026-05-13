# ProveIt — Confidential Access Protocol

> Prove you qualify. Reveal nothing.

ProveIt is a confidential income-gated DeFi access protocol built on Zama's FHEVM.
Users prove their income crosses a threshold to unlock tiered yield pools —
without revealing their salary, employer, or wallet identity.

The proof runs fully onchain. The contract never sees your income value.
Only a boolean result is returned: qualified or not.

---

## The Problem

DeFi has a compliance gap.

Institutions and accredited investors want access to gated financial products.
But participating means exposing everything — wallet history, identity, financial standing —
publicly, onchain, forever.

So they stay out.

ProveIt closes that gap. You prove you qualify. Nothing else is disclosed.

---

## How It Works

1. User inputs an income value into the simulator
2. The value is encrypted client-side using TFHE-rs before it touches the chain
3. The FHEVM contract runs a homomorphic threshold comparison onchain
4. A boolean result is returned — qualified or not
5. A soulbound credential is minted to the qualifying wallet
6. The credential unlocks access to the corresponding yield tier

At no point is the income value decrypted or stored onchain.

---

## Access Tiers

| Tier | Threshold | APY | Credential |
|------|-----------|-----|------------|
| Bronze | $30,000+ | 4.2% | 90-day soulbound |
| Silver | $60,000+ | 8.7% | 90-day soulbound |
| Gold | $100,000+ | 14.5% | 90-day soulbound |

Credentials expire after 90 days and require re-attestation.
APY rates are illustrative for the hackathon prototype.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Smart Contract | Zama FHEVM (Solidity + TFHE-rs) |
| Network | Ethereum Sepolia Testnet |
| Frontend | React 18 + Vite 6 |
| Routing | React Router v6 |
| Wallet | Wagmi + Viem |
| Styling | Tailwind CSS 3.4.1 + CSS Variables |
| Deployment | Render (Static Site) |

---
---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/Davexinoh/proveit.git
cd proveit

# Install dependencies
npm install

# Start dev server
npm run dev
Deployment
Frontend deployed on Render as a static site.
Build command:npm run build
Publish directory:dist
Live URL: https://proveit-dgjf.onrender.com


## Key Design Decisions
Why FHE over ZK?
This project is built specifically for Zama's FHEVM ecosystem. FHE allows
arbitrary computation on encrypted data — the threshold comparison runs
directly on the encrypted income value without any decryption step.
ZK would require a circuit for each comparison. FHE handles it natively onchain.
Why soulbound credentials?
Soulbound tokens are non-transferable. A credential tied to a wallet
cannot be sold or transferred to a wallet that didn't earn it.
This maintains the integrity of the access system.
Why 90-day expiry?
Income changes. A credential issued today may not reflect reality in a year.
Forced re-attestation keeps the system honest and mirrors how
real-world compliance checks work.
Security Notes
Income values are encrypted client-side before submission
No plaintext value is ever sent to the contract or stored onchain
Soulbound credentials prevent credential transfer attacks
Credential expiry limits the window of stale attestations
Contract address visible onchain for full transparency
Hackathon Context
Built for Zama Developer Program — Mainnet Season 2
Track: Builder Track
Theme: Confidential Finance
Network: Ethereum Sepolia
"Confidential finance is the next frontier."
— Zama Season 2 brief
Builder
Built by Davexinoh (Davexinoh Labs)
𝕏 @dontfadedave
GitHub Davexinoh
License
MIT

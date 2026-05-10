import { createWalletClient, http, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { readFileSync } from "fs";
import { resolve } from "path";

const pk = process.env.PK;
const account = privateKeyToAccount(pk);

const wallet = createWalletClient({ account, chain: sepolia, transport: http("https://ethereum-sepolia-rpc.publicnode.com") });
const client = createPublicClient({ chain: sepolia, transport: http("https://ethereum-sepolia-rpc.publicnode.com") });

const artifact = JSON.parse(readFileSync(resolve("artifacts/contracts/IncomeVerifier.sol/IncomeVerifier.json"), "utf8"));

async function main() {
  console.log("Deploying from:", account.address);
  const hash = await wallet.deployContract({ abi: artifact.abi, bytecode: artifact.bytecode, args: [] });
  console.log("Tx hash:", hash);
  const receipt = await client.waitForTransactionReceipt({ hash });
  console.log("IncomeVerifier deployed to:", receipt.contractAddress);
}

main().catch(e => { console.error(e); process.exit(1); });

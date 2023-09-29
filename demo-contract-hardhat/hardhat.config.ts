import { HardhatUserConfig, task } from "hardhat/config";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import "@nomicfoundation/hardhat-verify";
import { NumberStorage } from "./types"
import { Sleep } from "./utils/sleep"
import dotenv from 'dotenv';
dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.NODE_URL || !process.env.PRIVATE_KEY || !process.env.POLYGONSCAN_API_KEY) {
  throw new Error("missing necessary environment variables. Ensure NODE_URL, PRIVATE_KEY, and POLYGONSCAN_API_KEY are set.");
}

task("increment", "call-increment-method")
  .addParam("address", "the smart contract address")
  .setAction(async (taskArgs, hre) => {
    // TODO(ca): check if address is valid
    const contract = await hre.ethers.getContractAt("NumberStorage", taskArgs.address) as unknown as NumberStorage;
    const tx = await contract.increment()
    await tx.wait()
    console.log("tx hash:", tx.hash);
  })

task("listen", "listen `EvenNumber` event")
  .addParam("address", "the smart contract address")
  .addOptionalParam("deadline", "the seconds for execution deadline")
  .setAction(async ({ address, deadline }, hre) => {
    // TODO(ca): check if address is valid

    const contract = await hre.ethers.getContractAt("NumberStorage", address) as unknown as NumberStorage;
    const filters = contract.filters.EvenNumber()
    console.log("listen `EvenNumber` event...")
    contract.on(filters, (value) => {
      console.log("received new event", value);
    })

    // wait for deadline
    const seconds = Number(deadline) || 10;
    await Sleep(seconds)
  })

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.NODE_URL!,
      accounts: [process.env.PRIVATE_KEY!]
    },
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v6',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    dontOverrideCompile: false // defaults to false
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY!,
    }
  }
};

export default config;

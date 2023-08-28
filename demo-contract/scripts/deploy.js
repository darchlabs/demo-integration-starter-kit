const hre = require("hardhat");
const dotenv = require('dotenv');
const fs = require('fs')
const promisify = require('util').promisify

const writeFile = promisify(fs.writeFile)

dotenv.config()

const privateKey = process.env.PRIVATE_KEY;
const apiKey = process.env.API_KEY;

if (!privateKey || !apiKey) {
  throw new Error("Credentials not found");
}

async function main() {
  const provider = new hre.ethers.providers.JsonRpcProvider(apiKey)

  const wallet = new hre.ethers.Wallet(privateKey, provider)

  const signer = wallet.connect(provider)

  const Demo = await hre.ethers.getContractFactory("Demo", signer);
  const DemoInstance = await Demo.deploy();
  const demoInstanceAddress = DemoInstance.address;

  const contractAddress = {
    demoInstanceAddress
  }

  await writeFile('./contract-address.json', JSON.stringify(contractAddress, null, 2))
  console.log("Demo contract deployed")

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
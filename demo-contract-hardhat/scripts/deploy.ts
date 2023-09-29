import { ethers } from "hardhat";

async function main() {
  const numberStorage = await ethers.deployContract("NumberStorage");
  await numberStorage.waitForDeployment();

  console.log(`NumberStorage contract deployed to ${numberStorage.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

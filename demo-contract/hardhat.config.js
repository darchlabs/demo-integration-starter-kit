require("@nomicfoundation/hardhat-toolbox");
const dotenv = require('dotenv')

dotenv.config()

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error("API_KEY not found");
}

const config = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      loggingEnabled: true,
      forking: {
        url: apiKey,
        blockNumber: 4154665,
      },
    },
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = config;


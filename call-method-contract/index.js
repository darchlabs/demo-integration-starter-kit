(async function () {
  const dotenv = require("dotenv");
  const { ethers } = require("ethers");
  const Demo = require("../api/Demo.sol/Demo.json");
  const { abi } = Demo;

  dotenv.config();

  const apiKey = process.env.API_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  const provider = new ethers.providers.JsonRpcProvider(apiKey)
  const wallet = await (new ethers.Wallet(privateKey, provider)).connect(provider);

  // address: "0x5514ecbc6775331a96be634581d35541023c814f",
	// 	nodeURL: "https://node.mumbai.url",
	// 	abi: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "newState", "type": "bool" }], "name": "StatusActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "newState", "type": "bool" }], "name": "StatusChanged", "type": "event" }, { "inputs": [], "name": "getActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "perform", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setAcitve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],


  const contract = new ethers.Contract(
    contractAddress,
    abi,
    wallet,
  );

  const connectedContract = contract.connect(wallet);

  const filters = connectedContract.filters.StatusChanged();

  connectedContract.on(filters, (bool) => {
    console.log(`Status changed to ${bool}`);
  });
})();

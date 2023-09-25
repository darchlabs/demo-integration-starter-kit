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

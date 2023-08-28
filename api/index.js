const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { ethers } = require("ethers");
const Demo = require("./Demo.sol/Demo.json");
const DemoDeployed = require("./contract-address.json");
const { abi } = Demo;

dotenv.config();

const apiKey = process.env.API_KEY;
const privateKey = process.env.PRIVATE_KEY;
const port = process.env.PORT || 3001;

if (!apiKey || !privateKey || !port) {
  throw new Error("Missing env vars");
}

router.post("/api/v1/webhook", (req, res) => {
  console.log(`webhook at ${Date.now()}`);
  console.log(req.body);
  res.status(200).send();
});

router.post("/api/v1/sc-toggle", async (req, res) => {
  const provider = new ethers.providers.JsonRpcProvider(apiKey)
  const wallet = await (new ethers.Wallet(privateKey, provider)).connect(provider);

  const contract = new ethers.Contract(
    DemoDeployed.demoInstanceAddress,
    abi,
    wallet,
  );

  const connectedContract = contract.connect(wallet);

  const changeState = await connectedContract.setAcitve();

  const tx = await changeState.wait();

  console.log(tx);

  console.log(await connectedContract.isActive())

  res.status(200).send(JSON.stringify({ toggle: "ok" }));
});

const app = express();
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

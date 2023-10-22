import { server, webhooks } from "darchlabs";
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.PORT || !process.env.ADDRESS || !process.env.NODE_URL || !process.env.PRIVATE_KEY) {
	throw new Error("missing necessary environment variables. Ensure PORT, ADDRESS, NODE_URL and PRIVATE_KEY are set.");
}

const main = async () => {
	server.ListenServer(Number(process.env.PORT), "/api/v1/webhook", async (wh: webhooks.Webhook<unknown>) => {
		try {
			// validate the webhook data
			if (!wh || !wh.id) {
				console.error("Invalid webhook data received.");
				return;
			}

			console.log(`Received webhook with ID: ${wh.id}`);

			// define configuration to trigger method in another contract
			const config: server.TriggerEVMMethodConfig = {
				network: "mumbai",
				nodeUrl: process.env.NODE_URL!,
				abi: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "number", "type": "uint256" }], "name": "EvenNumber", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "number", "type": "uint256" }], "name": "OddNumber", "type": "event" }, { "inputs": [], "name": "getCurrentNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "isEven", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "jobAction", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
				address: process.env.ADDRESS!, // Replace with your contract address
				privateKey: process.env.PRIVATE_KEY!,
				methodName: "increment",
			}

			console.log("BEFORE")
			// trigger the method on the smart contract
			const tx = await server.TriggerEVMMethod(config);
			console.log(`Transaction successful with hash: ${tx.hash}`);
		} catch (err: any) {
			console.error(`Error processing webhook: ${err.message}`);
		}
	});
}

main();
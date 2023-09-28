import { util, webhooks } from "darchlabs";
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.nodeUrl || !process.env.privateKey) {
	throw new Error("missing necessary environment variables. Ensure NODE_URL and PRIVATE_KEY are set.");
}

const main = async () => {
	util.ListenServer(3000, "/api/v1/webhook", async (wh: webhooks.Webhook<unknown>) => {
		try {
			// validate the webhook data
			if (!wh || !wh.id) {
				console.error("Invalid webhook data received.");
				return;
			}

			console.log(`Received webhook with ID: ${wh.id}`);

			// define configuration to trigger method in another contract
			const config: util.TriggerEVMMethodConfig = {
				network: "mumbai",
				nodeUrl: process.env.NODE_URL!,
				abi: [ /* Insert your contract ABI here */],
				address: "0x1234abcd...", // Replace with your contract address
				privateKey: process.env.PRIVATE_KEY!,
				methodName: "increment",
			}

			// trigger the method on the smart contract
			const tx = await util.TriggerEVMMethod(config);
			console.log(`Transaction successful with hash: ${tx.hash}`);
		} catch (err: any) {
			console.error(`Error processing webhook: ${err.message}`);
		}
	});
}

main();
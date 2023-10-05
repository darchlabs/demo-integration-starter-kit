import { server, webhooks } from "darchlabs";
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.PORT) {
	throw new Error("missing necessary environment variables. Ensure PORT is set.");
}

const main = async () => {
	server.ListenServer(Number(process.env.PORT), "/api/v1/webhook", async (wh: webhooks.Webhook<unknown>) => {
		console.log("> webhook received!", wh.id)
	});
}

main();
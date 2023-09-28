import Darchlabs, { util, webhooks } from "darchlabs";
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Ensure necessary environment variables are set
if (!process.env.YOUR_API_KEY || !process.env.NODE_URL) {
	throw new Error("missing necessary environment variables. Ensure YOUR_API_KEY and set are set.");
}

const { synchronizers } = new Darchlabs(process.env.YOUR_API_KEY)

const main = async () => {
	// new contract to synchronize
	const created = await synchronizers.contracts.createContract({
		name: "MyContract",
		network: "mumbai",
		address: "0x5514ecbc6775331a96be634581d35541023c814f",
		nodeURL: process.env.NODE_URL!,
		abi: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "newState", "type": "bool" }], "name": "StatusActive", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "newState", "type": "bool" }], "name": "StatusChanged", "type": "event" }, { "inputs": [], "name": "getActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "perform", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setAcitve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
		webhook: "https://www.darchlabs.com/1"
	});
	console.log("contract", created);

	// list all events of a contract
	const { events, pagination: p1 } = await synchronizers.events.listEventsByAddress(created.address);
	console.log("events", events, p1);

	// list all events datas of an event
	const [firstEvent] = events;
	const { datas, pagination: p2 } = await synchronizers.events.listEventData(created.address, firstEvent?.abi?.name);
	console.log("datas", datas, p2);

	// update contract
	await synchronizers.contracts.updateContract(created.address, {
		name: "MyContract2",
		webhook: "https://www.darchlabs.com/2",
		nodeURL: "https://polygon-mumbai.infura.io/v3/3d814cb053bf41f2ae0d7bada208e9eb",
	});

	// list contracts
	const { contracts, pagination: p3 } = await synchronizers.contracts.listContracts();
	console.log("contracts", contracts, p3);

	// restart contract
	await synchronizers.contracts.restartContractByAddress(created.address);
	console.log("restarted contract successful");

	// delete contract
	await synchronizers.contracts.deleteContractByAddress(created.address);
	console.log("deleted contract successful");

	// list contract with pagination
	const { contracts: newContracts, pagination: p4 } = await synchronizers.contracts.listContracts({
		sort: "ASC",
		limit: 10,
		page: 1,
	})
	console.log("contracts", newContracts, p4)
}

main();
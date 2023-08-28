# demo-integration-starter-kit
This is a demo integration starter kit to show how DarchLabs.com services work together


## About the project

The project is intended to provide a demo-starter-kit using darchlabs.com services.

### DarhLabs Services

This project uses the following services


* Synchronizers + webhooks
* Jobs

### Project components

* Demo smart contract
* Sample backend
	* **POST /api/v1/webhook**: This 	endpoint will receive the webhook events indexed by DarchLabs synchronizer
	* **Post /api/v1/sc-toggle**: This endpoint will enable/disable the smart contract to emit or not the example events.

	
## Overview

The demo project has the following interaction between DarchLabs, Smart Contract, Blockchain netwrok, and backend

![](https://i.imgur.com/cFFHFba.png)

## How to run it

There are two folders for this demo: `api` and `demo-contract`. 

```
cd ./demo-contract
touch .env
npm i
```

Provide the following credentials to your `.env` file:

```
API_KEY=''
PRIVATE_KEY=''
```

Where `API_KEY` is your rpc url provided by infura or alchemy and `PRIVATE_KEY` is your wallet private key from some of the testnets.

Run the following:

```
npm run compile
npm run deploy
npm run export-artifacts
```

Then:

```
cd api
touch .env
npm i
```

Copy the same env vars from the `demo-contract`

```
npm run dev
```

Finally open `postman` and query the following url with a POST request:

```
http://localhost:3000/api/v1/sc-toggle
```
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
	* **Post /api/v1/sc-action**: This endpoint will enable/disable the smart contract to emit or not the example events.

	
## Overview

The demo project has the following interaction between DarchLabs, Smart Contract, Blockchain netwrok, and backend

![](https://i.imgur.com/cFFHFba.png)

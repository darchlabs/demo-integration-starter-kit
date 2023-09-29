compile:
	@echo "[compile] Compiling"
	@npx hardhat compile
	@npx hardhat typechain

deploy:
	@echo "[deploy] Deploying"
	@npx hardhat run scripts/deploy.ts 

# Other utils comands...
# npx hardhat verify --network mumbai <ADDRESS>
# npx hardhat increment --address <ADDRESS> --network mumbai
# npx hardhat listen --address <ADDRESS> --deadline 1000 --network mumbai
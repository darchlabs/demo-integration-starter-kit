# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Example commands

```
npx hardhat run scripts/deploy.ts  --network mumbai
---
NumberStorage contract deployed to 0x07eD2B7E4E9a02d81b6830Ef138347494D57aD00
```

```bash
npx hardhat verify --network mumbai 0x66559aD3867E18944e6dDeAc2F5393a6BEa1f51d
```

```bash
npx hardhat increment --address 0x07eD2B7E4E9a02d81b6830Ef138347494D57aD00 --network mumbai
---
tx hash: 0x627ef68f534fa89d6d8f45f7796c519c4c428821c57017c9d3e97bbeefeb4dc1
```

```bash
npx hardhat listen --address 0x07eD2B7E4E9a02d81b6830Ef138347494D57aD00 --network mumbai --deadline 1000
---
listen `EvenNumber` event...
received new event ContractEventPayload {
  filter: PreparedTopicFilter {
    fragment: EventFragment {
      type: 'event',
      inputs: [Array],
      name: 'EvenNumber',
      anonymous: false
    }
  },
  emitter: Contract {
    target: '0x07eD2B7E4E9a02d81b6830Ef138347494D57aD00',
    interface: Interface {
      fragments: [Array],
      deploy: [ConstructorFragment],
      fallback: null,
      receive: false
    },
    runner: HardhatEthersSigner {
      _gasLimit: undefined,
      address: '0x960FFA8D6744ea75950A1EB1B42b1F347fdD824D',
      provider: [HardhatEthersProvider]
    },
    filters: {},
    fallback: null,
    [Symbol(_ethersInternal_contract)]: {}
  },
  log: EventLog {
    provider: HardhatEthersProvider {
      _hardhatProvider: [LazyInitializationProviderAdapter],
      _networkName: 'mumbai',
      _blockListeners: [Array],
      _transactionHashListeners: Map(0) {},
      _eventListeners: [Array],
      _isHardhatNetworkCached: false,
      _latestBlockNumberPolled: 40886034,
      _blockPollingInterval: Timeout {
        _idleTimeout: 500,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 18883,
        _onTimeout: [AsyncFunction (anonymous)],
        _timerArgs: undefined,
        _repeat: 500,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 89,
        [Symbol(triggerId)]: 0
      }
    },
    transactionHash: '0x627ef68f534fa89d6d8f45f7796c519c4c428821c57017c9d3e97bbeefeb4dc1',
    blockHash: '0xb63beb3a89bb67be918638145a71894a3e644bfed1f991cef0a6b2f50d31e257',
    blockNumber: 40886034,
    removed: false,
    address: '0x07eD2B7E4E9a02d81b6830Ef138347494D57aD00',
    data: '0x',
    topics: [
      '0x9084ab740fc8dff226cf83eb2ef08067b18400eb0c5b0c73aa4604a3c95d2aa0',
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    ],
    index: 0,
    transactionIndex: 0,
    interface: Interface {
      fragments: [Array],
      deploy: [ConstructorFragment],
      fallback: null,
      receive: false
    },
    fragment: EventFragment {
      type: 'event',
      inputs: [Array],
      name: 'EvenNumber',
      anonymous: false
    },
    args: Result(1) [ 2n ]
  },
  args: Result(1) [ 2n ],
  fragment: EventFragment {
    type: 'event',
    inputs: [ [ParamType] ],
    name: 'EvenNumber',
    anonymous: false
  }
}
```

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NumberStorage {
    // Variable to store a number
    uint256 private _number;

    // Events emitted based on whether the number is even or odd
    event EvenNumber(uint256 indexed number);
    event OddNumber(uint256 indexed number);

    // Increment the number by 1 and emit an event based on its parity.
    function increment() public {
        _number += 1;

        if (_number % 2 == 0) {
            emit EvenNumber(_number);
        } else {
            emit OddNumber(_number);
        }
    }

    // Retrieve the current number.
    function getCurrentNumber() public view returns (uint256) {
        return _number;
    }

    // This is the "checkMethod" required by Jobs and will be used in Jobs Smart Contract Tutorial
    // https://docs.darchlabs.com/docs/tutorials/jobs-smartcontract
    function isEven() public view returns (bool) {
        return _number % 2 == 0;
    }

    // This is the "actionMethod" required by Jobs and will be used in Jobs Smart Contract Tutorial
    // https://docs.darchlabs.com/docs/tutorials/jobs-smartcontract
    function jobAction() public {
        increment();
    }
}

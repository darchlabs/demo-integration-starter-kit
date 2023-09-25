// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Storage {
    uint256 number;

    event Increment();

    constructor() {
        number = 0;
    }

    function increment(uint256 num) public {
        number = num;
        emit Increment();
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}

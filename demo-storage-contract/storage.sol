// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Storage {
    uint256 number;

    event Increment(uint256 num);

    constructor() {
        number = 0;
    }

    function increment() public {
        number = number + 1;
        emit Increment(number);
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}

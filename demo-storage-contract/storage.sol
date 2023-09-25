// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Storage {
    uint256 number;

    constructor() {
        number = 0;
    }

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Demo {
    bool public isActive;

    event StatusChanged(bool newState);
    event StatusActive(bool newState);

    constructor() {
        isActive = false;
    }

    function setAcitve() public {
        isActive = !isActive;
        emit StatusChanged(isActive);
    }

    function perform() public {
      if(isActive) {
        emit StatusActive(isActive);
      }
    }

    function getActive() public view returns (bool) {
        return isActive;
    }
}

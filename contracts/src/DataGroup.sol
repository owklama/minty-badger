// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// Represents a data group
contract DataGroup is Ownable {
    string public name;
    string public symbol;
    string public metaData;
    bool public active;

    constructor(string memory _name, string memory _symbol, string memory _metaData) {
        name = _name;
        symbol = _symbol;
        metaData = _metaData;
        active = true;
    }

    function deactivate() public onlyOwner {
        active = false;
    }

    function updateMetaData(string memory _metaData) public onlyOwner {
        metaData = _metaData;
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataGroup.sol";

// Factory contract for creating new data groups
contract DataGroupFactory is Ownable {
    event DataGroupCreated(address indexed dataGroupAddress, string name, string symbol);

    function createDataGroup(string memory _name, string memory _symbol, string memory _metaData) public onlyOwner returns (DataGroup) {
        DataGroup dataGroup = new DataGroup(_name, _symbol, _metaData);
        emit DataGroupCreated(address(dataGroup), _name, _symbol);
        return dataGroup;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/lib/ds-test/src/test.sol";
import "../src/DataGroup.sol";

contract DataGroupTest is DSTest {
    DataGroup public dataGroup;

    function setUp() public {
        dataGroup = new DataGroup("DataGroupName", "DataGroupSymbol", "DataGroupMetadata");
    }

    function testConstructor() public {
        assertEq(dataGroup.name(), "DataGroupName");
        assertEq(dataGroup.symbol(), "DataGroupSymbol");
        assertEq(dataGroup.metaData(), "DataGroupMetadata");
        assertTrue(dataGroup.active());
    }

    function testDeactivate() public {
        dataGroup.deactivate();
        assertFalse(dataGroup.active());
    }

    function testUpdateMetaData() public {
        dataGroup.updateMetaData("UpdatedMetadata");
        assertEq(dataGroup.metaData(), "UpdatedMetadata");
    }
}

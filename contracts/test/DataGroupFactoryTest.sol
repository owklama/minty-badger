// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/lib/ds-test/src/test.sol";
import "../src/DataGroupFactory.sol";

contract DataGroupFactoryTest is DSTest {
    DataGroupFactory public dataGroupFactory;

    function setUp() public {
        dataGroupFactory = new DataGroupFactory();
    }

    function testCreateDataGroup() public {
        DataGroup dataGroup = dataGroupFactory.createDataGroup("DataGroupName", "DataGroupSymbol", "DataGroupMetadata");
        assertEq(dataGroup.name(), "DataGroupName");
        assertEq(dataGroup.symbol(), "DataGroupSymbol");
        assertEq(dataGroup.metaData(), "DataGroupMetadata");
        assertTrue(dataGroup.active());
    }
}

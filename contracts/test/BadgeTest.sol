// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/lib/ds-test/src/test.sol";
import "../src/Badge.sol";

contract BadgeTest is DSTest {
    Badge public badge;

    function setUp() public {
        badge = new Badge("BadgeName", "BadgeSymbol", address(this));
    }

    function testConstructor() public {
        assertEq(badge.name(), "BadgeName");
        assertEq(badge.symbol(), "BadgeSymbol");
        assertEq(badge.factory(), address(this));
    }

    function testMint() public {
        uint256 totalSupplyBefore = badge.totalSupply();
        badge.mint(address(0x1));
        assertEq(badge.totalSupply(), totalSupplyBefore + 1);
    }
}

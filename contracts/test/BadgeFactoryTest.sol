// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/lib/ds-test/src/test.sol";
import "../src/BadgeFactory.sol";

contract BadgeFactoryTest is DSTest {
    BadgeFactory public badgeFactory;

    function setUp() public {
        badgeFactory = new BadgeFactory("BadgeName", "BadgeSymbol");
    }

    function testConstructor() public {
        assertEq(badgeFactory.getBadgeName(), "BadgeName");
        assertEq(badgeFactory.getBadgeSymbol(), "BadgeSymbol");
    }

    function testMintBadge() public {
        uint256 totalSupplyBefore = badgeFactory.getBadgeTotalSupply();
        badgeFactory.mintBadge(address(0x1));
        assertEq(badgeFactory.getBadgeTotalSupply(), totalSupplyBefore + 1);
    }
}

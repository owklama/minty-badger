// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

import { Badge } from "../src/Badge.sol";
import { FoundryContext } from "forge-foundry/dist/forge";
import { ethers } from "ethers";

let badge: Badge;

export async function main(ctx: FoundryContext) {
    // Getting signer
    const signer = (await ctx.provider.getSigners())[0];

    // Deploying Badge contract
    const badgeFactory = new ctx.foundry.ethers.ContractFactory(Badge.abi, Badge.bytecode, signer);
    badge = await badgeFactory.deploy("BadgeName", "BadgeSymbol", signer.address);
    await badge.deployed();

    console.log("Badge contract deployed to:", badge.address);
}

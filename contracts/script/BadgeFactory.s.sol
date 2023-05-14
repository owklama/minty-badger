// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

import { BadgeFactory } from "../src/BadgeFactory.sol";
import { FoundryContext } from "forge-foundry/dist/forge";
import { ethers } from "ethers";

let badgeFactory: BadgeFactory;

export async function main(ctx: FoundryContext) {
    // Getting signer
    const signer = (await ctx.provider.getSigners())[0];

    // Deploying BadgeFactory contract
    const badgeFactoryContract = new ctx.foundry.ethers.ContractFactory(BadgeFactory.abi, BadgeFactory.bytecode, signer);
    badgeFactory = await badgeFactoryContract.deploy("BadgeFactoryName", "BadgeFactorySymbol");
    await badgeFactory.deployed();

    console.log("BadgeFactory contract deployed to:", badgeFactory.address);
}

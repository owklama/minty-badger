// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

import { DataGroupFactory } from "../src/DataGroupFactory.sol";
import { FoundryContext } from "forge-foundry/dist/forge";
import { ethers } from "ethers";

let dataGroupFactory: DataGroupFactory;

export async function main(ctx: FoundryContext) {
    // Getting signer
    const signer = (await ctx.provider.getSigners())[0];

    // Deploying DataGroupFactory contract
    const dataGroupFactoryContract = new ctx.foundry.ethers.ContractFactory(DataGroupFactory.abi, DataGroupFactory.bytecode, signer);
    dataGroupFactory = await dataGroupFactoryContract.deploy();
    await dataGroupFactory.deployed();

    console.log("DataGroupFactory contract deployed to:", dataGroupFactory.address);
}

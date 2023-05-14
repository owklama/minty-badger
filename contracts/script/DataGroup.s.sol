// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

import { DataGroup } from "../src/DataGroup.sol";
import { FoundryContext } from "forge-foundry/dist/forge";
import { ethers } from "ethers";

let dataGroup: DataGroup;

export async function main(ctx: FoundryContext) {
    // Getting signer
    const signer = (await ctx.provider.getSigners())[0];

    // Deploying DataGroup contract
    const dataGroupFactory = new ctx.foundry.ethers.ContractFactory(DataGroup.abi, DataGroup.bytecode, signer);
    dataGroup = await dataGroupFactory.deploy("DataGroupName", "DataGroupSymbol", "DataGroupMetaData");
    await dataGroup.deployed();

    console.log("DataGroup contract deployed to:", dataGroup.address);
}

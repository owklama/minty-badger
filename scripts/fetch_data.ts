import { ethers } from "ethers";

// Assuming the Factory contract is already deployed and we have its address
const factoryContractAddress = "0xYourFactoryContractAddress";

// Initialize ethers.js and connect to the Factory contract
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Replace with your Ethereum node's RPC URL
const signer = provider.getSigner(); // Replace with the signer that has permission to create data groups
const factoryContract = new ethers.Contract(
  factoryContractAddress,
  FactoryABI,
  signer,
);

// Define a function to create a data group
async function createDataGroup(name, symbol, metaData) {
  try {
    // Call the createDataGroup method on the factory contract
    const createDataGroupTx = await factoryContract.createDataGroup(
      name,
      symbol,
      metaData,
    );

    // Wait for the transaction to be mined
    const receipt = await createDataGroupTx.wait();

    // The DataGroupCreated event is emitted upon successful creation of a data group.
    // We can extract the address of the newly created data group from the event logs.
    const dataGroupCreatedEvent = receipt.events?.find(
      (e) => e.event === "DataGroupCreated",
    );
    const dataGroupAddress = dataGroupCreatedEvent?.args?.dataGroup;

    console.log(`Data group ${name} created at address: ${dataGroupAddress}`);

    return dataGroupAddress;
  } catch (error) {
    console.error(`Failed to create data group ${name}: ${error}`);
  }
}

// Now we can create data groups for Uniswap v2 data
const uniswapSwapsDataGroupAddress = await createDataGroup(
  "Uniswap V2 Swaps Data",
  "UNIV2SWAPS",
  "Swaps data from Uniswap V2 subgraph",
);
const uniswapLiquidityPositionsDataGroupAddress = await createDataGroup(
  "Uniswap V2 Liquidity Positions Data",
  "UNIV2LP",
  "Liquidity positions data from Uniswap V2 subgraph",
);

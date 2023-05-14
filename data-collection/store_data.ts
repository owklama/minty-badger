import { ethers } from "ethers";

// Assuming the Operator contract is already deployed and we have its address
const operatorContractAddress = "0xYourOperatorContractAddress";

// Initialize ethers.js and connect to the Operator contract
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Replace with your Ethereum node's RPC URL
const signer = provider.getSigner(); // Replace with the signer that has permission to store data in the data groups
const operatorContract = new ethers.Contract(
  operatorContractAddress,
  OperatorABI,
  signer,
);

// Define a function to store data in a data group
async function storeData(dataGroupAddress, data) {
  try {
    // Batch data to minimize gas costs
    // Note: This is a simple batching strategy. Depending on your data size and structure,
    // you may need to implement a more complex batching algorithm.
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const dataBatch = data.slice(i, i + batchSize);

      // Call the addData method on the operator contract
      const addDataTx = await operatorContract.addData(
        dataGroupAddress,
        dataBatch,
      );

      // Wait for the transaction to be mined
      const receipt = await addDataTx.wait();

      // Log the receipt for debugging purposes
      console.log(receipt);
    }
  } catch (error) {
    console.error(
      `Failed to store data in data group ${dataGroupAddress}: ${error}`,
    );
  }
}

// Now we can store the fetched data in the corresponding data groups
// Note: Replace 'uniswapSwapsData' and 'uniswapLiquidityPositionsData' with your actual data arrays
await storeData(uniswapSwapsDataGroupAddress, uniswapSwapsData);
await storeData(
  uniswapLiquidityPositionsDataGroupAddress,
  uniswapLiquidityPositionsData,
);

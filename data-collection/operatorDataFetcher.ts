import { ethers } from "ethers";

// Define the Ethereum provider
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Define the signer
const signer = provider.getSigner();

// Assuming the data groups are already created and we have their addresses
const uniswapSwapsDataGroupAddress = "0xYourUniswapSwapsDataGroupAddress";
const uniswapLiquidityPositionsDataGroupAddress =
  "0xYourUniswapLiquidityPositionsDataGroupAddress";

// Initialize Operator contracts for each data group
const uniswapSwapsOperator = new ethers.Contract(
  uniswapSwapsDataGroupAddress,
  OperatorABI,
  signer,
);
const uniswapLiquidityPositionsOperator = new ethers.Contract(
  uniswapLiquidityPositionsDataGroupAddress,
  OperatorABI,
  signer,
);

// Function to fetch data from a data group
async function fetchData(operator, startTime, endTime) {
  try {
    // Call the getData method on the Operator contract
    const data = await operator.getData(startTime, endTime);

    // Log the data for debugging purposes
    console.log(data);

    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
}

// Fetch the data
const swapsData = fetchData(
  uniswapSwapsOperator,
  0,
  Math.floor(Date.now() / 1000),
);
const liquidityPositionsData = fetchData(
  uniswapLiquidityPositionsOperator,
  0,
  Math.floor(Date.now() / 1000),
);

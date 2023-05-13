import { ethers } from "ethers";
import { UniswapV2DataProvider } from "./data-providers/UniswapV2DataProvider";
import BadgeContractABI from "./BadgeContractABI.json"; // Your Badge contract ABI
import calculateBadges from "./eligibility-verification/verify-eligibility";

// Connect to the Ethereum node
const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_URL,
);
const signer = provider.getSigner();

// Initialize the Uniswap data provider
const uniswapDataProvider = new UniswapV2DataProvider(
  process.env.UNISWAP_V2_SUBGRAPH_URL,
);

// Initialize the Badge contract
const badgeContract = new ethers.Contract(
  process.env.BADGE_CONTRACT_ADDRESS,
  BadgeContractABI,
  signer,
);

async function mintBadges(address: string) {
  try {
    // Fetch the user data from Uniswap
    const userData = await uniswapDataProvider.getUserData(address);

    // Calculate the badges based on the user data
    const badges = calculateBadges(userData);

    // For each badge, call the mintBadge method on the Badge contract
    for (const badge of badges) {
      const tx = await badgeContract.mintBadge(address, badge);
      const receipt = await tx.wait();

      // Log the transaction receipt
      console.log(
        `Badge ${badge} minted with transaction hash: ${receipt.transactionHash}`,
      );
    }
  } catch (error) {
    console.error(`Failed to mint badges for address ${address}: ${error}`);
  }
}

// Mint badges for a given Ethereum address
mintBadges("0xYourEthereumAddressHere")
  .then(() => console.log("Badge minting completed"))
  .catch((error) => console.error("Badge minting failed:", error));

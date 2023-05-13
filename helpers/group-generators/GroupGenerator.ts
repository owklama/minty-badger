import { ethers } from "ethers";

class GroupGenerator {
  uniswapDataProvider: any;
  dataGroupContract: ethers.Contract;

  constructor(
    uniswapDataProvider: any,
    dataGroupContractAddress: string,
    signer: ethers.Signer,
  ) {
    this.uniswapDataProvider = uniswapDataProvider;

    // Initialize the DataGroup contract
    const dataGroupABI = require("./BadgeContractABI.json"); // Assuming you have the ABI in JSON format
    this.dataGroupContract = new ethers.Contract(
      dataGroupContractAddress,
      dataGroupABI,
      signer,
    );
  }

  async generateGroups(address: string) {
    try {
      // Fetch the user data from Uniswap
      const userData = await this.uniswapDataProvider.getUserData(address);

      // Generate the groups based on the user data
      const groups = UniswapV2generator.generateGroups(userData); // We're assuming that UniswapV2generator is a module providing a generateGroups method

      // For each group, call the addGroup method on the DataGroup contract
      for (const group of groups) {
        const tx = await this.dataGroupContract.addGroup(
          group.id,
          group.symbol,
          group.members,
          group.metadata,
        );
        const receipt = await tx.wait();

        // Log the transaction receipt
        console.log(
          `Group ${group.symbol} added with transaction hash: ${receipt.transactionHash}`,
        );
      }
    } catch (error) {
      console.error(
        `Failed to generate groups for address ${address}: ${error}`,
      );
    }
  }
}

export default GroupGenerator;

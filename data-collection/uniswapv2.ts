import { GraphQLProvider } from "group-generators/helpers/data-providers";
import uniswapV2Schema from "./uniswapv2/interface-schema.json";

export class UniswapV2DataProvider {
  private graphQLProvider: GraphQLProvider;

  constructor(subgraphUrl: string) {
    this.graphQLProvider = new GraphQLProvider(subgraphUrl);
  }

  async getSwaps(account: string, skip: number = 0) {
    const query = `
      swaps(first: 1000, skip: ${skip}, where: { to: "${account}" }) {
        id
        timestamp
        amount0In
        amount1In
        amount0Out
        amount1Out
      }
    `;
    const data = await this.graphQLProvider.query(query);
    return data.swaps;
  }

  async getLiquidityPositions(account: string, skip: number = 0) {
    const query = `
      liquidityPositions(first: 1000, skip: ${skip}, where: { user: "${account}" }) {
        id
        liquidityTokenBalance
        timestamp
      }
    `;
    const data = await this.graphQLProvider.query(query);
    return data.liquidityPositions;
  }

  async getUserData(address: string) {
    let skip = 0;
    let swaps = [];
    let liquidityPositions = [];

    while (true) {
      const swapData = await this.getSwaps(address, skip);
      const liquidityPositionData = await this.getLiquidityPositions(
        address,
        skip,
      );

      swaps = swaps.concat(swapData);
      liquidityPositions = liquidityPositions.concat(liquidityPositionData);

      if (swapData.length < 1000 && liquidityPositionData.length < 1000) {
        break;
      }

      skip += 1000;
    }

    const userData = {
      firstTradeTimestamp: swaps.length > 0 ? swaps[0].timestamp : null,
      totalTrades: swaps.length,
      totalTradeVolume: swaps.reduce(
        (total, trade) =>
          total + parseFloat(trade.amount0In) + parseFloat(trade.amount1In),
        0,
      ),
      firstLiquidityPositionTimestamp:
        liquidityPositions.length > 0 ? liquidityPositions[0].timestamp : null,
      totalLiquidityPositions: liquidityPositions.length,
      totalLiquidityProvided: liquidityPositions.reduce(
        (total, position) => total + parseFloat(position.liquidityTokenBalance),
        0,
      ),
    };

    return userData;
  }
}

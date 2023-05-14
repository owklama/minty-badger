import GraphQLProvider from "../helpers/data-providers/GraphQLProvider";
import uniswapV2Schema from "./interface-schema.json";
export default class UniswapV2DataProvider {
  private gql: GraphQLProvider;

  // Constructor: Initializes the GraphQLProvider with the specified endpoint
  constructor(endpoint: string) {
    this.gql = new GraphQLProvider(endpoint);
  }

  // Method: Fetches swaps data for a specified Ethereum address
  // Uses GraphQL variables for query parameter substitution, which helps prevent GraphQL injection attacks
  async getSwaps(address: string, skip: number = 0) {
    const query = `
      query getSwaps($address: String!, $skip: Int!) {
        swaps(first: 1000, skip: $skip, where: { to: $address }) {
          id
          timestamp
          amount0In
          amount1In
          amount0Out
          amount1Out
        }
      }
    `;
    const variables = { address, skip };
    const data = await this.gql.query(query, variables);
    return data.swaps;
  }

  // Method: Fetches liquidity positions data for a specified Ethereum address
  // Uses GraphQL variables for query parameter substitution, which helps prevent GraphQL injection attacks
  async getLiquidityPositions(address: string, skip: number = 0) {
    const query = `
      query getLiquidityPositions($address: String!, $skip: Int!) {
        liquidityPositions(first: 1000, skip: $skip, where: { user: $address }) {
          id
          liquidityTokenBalance
          timestamp
        }
      }
    `;
    const variables = { address, skip };
    const data = await this.gql.query(query, variables);
    return data.liquidityPositions;
  }

  async getUserData(address: string) {
    let skip = 0;
    let swaps = [];
    let liquidityPositions = [];

    while (true) {
      const swapData = await this.getSwaps(address, skip);
      swaps = swaps.concat(swapData);
      if (swapData.length < 1000) {
        break;
      }
      skip += 1000;
    }

    skip = 0; // reset skip for fetching liquidity positions

    while (true) {
      const liquidityPositionData = await this.getLiquidityPositions(
        address,
        skip,
      );
      liquidityPositions = liquidityPositions.concat(liquidityPositionData);
      if (liquidityPositionData.length < 1000) {
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

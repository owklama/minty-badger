import GraphQLProvider from "./GraphQLProvider";

export default class UniswapV2DataProvider {
  private gql: GraphQLProvider;

  constructor(endpoint: string) {
    this.gql = new GraphQLProvider(endpoint);
  }

  async getUserData(address: string) {
    const query = `
      query GetUserData($address: String!) {
        user(id: $address) {
          id
          liquidityPositions {
            id
            liquidityTokenBalance
            pair {
              token0 {
                id
                symbol
                name
              }
              token1 {
                id
                symbol
                name
              }
            }
          }
          usdSwapped
        }
      }
    `;

    const variables = { address: address.toLowerCase() };
    const data = await this.gql.query(query, variables);

    return data.user;
  }
}

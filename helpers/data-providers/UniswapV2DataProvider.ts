import fetch from "node-fetch";

export default class GraphQLProvider {
  constructor(private endpoint: string) {}

  async query(query: string, variables: Record<string, any> = {}) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error("Failed to execute GraphQL query");
    }

    const body = await response.json();

    if (body.errors) {
      throw new Error("Errors were returned from the GraphQL endpoint");
    }

    return body.data;
  }
}

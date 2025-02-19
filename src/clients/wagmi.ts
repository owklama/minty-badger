import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createClient } from "wagmi";
import { optimism, optimismGoerli, hardhat } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getChainRPC } from "../config";

export const { chains, provider, webSocketProvider } = configureChains(
  [optimism, optimismGoerli, hardhat],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: getChainRPC(chain.id)!.jsonRpcUri,
        webSocket: getChainRPC(chain.id)!.wsRpcUri,
      }),
    }),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import * as React from "react";
import Layout from ".";
import Navbar from "../Components/Navbar";
import {
  appId,
  LensConfig,
  development,
  production,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensProvider } from "@lens-protocol/react-web";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false, // see https://github.com/wagmi-dev/wagmi/issues/2511
      },
    }),
  ],
});

const lensConfig: LensConfig = {
  appId: appId("wizz_dao"),
  bindings: wagmiBindings(),
  environment: production,
};

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY || "",
  }),
});

const theme: ThemeConfig = {};

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>
        <LivepeerConfig client={livepeerClient} theme={theme}>
          <ThirdwebProvider
            activeChain={ChainId.Polygon}
            clientId={process.env.CLIENT_ID}
          >
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <Component {...pageProps} />
            </QueryClientProvider>
          </ThirdwebProvider>
        </LivepeerConfig>
      </LensProvider>
    </WagmiConfig>
  );
}

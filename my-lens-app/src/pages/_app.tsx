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

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY || "",
  }),
});

const theme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <LivepeerConfig client={livepeerClient} theme={theme}>
      <ThirdwebProvider
        activeChain={ChainId.Polygon}
        clientId={process.env.CLIENT_ID}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThirdwebProvider>
    </LivepeerConfig>
  );
}

import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  tokenPocketWallet,
  // walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { hemi } from "wagmi/chains";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Wallets",
      wallets: [
        coinbaseWallet,
        metaMaskWallet,
        okxWallet,
        rabbyWallet,
        tokenPocketWallet,
      ],
    },
  ],
  {
    appName: "TGE Mint",
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  },
);

const walletsConfig = createConfig({
  chains: [hemi],
  connectors,
  transports: {
    [hemi.id]: http(),
  },
});

export const WalletContext = ({ children }: Props) => (
  <WagmiProvider config={walletsConfig}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={lightTheme()}>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

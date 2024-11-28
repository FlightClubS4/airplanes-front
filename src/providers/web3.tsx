'use client';

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia, mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [sepolia, mainnet, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Next.js 应用',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        locale="zh-CN"
        initialChain={sepolia}
        showRecentTransactions={true}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
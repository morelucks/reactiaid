import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { base, baseSepolia, sepolia, optimismSepolia } from 'wagmi/chains';
import '../styles/globals.css';

// Get WalletConnect project ID (only use if valid)
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const hasValidProjectId = walletConnectProjectId && walletConnectProjectId !== 'demo' && walletConnectProjectId.length > 0;

// Create wagmi config with connectors
// Note: We only use injected() here. AppKit handles WalletConnect connections separately
// to avoid double initialization of WalletConnect Core
const connectors: any[] = [injected()];

const wagmiConfig = createConfig({
  chains: [base, baseSepolia, sepolia, optimismSepolia],
  connectors,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

// Prevent double initialization of AppKit
let appKitInitialized = false;

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize AppKit on client side only (for Base builder rewards)
    // Only initialize if we have a valid project ID and haven't initialized yet
    if (typeof window !== 'undefined' && hasValidProjectId && !appKitInitialized) {
      appKitInitialized = true;
      import('@reown/appkit/react').then(({ createAppKit }) => {
        try {
          createAppKit({
            networks: [base, baseSepolia, sepolia, optimismSepolia],
            projectId: walletConnectProjectId!,
            metadata: {
              name: 'ReactiAid',
              description: 'Decentralized Emergency Response System',
              url: window.location.origin,
              icons: [],
            },
            features: {
              analytics: true,
              email: false,
              socials: false,
            },
          });
        } catch (error) {
          console.error('Failed to initialize AppKit:', error);
          appKitInitialized = false; // Reset on error to allow retry
        }
      }).catch((error) => {
        console.error('Failed to load AppKit:', error);
        appKitInitialized = false; // Reset on error to allow retry
      });
    }
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
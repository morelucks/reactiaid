import { useReadContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import {
  AID_VAULT_ABI,
  AID_VAULT_ADDRESS_BASE_SEPOLIA,
} from '../utils/abi/aidVault';

export function useAidVault(location: string | undefined) {
  const locationFundsQuery = useReadContract({
    address: AID_VAULT_ADDRESS_BASE_SEPOLIA,
    abi: AID_VAULT_ABI,
    functionName: 'locationFunds',
    args: location ? [location] : undefined,
    chainId: baseSepolia.id,
    query: {
      enabled: !!location,
    },
  });

  const totalDistributedQuery = useReadContract({
    address: AID_VAULT_ADDRESS_BASE_SEPOLIA,
    abi: AID_VAULT_ABI,
    functionName: 'totalDistributed',
    args: [],
    chainId: baseSepolia.id,
  });

  return {
    locationFunds: locationFundsQuery.data as bigint | undefined,
    isLocationFundsLoading: locationFundsQuery.isLoading,
    refetchLocationFunds: locationFundsQuery.refetch,
    totalDistributed: totalDistributedQuery.data as bigint | undefined,
    isTotalDistributedLoading: totalDistributedQuery.isLoading,
    refetchTotalDistributed: totalDistributedQuery.refetch,
  };
}



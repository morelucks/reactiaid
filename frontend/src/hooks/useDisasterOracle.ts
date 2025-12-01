import { useMemo } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import {
  DISASTER_ORACLE_ABI,
  DISASTER_ORACLE_ADDRESS_BASE_SEPOLIA,
} from '../utils/abi/disasterOracle';

type TriggerDisasterArgs = {
  type: number;
  severity: bigint;
  location: string;
};

export function useTriggerDisaster() {
  const { address } = useAccount();

  const {
    writeContractAsync,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const isConnected = !!address;

  const trigger = async ({ type, severity, location }: TriggerDisasterArgs) => {
    if (!isConnected) {
      throw new Error('Wallet not connected');
    }

    return writeContractAsync({
      address: DISASTER_ORACLE_ADDRESS_BASE_SEPOLIA,
      abi: DISASTER_ORACLE_ABI,
      functionName: 'triggerDisaster',
      args: [type, severity, location],
      chainId: baseSepolia.id,
    });
  };

  const error = useMemo(() => writeError || txError, [writeError, txError]);

  return {
    trigger,
    isConnected,
    isPending,
    isConfirming,
    isSuccess,
    hash,
    error,
  };
}



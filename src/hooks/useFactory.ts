import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import rawFactoryABI from "../abi/Factory.json";
import { useState } from "react";

const factoryAddress = '0x2DA0C0a51f42a26D292460F420F39761FBdeD643';

const factoryABI = rawFactoryABI.abi; 

/**
 * Hook to Deploy ERC20 Token
 */
export function useDeployToken() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const { data: hash, writeContract } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const deployToken = async () => {
    writeContract({
      address: factoryAddress,
      abi: factoryABI,
      functionName: "deployToken",
      args: [name, symbol, supply ? parseInt(supply) : 0],
    });
  };

  return {
    name,
    setName,
    symbol,
    setSymbol,
    supply,
    setSupply,
    deployToken,
    isLoading,
    isSuccess,
  };
}

/**
 * Hook to Fetch Deployed Tokens
 */
export function useDeployedTokens() {
  const {
    data: tokens,
    isLoading,
    error,
  } = useReadContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "tokens",
  });

  return { tokens: tokens || [], isLoading, error };
}

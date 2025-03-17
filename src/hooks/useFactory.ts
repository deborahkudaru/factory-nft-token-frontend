import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState } from "react";
import rawFactoryABI from "../abi/Factory.json";

const factoryAddress = "0xF0b305D38935E6A3221B2b051b82eA831357dF42";
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
    try {
      await writeContract({
        address: factoryAddress,
        abi: factoryABI,
        functionName: "deployToken",
        args: [name, symbol, BigInt(supply || "0")], 
      });
    } catch (error) {
      console.error("Error deploying token:", error);
    }
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
  const { data, isLoading, error } = useReadContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "getTokens",
  });

  return { tokens: Array.isArray(data) ? data : [], isLoading, error };
}

/**
 * Hook to Deploy an NFT
 */
export function useDeployNFT() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const deployNFT = async () => {
    try {
      await writeContract({
        address: factoryAddress,
        abi: factoryABI,
        functionName: "deployNFT",
        args: [name, symbol],
      });
    } catch (error) {
      console.error("Error deploying NFT:", error);
    }
  };

  return {
    name,
    setName,
    symbol,
    setSymbol,
    deployNFT,
    isLoading,
    isSuccess,
  };
}

/**
 * Hook to Fetch Deployed NFTs
 */
export function useDeployedNFTs() {
  const { data, isLoading, error } = useReadContract({
    address: factoryAddress,
    abi: factoryABI,
    functionName: "getNFTs",
  });

  return { nfts: Array.isArray(data) ? data : [], isLoading, error };
}

import {
   useWriteContract,
   useReadContract,
   useWaitForTransactionReceipt,
 } from "wagmi";
 import { useState } from "react";
 import rawFactoryABI from "../abi/Factory.json";
 import rawTokenABI from "../abi/Token.json";
 import rawNFTABI from "../abi/MyNFT.json";
 
 const factoryAddress = "0x2DA0C0a51f42a26D292460F420F39761FBdeD643";
 
 const factoryABI = rawFactoryABI.abi;
 const tokenABI = rawTokenABI.abi;
 const nftABI = rawNFTABI.abi;
 
 /**
  * Hook to Deploy ERC20 Token
  */
 export function useDeployToken() {
   const [name, setName] = useState<string>("");
   const [symbol, setSymbol] = useState<string>("");
   const [supply, setSupply] = useState<string>("");
 
   const { data: hash, writeContract } = useWriteContract();
   const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
 
   const deployToken = async () => {
     try {
       writeContract({
         address: factoryAddress,
         abi: factoryABI,
         functionName: "deployToken",
         args: [name, symbol, supply ? parseInt(supply) : 0],
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
   const { data: tokens, isLoading, error } = useReadContract({
     address: factoryAddress,
     abi: factoryABI,
     functionName: "tokens",
   });
 
   return { tokens: tokens || [], isLoading, error };
 }
 
 /**
  * Hook to Deploy an NFT
  */
 export function useDeployNFT() {
   const [name, setName] = useState<string>("");
   const [symbol, setSymbol] = useState<string>("");
 
   const { data: hash, writeContract } = useWriteContract();
   const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
 
   const deployNFT = async () => {
     try {
       writeContract({
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
   const { data: nfts, isLoading, error } = useReadContract({
     address: factoryAddress,
     abi: factoryABI,
     functionName: "nfts",
   });
 
   return { nfts: nfts || [], isLoading, error };
 }
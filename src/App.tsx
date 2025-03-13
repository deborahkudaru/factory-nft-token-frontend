// App.tsx - Main application component

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FactoryABI from './abis/Factory.json';
import Navbar from './components/Navbar';
import ConnectWallet from './components/ConnectWallet';
import TokenCreator from './components/TokenCreator';
import NFTCreator from './components/NFTCreator';
import TokenList from './components/TokenList';
import NFTList from './components/NFTList';
import Footer from './components/Footer';

const FACTORY_ADDRESS = '0x2DA0C0a51f42a26D292460F420F39761FBdeD643';

const App: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [factoryContract, setFactoryContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tokens, setTokens] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'token' | 'nft'>('token');

  // Connect to the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Initialize the factory contract
        const factory = new ethers.Contract(FACTORY_ADDRESS, FactoryABI, signer);
        
        setProvider(provider);
        setSigner(signer);
        setFactoryContract(factory);
        setAccount(address);
        setIsConnected(true);
        
        // Load existing tokens and NFTs
        loadTokens(factory);
        loadNFTs(factory);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install a wallet like MetaMask to use this application");
    }
  };

  // Load existing tokens
  const loadTokens = async (factory: ethers.Contract) => {
    try {
      const tokenCount = await factory.tokenCount();
      const tokensArray = [];
      
      for (let i = 0; i < tokenCount; i++) {
        const tokenAddress = await factory.tokens(i);
        tokensArray.push(tokenAddress);
      }
      
      setTokens(tokensArray);
    } catch (error) {
      console.error("Error loading tokens:", error);
    }
  };

  // Load existing NFTs
  const loadNFTs = async (factory: ethers.Contract) => {
    try {
      const nftCount = await factory.nftCount();
      const nftsArray = [];
      
      for (let i = 0; i < nftCount; i++) {
        const nftAddress = await factory.nfts(i);
        nftsArray.push(nftAddress);
      }
      
      setNfts(nftsArray);
    } catch (error) {
      console.error("Error loading NFTs:", error);
    }
  };

  // Deploy a new token
  const deployToken = async (name: string, symbol: string, supply: string) => {
    if (!factoryContract || !signer) return;
    
    try {
      const supplyInWei = ethers.utils.parseEther(supply);
      const tx = await factoryContract.deployToken(name, symbol, supplyInWei);
      await tx.wait();
      
      // Reload tokens
      loadTokens(factoryContract);
      
      return true;
    } catch (error) {
      console.error("Error deploying token:", error);
      return false;
    }
  };

  // Deploy a new NFT
  const deployNFT = async (name: string, symbol: string) => {
    if (!factoryContract || !signer) return;
    
    try {
      const tx = await factoryContract.deployNFT(name, symbol);
      await tx.wait();
      
      // Reload NFTs
      loadNFTs(factoryContract);
      
      return true;
    } catch (error) {
      console.error("Error deploying NFT:", error);
      return false;
    }
  };

  // Check if wallet is already connected on app load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            connectWallet();
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar account={account} isConnected={isConnected} />
      
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h1 className="text-4xl font-bold mb-8 text-center">Create Your Own Tokens & NFTs</h1>
            <p className="text-xl mb-8 text-center max-w-2xl">
              Connect your wallet to start creating custom ERC20 tokens and ERC721 NFTs in seconds.
            </p>
            <ConnectWallet onConnect={connectWallet} />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Token & NFT Factory</h1>
            
            <div className="mb-8">
              <div className="flex border-b border-gray-700">
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === 'token' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab('token')}
                >
                  Create Token
                </button>
                <button
                  className={`py-2 px-4 font-medium ${
                    activeTab === 'nft' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab('nft')}
                >
                  Create NFT
                </button>
              </div>
              
              <div className="mt-6">
                {activeTab === 'token' ? (
                  <TokenCreator deployToken={deployToken} />
                ) : (
                  <NFTCreator deployNFT={deployNFT} />
                )}
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Your Deployments</h2>
              {activeTab === 'token' ? (
                <TokenList tokens={tokens} />
              ) : (
                <NFTList nfts={nfts} />
              )}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
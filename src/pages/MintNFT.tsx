// pages/MintNFT.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import NFTABI from '../abis/NFT.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MintNFT: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [nftContract, setNftContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  const [nftName, setNftName] = useState<string>('');
  const [nftSymbol, setNftSymbol] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [mintedTokenId, setMintedTokenId] = useState<string>('');

  // Connect to the wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setIsConnected(true);
        
        // Initialize the NFT contract
        if (address) {
          initializeNFTContract(signer);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install a wallet like MetaMask to use this application");
    }
  };

  // Initialize the NFT contract
  const initializeNFTContract = async (signer: ethers.Signer) => {
    if (!address) return;
    
    try {
      const nft = new ethers.Contract(address, NFTABI, signer);
      setNftContract(nft);
      
      // Get NFT name and symbol
      const name = await nft.name();
      const symbol = await nft.symbol();
      
      setNftName(name);
      setNftSymbol(symbol);
    } catch (error) {
      console.error("Error initializing NFT contract:", error);
      setError("Could not load NFT contract. Please check the address.");
    }
  };

  // Mint an NFT
  const mintNFT = async () => {
    if (!nftContract || !signer || !tokenURI) {
      setError("Please connect your wallet and provide a token URI");
      return;
    }
    
    setError('');
    setIsMinting(true);
    
    try {
      const tx = await nftContract.mint(account, tokenURI);
      const receipt = await tx.wait();
      
      // Find the token ID from the event
      const transferEvent = receipt.events?.find(
        (event: any) => event.event === 'Transfer'
      );
      
      if (transferEvent && transferEvent.args) {
        const tokenId = transferEvent.args.tokenId.toString();
        setMintedTokenId(tokenId);
      }
      
      setSuccess(true);
      setTokenURI('');
    } catch (error) {
      console.error("Error minting NFT:", error);
      setError("Error minting NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  // Check if wallet is already connected on page load
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
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Mint NFT</h1>
            
            {!isConnected ? (
              <div className="text-center py-8">
                <p className="mb-4">Connect your wallet to mint an NFT</p>
                <button
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <>
                {nftName ? (
                  <div className="mb-6">
                    <p className="text-gray-300">Collection: <span className="font-semibold">{nftName}</span> ({nftSymbol})</p>
                    <p className="text-gray-300">Contract: <span className="font-semibold truncate">{address}</span></p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-yellow-400">Loading contract information...</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <label htmlFor="tokenURI" className="block text-gray-300 mb-2">
                    Token URI (metadata URL)
                  </label>
                  <input
                    type="text"
                    id="tokenURI"
                    value={tokenURI}
                    onChange={(e) => setTokenURI(e.target.value)}
                    placeholder="https://example.com/metadata/1.json"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isMinting}
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    The token URI should point to a JSON file that follows the ERC-721 metadata standard
                  </p>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-900/50 border border-red-800 rounded text-red-200">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="mb-6 p-4 bg-green-900/50 border border-green-800 rounded text-green-200">
                    <p className="font-semibold">NFT minted successfully!</p>
                    {mintedTokenId && (
                      <p className="mt-2">
                        Token ID: <span className="font-mono">{mintedTokenId}</span>
                      </p>
                    )}
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-3 text-sm text-green-400 hover:text-green-300"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button
                    onClick={mintNFT}
                    disabled={isMinting || !tokenURI}
                    className={`
                      flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-lg font-semibold
                      ${isMinting || !tokenURI
                        ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg'
                      }
                      transition duration-300
                    `}
                  >
                    {isMinting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Minting...
                      </>
                    ) : (
                      'Mint NFT'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">What is Token URI?</h2>
            <p className="text-gray-300 mb-3">
              The Token URI is a URL that points to a JSON file containing metadata for your NFT, following the ERC-721 metadata standard.
            </p>
            <p className="text-gray-300 mb-3">
              This JSON file should include properties like:
            </p>
            <div className="bg-gray-900 p-4 rounded-md mb-3 font-mono text-sm overflow-x-auto">
              {`{
  "name": "Your NFT Name",
  "description": "Description of your NFT",
  "image": "https://example.com/images/1.png",
  "attributes": [
    { "trait_type": "Color", "value": "Blue" },
    { "trait_type": "Rarity", "value": "Uncommon" }
  ]
}`}
            </div>
            <p className="text-gray-300">
              You can host this metadata file on IPFS or any web server. Make sure the URL is accessible.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MintNFT;
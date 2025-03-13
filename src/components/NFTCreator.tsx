// components/NFTCreator.tsx
import React, { useState } from 'react';

interface NFTCreatorProps {
  deployNFT: (name: string, symbol: string) => Promise<boolean | undefined>;
}

const NFTCreator: React.FC<NFTCreatorProps> = ({ deployNFT }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !symbol) {
      setError('Both name and symbol are required');
      return;
    }
    
    setError('');
    setIsDeploying(true);
    
    try {
      const result = await deployNFT(name, symbol);
      if (result) {
        setSuccess(true);
        setName('');
        setSymbol('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setError('Error deploying NFT collection. Please try again.');
      console.error(err);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Your NFT Collection</h2>
      
      {error && (
        <div className="mb-4 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded">
          NFT collection deployed successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Collection Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. My Awesome NFTs"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Collection Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full bg-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. MNFT"
            maxLength={8}
          />
        </div>
        
        <button
          type="submit"
          disabled={isDeploying}
          className={`w-full py-3 px-4 rounded font-bold ${
            isDeploying
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 transition duration-300'
          }`}
        >
          {isDeploying ? 'Deploying...' : 'Deploy NFT Collection'}
        </button>
      </form>
    </div>
  );
};

export default NFTCreator;

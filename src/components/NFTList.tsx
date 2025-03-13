import React from 'react';

interface NFTListProps {
  nfts: string[];
}

const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  if (nfts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        No NFT collections deployed yet. Create your first collection above!
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg overflow-x-auto">
      <h3 className="text-lg font-medium mb-4">Your NFT Collections</h3>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Contract Address
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {nfts.map((nft, index) => (
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-gray-300">
                {nft}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a 
                  href={`https://etherscan.io/token/${nft}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 mr-4"
                >
                  View on Etherscan
                </a>
                <a 
                  href={`/mint/${nft}`} 
                  className="text-green-400 hover:text-green-300"
                >
                  Mint NFT
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NFTList;
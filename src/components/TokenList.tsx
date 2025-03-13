import React from 'react';

interface TokenListProps {
  tokens: string[];
}

const TokenList: React.FC<TokenListProps> = ({ tokens }) => {
  if (tokens.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
        No tokens deployed yet. Create your first token above!
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg overflow-x-auto">
      <h3 className="text-lg font-medium mb-4">Your Tokens</h3>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Token Address
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tokens.map((token, index) => (
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap font-mono text-sm text-gray-300">
                {token}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a 
                  href={`https://etherscan.io/token/${token}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View on Etherscan
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenList;
import { useState } from 'react';

const TokenCreator = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [isLoading, setIsLoading] = useState(false);

interface TokenDetails {
   name: string;
   symbol: string;
   supply: string;
}

const handleCreateToken = (e: React.FormEvent<HTMLFormElement>): void => {
   e.preventDefault();
   setIsLoading(true);
   
   // Simulating API call
   setTimeout(() => {
      const tokenDetails: TokenDetails = {
         name: tokenName,
         symbol: tokenSymbol,
         supply: tokenSupply
      };
      console.log('Token created:', tokenDetails);
      setIsLoading(false);
      
      // Reset form
      setTokenName('');
      setTokenSymbol('');
      setTokenSupply('');
      
      alert('Token created successfully!');
   }, 1500);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">Create Your Token</h2>
          <p className="text-blue-100 text-center mt-2">Launch your own ERC-20 token in seconds</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleCreateToken}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Token Name
              </label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="e.g. My Awesome Token"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">The full name of your token</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Token Symbol
              </label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="e.g. MAT"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">Short identifier (2-6 characters recommended)</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Initial Supply
              </label>
              <input
                type="number"
                value={tokenSupply}
                onChange={(e) => setTokenSupply(e.target.value)}
                placeholder="e.g. 1000000"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Total tokens to create initially</p>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Token...
                  </span>
                ) : (
                  'Create Token'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            By creating a token, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;
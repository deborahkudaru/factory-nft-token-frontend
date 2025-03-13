import React from 'react';

interface NavbarProps {
  account: string;
  isConnected: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ account, isConnected }) => {
  return (
    <nav className="bg-gray-800 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-400">TokenFactory</div>
        </div>
        
        <div>
          {isConnected ? (
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full h-2 w-2 mr-2"></div>
              <span className="text-sm text-gray-300 hidden md:inline mr-2">Connected:</span>
              <span className="text-sm bg-gray-700 rounded-full py-1 px-4 text-gray-300">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-400">Not Connected</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


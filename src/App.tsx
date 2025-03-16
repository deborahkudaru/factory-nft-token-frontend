import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "./components/Navbar";
import {
  useDeployToken,
  useDeployedTokens,
  useDeployNFT,
  useDeployedNFTs,
} from "./hooks/useFactory";
import { Toaster, toast } from "react-hot-toast";

const App: React.FC = () => {
  // Token form state
  const {
    name,
    setName,
    symbol,
    setSymbol,
    supply,
    setSupply,
    deployToken,
    isLoading: isTokenLoading,
    isSuccess: isTokenSuccess,
  } = useDeployToken();

  const {
    tokens,
    isLoading: isTokensLoading,
    error: tokensError,
  } = useDeployedTokens();

  const {
    name: nftName,
    setName: setNFTName,
    symbol: nftSymbol,
    setSymbol: setNFTSymbol,
    deployNFT,
    isLoading: isNFTLoading,
    isSuccess: isNFTSuccess,
  } = useDeployNFT();

  const {
    nfts,
    isLoading: isNFTsLoading,
    error: nftsError,
  } = useDeployedNFTs();

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deployToken();
  };

  const handleNFTSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deployNFT();
  };

  if (isNFTSuccess) {
    toast.success("NFT Deployed Successfully!");
  }

  if (isTokenSuccess) {
    toast.success("Token Deployed Successfully!");
  }

  if (tokensError) {
    toast.error(`Error: ${tokensError.message || "Something went wrong"}`);
  }
  if (nftsError) {
    toast.error(`Error: ${nftsError.message || "Something went wrong"}`);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Navbar />
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto mt-5">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Token Factory</h1>
          <p className="text-gray-600">
            Deploy ERC20 Tokens and NFTs with ease
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deploy New Tokens/NFTs Section */}
          <div>
            <Tabs defaultValue="token" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="token">ERC20 Token</TabsTrigger>
                <TabsTrigger value="nft">NFT</TabsTrigger>
              </TabsList>

              <TabsContent value="token">
                <Card>
                  <CardHeader>
                    <CardTitle>Deploy New ERC20 Token</CardTitle>
                    <CardDescription>
                      Create your own ERC20 token with custom name, symbol, and
                      supply
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleTokenSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tokenName">Token Name</Label>
                        <Input
                          id="tokenName"
                          placeholder="e.g. My Token"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tokenSymbol">Token Symbol</Label>
                        <Input
                          id="tokenSymbol"
                          placeholder="e.g. MTK"
                          required
                          maxLength={8}
                          value={symbol}
                          onChange={(e) => setSymbol(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tokenSupply">Initial Supply</Label>
                        <Input
                          id="tokenSupply"
                          type="number"
                          placeholder="e.g. 1000000"
                          required
                          min="1"
                          value={supply}
                          onChange={(e) => setSupply(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isTokenLoading}
                      >
                        {isTokenLoading ? "Deploying..." : "Deploy Token"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="nft">
                <Card>
                  <CardHeader>
                    <CardTitle>Deploy New NFT Collection</CardTitle>
                    <CardDescription>
                      Create your own NFT collection with custom name and symbol
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleNFTSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nftName">Collection Name</Label>
                        <Input
                          id="nftName"
                          placeholder="e.g. My NFT Collection"
                          required
                          value={nftName}
                          onChange={(e) => setNFTName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nftSymbol">Collection Symbol</Label>
                        <Input
                          id="nftSymbol"
                          placeholder="e.g. MNFT"
                          required
                          maxLength={8}
                          value={nftSymbol}
                          onChange={(e) => setNFTSymbol(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isNFTLoading}
                      >
                        {isNFTLoading
                          ? "Deploying..."
                          : "Deploy NFT Collection"}
                      </Button>
                      {isNFTSuccess && (
                        <p className="text-green-400 mt-2">
                          Token Deployed Successfully!
                        </p>
                      )}
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Deployed Assets Section */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Deployed Tokens</CardTitle>
                <CardDescription>Total: {tokens.length} Tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {isTokensLoading ? (
                    <p className="text-gray-500 text-center py-4">
                      Loading tokens...
                    </p>
                  ) : tokensError ? (
                    <p className="text-red-500 text-center py-4">
                      Error fetching tokens
                    </p>
                  ) : tokens.length > 0 ? (
                    tokens.map((token, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-gray-200 bg-white"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {token.name} ({token.symbol})
                            </h3>
                            <h2>{token.supply}</h2>
                            <p className="text-sm text-gray-500 mt-1">
                              {token.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No tokens deployed yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Deployed NFTs</CardTitle>
                <CardDescription>
                  Total: {nfts?.length || 0} Collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                {nftsError && (
                  <p className="text-red-500 text-center py-2">
                    ❌ Error: {nftsError.message || "Something went wrong"}
                  </p>
                )}

                <div className="space-y-2">
                  {isNFTLoading ? (
                    <p className="text-gray-500 text-center py-4">
                      Loading NFTs...
                    </p>
                  ) : nfts.length > 0 ? (
                    nfts.map((nft, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-gray-200 bg-white"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {nft.name} ({nft.symbol})
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {nft.address}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No NFT collections deployed yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

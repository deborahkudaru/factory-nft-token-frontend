import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 rounded-full text-black shadow-2xl">
      <h1 className="text-xl font-bold">Token-NFT Creator</h1>
      <ConnectButton />
    </nav>
  );
}

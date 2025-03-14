import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center pb-4  text-black shadow-2xl">
      <h1 className="text-xl font-bold">Token-NFT Creator</h1>
      <ConnectButton />
    </nav>
  );
}

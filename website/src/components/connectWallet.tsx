import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectWallet = ({ className }: { className?: string }) => (
  <div className={className}>
    <ConnectButton showBalance={false} />
  </div>
);

import { ConnectWallet } from "./connectWallet";
import { HemiLogo, HemiLogoFull } from "./hemiLogo";

const MainnetBadge = () => (
  <div
    className="text-xxs ml-1 flex items-center justify-center rounded-md px-1.5 py-1 text-center text-orange-950"
    style={{
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 35.57%, rgba(255, 255, 255, 0.00) 70.92%), var(--Color-Orange-500, #FF6C15)",
      boxShadow:
        "0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset, 0px 1px 2px 0px rgba(10, 10, 10, 0.04)",
    }}
  >
    Mainnet
  </div>
);

export const Header = () => (
  <header
    className="flex items-center gap-x-1 border-b border-solid
  border-neutral-300/55 bg-white px-4 py-3 md:mx-8 md:bg-transparent xl:mx-auto"
  >
    <HemiLogo className="md:hidden" />
    <HemiLogoFull className="hidden md:block" />
    <MainnetBadge />
    <div className="ml-auto">
      <ConnectWallet />
    </div>
  </header>
);

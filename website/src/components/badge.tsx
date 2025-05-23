import { HemiLogo } from "./hemiLogo";

export const Badge = () => (
  <div
    className="text-xxs flex h-6 w-fit items-center gap-x-1 rounded
    px-1.5 text-center font-semibold uppercase text-white"
    style={{
      background: "linear-gradient(180deg, #2D2E31 0%, #0A0A0A 96%), #0A0A0A",
    }}
  >
    <span>HEMI</span>
    <HemiLogo className="size-3" />
    <span>NFT'S</span>
  </div>
);

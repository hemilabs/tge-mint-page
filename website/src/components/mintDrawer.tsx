import { Hash } from "viem";

import { Drawer, DrawerSectionBackground, DrawerTopSection } from "./drawer";
import { HemiLogo } from "./hemiLogo";
import { Step } from "./step/step";
import { ProgressStatus } from "./step/progressStatus";

const Description = () => (
  <div className="flex items-center gap-x-2">
    <HemiLogo className="size-3.5" />
    <span className="text-sm font-normal text-orange-500">Mint NFT</span>
  </div>
);

type Props = {
  onClose: () => void;
  progressStatus: ProgressStatus;
  transactionHash: Hash | undefined;
};

export const MintDrawer = ({
  onClose,
  progressStatus,
  transactionHash,
}: Props) => (
  <Drawer onClose={onClose}>
    <div
      className="flex h-[80dvh] w-full flex-col
        overflow-y-hidden bg-white pt-6 md:h-full md:w-[450px]"
    >
      <DrawerTopSection heading="Review mint" onClose={onClose} />
      <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-y-auto">
        <DrawerSectionBackground>
          <div className="mt-4 flex flex-col">
            <Step
              description={<Description />}
              position={1}
              status={progressStatus}
              txHash={transactionHash}
            />
          </div>
        </DrawerSectionBackground>
      </div>
    </div>
  </Drawer>
);

import { useUserHasNft, useMintNFT } from "hooks/nft";
import { useEffect, useState } from "react";
import { Hash } from "viem";
import { useAccount } from "wagmi";

import { Button } from "./button";
import { MintDrawer } from "./mintDrawer";
import { ProgressStatus } from "./step/progressStatus";

export const Mint = function () {
  const { isConnected, isDisconnected } = useAccount();
  const { data: hasNft, isLoading } = useUserHasNft();
  const [showDrawer, setShowDrawer] = useState(false);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>(
    ProgressStatus.NOT_READY,
  );
  const [transactionHash, setTransactionHash] = useState<Hash | undefined>(
    undefined,
  );

  const { mutate: mint } = useMintNFT({
    on(emitter) {
      emitter.on("user-signed-mint", (hash) => setTransactionHash(hash));
      emitter.on("minting-failed-validation", () =>
        setProgressStatus(ProgressStatus.FAILED),
      );
      emitter.on("unexpected-error", () =>
        setProgressStatus(ProgressStatus.FAILED),
      );
      emitter.on("user-signing-error", () =>
        setProgressStatus(ProgressStatus.REJECTED),
      );
      emitter.on("minting-transaction-succeeded", () =>
        setProgressStatus(ProgressStatus.COMPLETED),
      );
      emitter.on("minting-transaction-reverted", () =>
        setProgressStatus(ProgressStatus.FAILED),
      );
    },
  });

  useEffect(
    function () {
      if (hasNft === undefined) {
        return;
      }
      if (hasNft) {
        setProgressStatus(ProgressStatus.COMPLETED);
        return;
      }
      setProgressStatus(ProgressStatus.READY);
    },
    [hasNft, setProgressStatus],
  );

  const getText = function () {
    if (
      isConnected &&
      (isLoading || progressStatus === ProgressStatus.NOT_READY)
    ) {
      return "...";
    }
    return "Mint NFT";
  };

  const handleMint = function () {
    if (hasNft) {
      return;
    }
    setProgressStatus(ProgressStatus.PROGRESS);
    setShowDrawer(true);
    mint();
  };

  const handleClose = function () {
    setShowDrawer(false);
    if (hasNft) {
      setProgressStatus(ProgressStatus.COMPLETED);
    } else {
      setProgressStatus(ProgressStatus.READY);
    }
    setTransactionHash(undefined);
  };

  return (
    <>
      <Button
        disabled={
          isLoading ||
          hasNft ||
          isDisconnected ||
          progressStatus !== ProgressStatus.READY
        }
        // using 81px because in 80px, the text does not enter in one line
        className="w-full max-md:h-10 md:ml-2 md:w-[81px]"
        onClick={handleMint}
      >
        {getText()}
      </Button>
      {showDrawer && (
        <MintDrawer
          onClose={handleClose}
          progressStatus={progressStatus}
          transactionHash={transactionHash!}
        />
      )}
    </>
  );
};

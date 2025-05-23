import { formatUnits } from "viem";
import { hemi } from "viem/chains";

import { FeesIcon } from "../icons/feesIcon";

type Props = {
  amount: bigint;
  isError?: boolean;
  isLoading?: boolean;
};

export const Fees = function ({
  amount,
  isError = false,
  isLoading = false,
}: Props) {
  const getContent = function () {
    if (isError) {
      return <span>-</span>;
    }
    if (isLoading) {
      return <span>...</span>;
    }
    return <span>{formatUnits(amount, hemi.nativeCurrency.decimals)}</span>;
  };
  return (
    <>
      <FeesIcon />
      <div className="ml-1 text-neutral-500">{getContent()}</div>
    </>
  );
};

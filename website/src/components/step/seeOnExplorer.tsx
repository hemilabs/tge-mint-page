import { hemi } from "viem/chains";

import { ArrowDownLeftIcon } from "../icons/arrowDownLeftIcon";

type Props = {
  txHash: string;
};
export const SeeOnExplorer = function ({ txHash }: Props) {
  if (!txHash) {
    return null;
  }

  return (
    <a
      className="group/see-on-explorer flex items-center gap-x-1 text-sm font-medium text-orange-500"
      href={`${hemi.blockExplorers.default.url}/tx/${txHash}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="group-hover/see-on-explorer:text-orange-700">
        See in explorer
      </span>
      <ArrowDownLeftIcon className="[&>path]:fill-orange-500 [&>path]:group-hover/see-on-explorer:fill-orange-700" />
    </a>
  );
};

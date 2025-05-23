import { ReactNode } from "react";
import { Hash } from "viem";

import { Box } from "./box";
import { Fees } from "./fees";
import { PositionStatus } from "./positionStatus";
import { ProgressStatus } from "./progressStatus";
import { SeeOnExplorer } from "./seeOnExplorer";
import { ShortVerticalLine } from "./shortVerticalLine";

type StatusStepProps = {
  description: ReactNode;
  fees?:
    | {
        amount: bigint;
        isError?: boolean;
        isLoading?: boolean;
      }
    | undefined;
  position: number;
  txHash?: Hash;
};

const Completed = ({ description, position, txHash }: StatusStepProps) => (
  <>
    <div className="top-4.5 absolute left-6 md:left-8">
      <ShortVerticalLine />
    </div>
    <div className="mt-4">
      <PositionStatus position={position} status={ProgressStatus.COMPLETED} />
    </div>
    <Box
      bottom={
        txHash ? (
          <>
            <span className="mr-auto text-emerald-500">Confirmed</span>
            {txHash && <SeeOnExplorer txHash={txHash} />}
          </>
        ) : null
      }
      top={<span className="mr-auto text-neutral-600">{description}</span>}
    />
  </>
);

const Failed = ({ description, fees, position, txHash }: StatusStepProps) => (
  <>
    <div className="top-4.5 absolute left-6 md:left-8">
      <ShortVerticalLine stroke="stroke-rose-500" />
    </div>
    <div className="mt-4">
      <PositionStatus position={position} status={ProgressStatus.FAILED} />
    </div>
    <Box
      bottom={
        txHash ? (
          <>
            <span className="mr-auto text-rose-500">Error</span>
            {txHash && <SeeOnExplorer txHash={txHash} />}
          </>
        ) : null
      }
      top={
        <>
          <span className="mr-auto text-rose-500">{description}</span>
          {fees && <Fees {...fees} />}
        </>
      }
    />
  </>
);

const Progress = ({ description, fees, position, txHash }: StatusStepProps) => (
  <>
    <div className="top-4.5 absolute left-6 md:left-8">
      <ShortVerticalLine />
    </div>
    <div className="mt-4">
      <PositionStatus position={position} status={ProgressStatus.PROGRESS} />
    </div>
    <Box
      bottom={
        <>
          <span className="mr-auto text-neutral-500">Pending</span>
          {txHash && <SeeOnExplorer txHash={txHash} />}
        </>
      }
      top={
        <>
          <span className="mr-auto text-orange-500">{description}</span>
          {fees && <Fees {...fees} />}
        </>
      }
    />
  </>
);

const Rejected = ({ description, fees, position }: StatusStepProps) => (
  <>
    <div className="top-4.5 absolute left-6 md:left-8">
      <ShortVerticalLine stroke="stroke-orange-500" />
    </div>
    <div className="mt-4">
      <PositionStatus position={position} status={ProgressStatus.REJECTED} />
    </div>
    <Box
      bottom={<span className="mr-auto text-rose-500">Rejected</span>}
      top={
        <>
          <span className="mr-auto text-orange-500">{description}</span>
          {fees && <Fees {...fees} />}
        </>
      }
    />
  </>
);

const statusMap: Partial<
  Record<ProgressStatus, (props: StatusStepProps) => JSX.Element>
> = {
  [ProgressStatus.PROGRESS]: Progress,
  [ProgressStatus.COMPLETED]: Completed,
  [ProgressStatus.FAILED]: Failed,
  [ProgressStatus.REJECTED]: Rejected,
};

export const Step = function ({
  status,
  ...props
}: StatusStepProps & { status: ProgressStatus }) {
  const StatusStep = statusMap[status];
  return (
    <div className="relative flex flex-col gap-y-1 p-4 text-sm font-medium md:px-6">
      <div className="flex items-start gap-x-3 py-3">
        {StatusStep ? <StatusStep {...props} /> : null}
      </div>
    </div>
  );
};

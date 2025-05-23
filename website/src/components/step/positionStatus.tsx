import { ErrorIcon } from "../icons/errorIcon";
import { OrangeCheckIcon } from "../icons/orangeCheckIcon";
import { ProgressStatus } from "./progressStatus";

type Props = {
  position: number;
  status: ProgressStatus;
};

export const PositionStatus = function ({ position, status }: Props) {
  if (status === ProgressStatus.COMPLETED) {
    return <OrangeCheckIcon />;
  }
  if (status === ProgressStatus.FAILED) {
    return <ErrorIcon />;
  }

  const isInProgress = status === ProgressStatus.PROGRESS;

  return (
    <div className="relative h-5 w-5 rounded-full bg-orange-100">
      {isInProgress && (
        <img
          alt="Loading icon"
          className="animate-spin"
          height={20}
          src="/gradientLoading.png"
          width={20}
        />
      )}
      <div
        className="absolute inset-0 flex items-center justify-center
        text-[11px] font-medium leading-none text-orange-500"
      >
        {position}
      </div>
    </div>
  );
};

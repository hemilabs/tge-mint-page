import { ReactNode } from "react";

export const Box = ({ bottom, top }: { bottom: ReactNode; top: ReactNode }) => (
  <div className={`relative z-0 flex w-full flex-col ${bottom ? "-mb-3" : ""}`}>
    <div
      className="h-13 z-10 flex w-full items-center justify-between
      rounded-lg border border-solid border-neutral-300/55 bg-white p-4"
    >
      {top}
    </div>
    {bottom && (
      <div
        className="pt-4.5 relative flex h-[50px] w-full -translate-y-2 items-center gap-x-1
  rounded-b-lg border border-solid border-neutral-300/55 bg-neutral-100 px-4 pb-2.5"
      >
        {bottom}
      </div>
    )}
  </div>
);

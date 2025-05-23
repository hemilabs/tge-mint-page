"use client";

import { useOnClickOutside } from "hooks/useOnClickOutside";
import { useOnKeyUp } from "hooks/useOnKeyUp";
import { ComponentType } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "./icons/closeIcon";

type Props = {
  children: React.ReactNode;
  container?: HTMLElement;
  onClose?: () => void;
  overlay?: ComponentType;
};

const Overlay = () => (
  <div
    className="fixed bottom-0 left-0 right-0 top-0 z-20 h-full w-full bg-neutral-950 bg-opacity-[0.08] md:rounded-2xl"
    style={{
      background:
        "linear-gradient(112deg, rgba(10, 10, 10, 0.00) 0%, rgba(10, 10, 10, 0.24) 71.28%)",
    }}
  />
);

export const Drawer = function ({ children, onClose }: Props) {
  const drawerRef = useOnClickOutside<HTMLDivElement>(onClose);

  useOnKeyUp(function (e) {
    if (e.key === "Escape") {
      onClose?.();
    }
  }, drawerRef);

  const drawerContainer = document.getElementById("root");

  if (!drawerContainer) {
    // container not found, prevent "ReactDOM.createPortal" from crashing
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-30 w-full overflow-y-auto rounded-t-lg border border-solid 
        border-neutral-300/55 bg-white md:bottom-3 md:left-auto md:right-3 md:top-3 md:w-fit md:rounded-lg"
        ref={drawerRef}
        style={{
          boxShadow:
            "0px 4px 6px -2px rgba(10, 10, 10, 0.04), 0px 10px 24px -8px rgba(10, 10, 10, 0.08), -12px 0px 24px -8px rgba(10, 10, 10, 0.06), 0px 0px 0px 1px rgba(10, 10, 10, 0.06)",
        }}
      >
        {children}
      </div>
      <Overlay />
    </>,
    drawerContainer,
  );
};

export const DrawerTopSection = ({
  heading,
  onClose,
}: {
  heading: string;
  onClose?: () => void;
}) => (
  <div className="flex items-center justify-between px-4 pb-8 md:px-6">
    <h2 className="text-2xl font-medium text-neutral-950">{heading}</h2>
    {!!onClose && (
      <button
        className="h-5 w-5 cursor-pointer"
        onClick={onClose}
        type="button"
      >
        <CloseIcon className="h-full w-full [&>path]:hover:stroke-black" />
      </button>
    )}
  </div>
);

export const DrawerSectionBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="border-y border-solid border-neutral-300/55 bg-neutral-50">
    {children}
  </div>
);

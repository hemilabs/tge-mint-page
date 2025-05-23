import { WalletContext } from "context/walletContext";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SkeletonTheme } from "react-loading-skeleton";

import { App } from "./app";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletContext>
      <SkeletonTheme baseColor="#E5E5E5" highlightColor="#FAFAFA">
        <App />
      </SkeletonTheme>
    </WalletContext>
  </StrictMode>,
);

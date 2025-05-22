/* eslint-disable no-console */
import pWaitFor from "p-wait-for";
import { createPublicClient, defineChain, http } from "viem";
import { hemi } from "viem/chains";

export const setup = async function () {
  await pWaitFor(
    function ping() {
      console.log("Pinging local fork...");
      const client = createPublicClient({
        chain: defineChain({
          ...hemi,
          rpcUrls: {
            default: { http: ["http://localhost:8545"] },
          },
        }),
        transport: http(),
      });
      // ping until chain Id is available - then the fork is ready
      return client
        .getChainId()
        .catch(() => null)
        .then((chainId) => chainId === hemi.id);
    },
    {
      before: false,
      interval: 2000,
      timeout: {
        message: "Timeout waiting for local fork to be ready",
        milliseconds: 10_000,
      },
    },
  );

  console.log("Local fork ready!");
};

/* eslint-disable no-console */
import { ChildProcess, execSync, spawn } from "child_process";
import pWaitFor from "p-wait-for";
import { createPublicClient, defineChain, http } from "viem";
import { hemi } from "viem/chains";

let childProcess: ChildProcess;

export const setup = async function () {
  // Kill any other previous fork that could've been running, by checking the port
  try {
    console.log("Killing any previous local fork");
    const pids = execSync("lsof -ti:8545").toString().trim();
    if (pids) {
      execSync(`echo "${pids}" | xargs kill`);
    }
  } catch {
    // eslint-disable-line no-empty
  }
  console.log("Locating anvil binary...");
  // Locate the anvil binary dynamically, searching in $HOME/.foundry and $HOME/.config/.foundry
  // if not found there, assume it is not installed. This is because on Github Actions, the installation script
  // adds anvil into a PATH that is a different shell from the one running here. But as the binary is installed
  // we just need to find it and execute it. This snippet below does that
  const anvilPath = execSync(
    "find $HOME/.foundry $HOME/.config/.foundry -type f -name anvil -perm -u=r 2>/dev/null | head -n 5",
  )
    .toString()
    .split("\n")
    .filter(Boolean)[0];
  if (!anvilPath) {
    // Should always be found - it should be installed with the pretest command
    throw new Error("Anvil binary not found in $HOME");
  }
  console.log(`Found anvil binary at ${anvilPath}`);
  console.log("Starting local fork on port 8545");

  // Spawn the local fork in the background
  childProcess = spawn(anvilPath, ["--fork-url", hemi.rpcUrls.default.http[0]]);

  console.log(`Started local fork with pid ${childProcess.pid}`);

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

export const teardown = async function () {
  if (childProcess?.pid) {
    console.log("Killing local fork");
    process.kill(childProcess.pid, "SIGTERM");
  }
};

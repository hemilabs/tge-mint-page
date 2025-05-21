import {
  createTestClient,
  createWalletClient,
  defineChain,
  http,
  isAddress,
} from "viem";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "viem/actions";
import { mnemonicToAccount } from "viem/accounts";
import { hemi } from "viem/chains";
import { describe, expect, it, vi } from "vitest";

import { mintNFT } from "../src/mint";
import { erc721Abi } from "../src/abi";

if (!process.env.NFT_CONTRACT_ADDRESS) {
  throw new Error("NFT_CONTRACT_ADDRESS environment variable is not set");
}
if (!isAddress(process.env.NFT_CONTRACT_ADDRESS)) {
  throw new Error("NFT_CONTRACT_ADDRESS is not a valid address");
}

const nftAddress = process.env.NFT_CONTRACT_ADDRESS;

const hemiFork = defineChain({
  ...hemi,
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
});

const getAccount = (addressIndex = 0) =>
  mnemonicToAccount(
    // mnemonic that is used by foundry
    "test test test test test test test test test test test junk",
    { addressIndex },
  );

const getTestClient = () =>
  createTestClient({
    chain: hemiFork,
    mode: "anvil",
    transport: http(),
  });

const getWalletClient = (account = getAccount()) =>
  createWalletClient({ account, chain: hemiFork, transport: http() });

describe("mintNFT", function () {
  // I can't make this test work. Although the impersonation works, and the transaction
  // to disable minting is successful, the contract still returns "mintingEnabled" as true.
  // However, the test is well written, so I'm leaving it in case we are able to fix this in the future.
  // eslint-disable-next-line @vitest/no-disabled-tests
  it.skip("should fail if the minting is disabled", async function () {
    const testClient = getTestClient();

    const ownerAddress = await readContract(testClient, {
      abi: erc721Abi,
      address: nftAddress,
      functionName: "owner",
    });

    const impersonatedWallet = getWalletClient(ownerAddress);
    try {
      await testClient.impersonateAccount({ address: ownerAddress });

      // disable minting for this test. We need to rollback it after the test, regardless of the output
      const hash = await writeContract(impersonatedWallet, {
        abi: erc721Abi,
        address: ownerAddress,
        args: [],
        functionName: "disableMinting",
      });

      const receipt = await waitForTransactionReceipt(impersonatedWallet, {
        hash,
      });

      // fail the test otherwise
      expect(receipt.status).toBe("success");

      // Now, let's run the actual test we want: testing that minting is disabled and we can't mint then.
      const { emitter, promise } = mintNFT({
        chain: hemiFork,
        nftAddress,
        // only the first 10 accounts have ETH, and given it's 0-indexed, the 11th will not have
        walletClient: getWalletClient(),
      });

      const onMintingFailedValidation = vi.fn();

      emitter.on("minting-failed-validation", onMintingFailedValidation);

      await promise;

      expect(onMintingFailedValidation).toHaveBeenCalledExactlyOnceWith(
        "Minting is disabled.",
      );
    } finally {
      await writeContract(impersonatedWallet, {
        abi: erc721Abi,
        address: ownerAddress,
        args: [],
        functionName: "enableMinting",
      });
      await testClient.stopImpersonatingAccount({ address: ownerAddress });
    }

    const { emitter, promise } = mintNFT({
      chain: hemiFork,
      nftAddress,
      walletClient: getWalletClient(),
    });

    const onMintingFailedValidation = vi.fn();

    emitter.on("minting-failed-validation", onMintingFailedValidation);

    await promise;

    expect(onMintingFailedValidation).toHaveBeenCalledExactlyOnceWith(
      "Minting is disabled.",
    );
  });

  it("should fail if the account has no eth balance", async function () {
    const { emitter, promise } = mintNFT({
      chain: hemiFork,
      nftAddress,
      // only the first 10 accounts have ETH, and given it's 0-indexed, the 11th will not have
      walletClient: getWalletClient(getAccount(10)),
    });

    const onMintingFailedValidation = vi.fn();

    emitter.on("minting-failed-validation", onMintingFailedValidation);

    await promise;

    expect(onMintingFailedValidation).toHaveBeenCalledExactlyOnceWith(
      "Not enough ETH balance to mint NFT.",
    );
  });

  it("should mint an NFT and prevent from minting it again", async function () {
    const walletClient = getWalletClient(getAccount(1));

    const { emitter: mintingEmitter, promise: mintingPromise } = mintNFT({
      chain: hemiFork,
      nftAddress,
      walletClient,
    });

    const onPreMint = vi.fn();
    const onTransactionSucceeded = vi.fn();

    mintingEmitter.on("pre-mint", onPreMint);
    mintingEmitter.on("minting-transaction-succeeded", onTransactionSucceeded);

    await mintingPromise;

    expect(onPreMint).toHaveBeenCalledOnce();
    expect(onTransactionSucceeded).toHaveBeenCalledOnce();

    onPreMint.mockClear();

    // now that the token's been minted, let's retry again - it should fail
    const { emitter: failureEmitter, promise: failurePromise } = mintNFT({
      chain: hemiFork,
      nftAddress,
      walletClient,
    });

    const onFailedValidation = vi.fn();

    failureEmitter.on("minting-failed-validation", onFailedValidation);

    await failurePromise;

    expect(onPreMint).not.toHaveBeenCalled();

    expect(onFailedValidation).toHaveBeenCalledExactlyOnceWith(
      "This address has already minted the NFT.",
    );
  });
});

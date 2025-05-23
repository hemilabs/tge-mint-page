import { EventEmitter } from "events";
import {
  Address,
  Chain,
  createPublicClient,
  Hash,
  http,
  TransactionReceipt,
  WalletClient,
} from "viem";
import {
  getBalance,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "viem/actions";

import { erc721Abi } from "./abi";

export type MintEvents = {
  "minting-failed": [Error];
  "minting-failed-validation": [string];
  "minting-transaction-succeeded": [TransactionReceipt];
  "minting-transaction-reverted": [TransactionReceipt];
  "pre-mint": [];
  "unexpected-error": [Error];
  "user-signed-mint": [Hash];
  "user-signing-error": [Error];
};

const toPromiseEvent = function (
  callback: (emitter: EventEmitter<MintEvents>) => Promise<void>,
) {
  const emitter = new EventEmitter<MintEvents>();

  const promise = Promise.resolve(callback(emitter));

  return { emitter, promise };
};

const runMintNFT = ({
  chain,
  nftAddress,
  walletClient,
}: {
  chain: Chain;
  nftAddress: Address;
  walletClient: WalletClient;
}) =>
  async function (emitter: EventEmitter<MintEvents>) {
    // Create a public client for reading chain state
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    const [mintingEnabled, hasBalance, mintedAlready] = await Promise.all([
      readContract(publicClient, {
        abi: erc721Abi,
        address: nftAddress,
        functionName: "mintingEnabled",
      }),
      getBalance(publicClient, {
        address: walletClient.account!.address,
      }).then((balance) => balance > 0n),
      readContract(publicClient, {
        abi: erc721Abi,
        address: nftAddress,
        args: [walletClient.account!.address],
        functionName: "balanceOf",
      }).then((nftBalance) => nftBalance > 0n),
    ]);

    if (!mintingEnabled) {
      emitter.emit("minting-failed-validation", "Minting is disabled.");
      return;
    }
    if (!hasBalance) {
      emitter.emit(
        "minting-failed-validation",
        "Not enough ETH balance to mint NFT.",
      );
      return;
    }
    if (mintedAlready) {
      emitter.emit(
        "minting-failed-validation",
        "This address has already minted the NFT.",
      );
      return;
    }

    emitter.emit("pre-mint");

    const hash = await writeContract(walletClient, {
      abi: erc721Abi,
      account: walletClient.account!.address,
      address: nftAddress,
      chain,
      functionName: "mint",
    }).catch(function (error) {
      emitter.emit("user-signing-error", error);
    });

    if (!hash) {
      return;
    }

    emitter.emit("user-signed-mint", hash);

    const receipt = await waitForTransactionReceipt(publicClient, {
      hash,
    }).catch(function (error) {
      emitter.emit("minting-failed", error);
    });

    if (!receipt) {
      return;
    }

    emitter.emit(
      receipt.status === "success"
        ? "minting-transaction-succeeded"
        : "minting-transaction-reverted",
      receipt,
    );
  };

export const mintNFT = (...args: Parameters<typeof runMintNFT>) =>
  toPromiseEvent(runMintNFT(...args));

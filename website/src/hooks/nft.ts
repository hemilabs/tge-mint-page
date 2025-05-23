import { erc721Abi, nftAddress } from "nft-minter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventEmitter } from "events";
import { mintNFT, MintEvents } from "nft-minter";
import { hemi } from "viem/chains";
import { useAccount, useReadContract, useWalletClient } from "wagmi";

export const useImageURI = () =>
  useReadContract({
    abi: erc721Abi,
    address: nftAddress,
    chainId: hemi.id,
    functionName: "imageURI",
  });

export const useUserHasNft = function () {
  const { address } = useAccount();

  return useReadContract({
    abi: erc721Abi,
    address: nftAddress,
    args: [address!],
    chainId: hemi.id,
    functionName: "balanceOf",
    query: {
      enabled: !!address,
      select: (nftBalance) => nftBalance > 0n,
    },
  });
};

export const useMintNFT = function ({
  on,
}: {
  on: (emitter: EventEmitter<MintEvents>) => void;
}) {
  const { queryKey } = useUserHasNft();
  const queryClient = useQueryClient();
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationFn() {
      const { emitter, promise } = mintNFT({
        chain: hemi,
        nftAddress,
        // @ts-expect-error mismatch of types, but it works
        walletClient,
      });

      emitter.on("minting-transaction-succeeded", () =>
        queryClient.setQueryData(queryKey, true),
      );

      on(emitter);

      return promise;
    },
    onSettled() {
      // revalidate the useNft - do not return the promise
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

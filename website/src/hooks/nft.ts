import { erc721Abi, nftAddress } from "nft-minter";
import { hemi } from "viem/chains";
import { useReadContract } from "wagmi";

export const useImageURI = () =>
  useReadContract({
    abi: erc721Abi,
    address: nftAddress,
    chainId: hemi.id,
    functionName: "imageURI",
  });

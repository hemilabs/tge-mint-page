import { erc721Abi } from "nft-minter";
import { Address } from "viem";
import { hemi } from "viem/chains";
import { useReadContract } from "wagmi";

export const useImageURI = () =>
  useReadContract({
    abi: erc721Abi,
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS as Address,
    chainId: hemi.id,
    functionName: "imageURI",
  });

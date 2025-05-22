import { Address } from "viem";
import { hemi } from "viem/chains";
import { useReadContract } from "wagmi";

const abi = [
  {
    inputs: [],
    name: "imageURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const useImageURI = () =>
  useReadContract({
    abi,
    address: import.meta.env.VITE_NFT_CONTRACT_ADDRESS as Address,
    chainId: hemi.id,
    functionName: "imageURI",
  });

import { useImageURI } from "hooks/nft";
import Skeleton from "react-loading-skeleton";

export const NftImage = function () {
  const { data: src, isLoading } = useImageURI();

  if (isLoading) {
    return (
      <div className="h-96 w-64">
        <Skeleton className="size-full" containerClassName="flex-1" />
      </div>
    );
  }

  return <img alt="Nft Image" className="h-96 w-64" src={src}></img>;
};

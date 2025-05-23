import { Background } from "components/background";
import { Button } from "components/button";
import { Header } from "./components/header";
import { PageSubtitle } from "components/pageSubtitle";
import { PageTitle } from "components/pageTitle";
import { Badge } from "components/badge";
import { ConnectWallet } from "components/connectWallet";
import { NftImage } from "components/nftImage";

export const App = () => (
  <div className="font-inter mb-5 xl:mx-auto xl:max-w-6xl">
    <Background />
    <Header />
    <main className="md:gap-y-18 flex flex-col items-center gap-y-12 px-4 pt-10 xl:mt-24 xl:flex-row xl:justify-between xl:px-0">
      <div className="gap-y-4.5 flex flex-col items-center xl:items-start">
        <Badge />
        <PageTitle />
        <PageSubtitle />
        <div className="mt-2.5 flex w-full flex-col items-center gap-3 md:flex-row md:justify-center xl:justify-start">
          <ConnectWallet className="w-full max-md:h-10 md:w-fit" />
          <Button.Primary className="w-full max-md:h-10 md:ml-2 md:w-fit">
            Mint NFT
          </Button.Primary>
          <p className="max-w-44 text-center text-sm font-medium text-neutral-500 xl:text-left">
            Connect your wallet to mint this NFT.
          </p>
        </div>
      </div>
      <NftImage />
    </main>
  </div>
);

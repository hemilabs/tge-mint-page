# nft-minter

A small utility to mint an nft

## Tests Setup

Besides the [root README setup](../../README.md), the following steps are needed for the tests:

### Setup a local fork

[Anvil](https://book.getfoundry.sh/anvil/) should be installed to use the local fork.

```sh
curl -L https://foundry.paradigm.xyz | bash

# Install foundry
foundryup

# Check it was installed correctly by running
anvil --version
```

### Env variables

Create a `.env` file with the following variable:

```sh
NFT_CONTRACT_ADDRESS="<ADDRESS>"
```

Then use the following command in the appropriate app/package to run tests:

```sh
npm test
```

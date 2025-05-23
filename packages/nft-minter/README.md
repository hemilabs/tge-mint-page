# nft-minter

A small utility to mint an NFT

## Tests Setup

Besides the [root README setup](../../README.md), the following steps are needed for the tests:

### Setup a local fork

[Anvil](https://book.getfoundry.sh/anvil/) should be installed to use the local fork. The `pretest` script will automatically install Foundry and ensure it is set up correctly.
In case it fails, here's a breakdown on how to install Foundry.

```sh
# Download the installer
curl -L https://foundry.paradigm.xyz | bash

# Install foundry
foundryup

# Check it was installed correctly by running
anvil --version
```

### Tests

Use the following command in the appropriate app/package to run tests:

```sh
npm test
```

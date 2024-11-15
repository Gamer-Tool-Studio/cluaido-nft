# Cluaido NFTS

#edit

Welcome to the ClUAIDO NFTS! This repository contains the smart contracts and deployment scripts for the Cluaido NFT collection. The project is deployed across multiple blockchain networks and testnets, including BNB Smart Chain, Polygon,Arbitrum, Avalanche and others.

## Table of Contents

- [Project Overview](#project-overview)
- [Contracts Deployed](#contracts-deployed)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview

CLUAIDO is a procedural mystery game where you play as a detective racing against time to solve a murder case. As toxic gas slowly shrinks the map, find hidden clues and freely interrogate suspects (AI agents) with open-ended questioning. 
As a crowdfunding initiative we launched the Demo alongside a challenge to identify the culprit before the final game release. Players will be able to mint NFTs of their favourite suspects for a chance to win some rewards.

 - #### Play the Demo [here.](https://gamertoolstudio.com/cluaido/)

 - #### Read the NFT Crowdfunding rules [here.](https://medium.com/me/stats/post/d1189568a6a1)


## Contracts Deployed

Below are the addresses of the contracts deployed on different blockchain networks. You can click on the addresses to view them on the respective blockchain explorers.


| Chain                | Chain ID | Contract Type | Contract Address                                                                 |
|----------------------|----------|---------------|----------------------------------------------------------------------------------|
|                      |          | ERC20         |  [0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85](https://optimistic.etherscan.io/address/0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85) |
|                      |          | ERC20         |  [0x94b008aA00579c1307B0EF2c499aD98a8ce58e58](https://optimistic.etherscan.io/address/0x94b008aA00579c1307B0EF2c499aD98a8ce58e58) |
|                      |          | ERC1155       |  [0xd0dCB97bC361C67b36a2254eA31909499118E1FB](https://optimistic.etherscan.io/address/0xd0dCB97bC361C67b36a2254eA31909499118E1FB) |
| **OP Mainnet**       | 10       | Factory       | [0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee](https://optimistic.etherscan.io/address/0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee) |
|                      |          | ERC1155       | [0x52772940628d1EBc08E1B50C39e466495f808F89](https://sepolia.arbiscan.io/address/0x52772940628d1EBc08E1B50C39e466495f808F89) |
| **BNB Smart Chain**  | 56       | ERC1155         | [0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC](https://bscscan.com/address/0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC) |
|                      |          | BUSD-PEG         | [0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56](https://bscscan.com/address/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56) |
|                      |          | FDUSD         | [0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409](https://bscscan.com/address/0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409) |
| **Polygon (Testnet)** | 80001   | ERC20         | [0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee](https://amoy.polygonscan.com/address/0xF269CC8B597a13fb1B2a72Ce6F0C9677f89dd0ee) |
|                      |          | ERC1155       | [0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC](https://amoy.polygonscan.com/address/0x6313Ed503e467c235B2f3E1b6699F6EAf77A1FCC) |
| **Arbitrum Sepolia**  | 421611  | ERC20         | [0xd0dCB97bC361C67b36a2254eA31909499118E1FB](https://sepolia.arbiscan.io/address/0xd0dCB97bC361C67b36a2254eA31909499118E1FB) |
|                      |          | ERC1155       | [0x52772940628d1EBc08E1B50C39e466495f808F89](https://sepolia.arbiscan.io/address/0x52772940628d1EBc08E1B50C39e466495f808F89) |

## Getting Started

To run this project in your environment, clone this repository and follow the instructions in the `truffle-config.js` to set up the project. You will need to install the necessary dependencies and configure your environment variables for deployment.

```bash
git clone https://github.com/drBrown/cluaido-project.git
cd cluaido-project
npm install

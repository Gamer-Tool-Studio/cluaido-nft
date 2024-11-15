const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const { MNEMONIC, PRIVATE_KEY, POLYGONSCAN_API_KEY, BSCSCAN_API_KEY, SNOWTRACE_API_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  networks: {
    // Rede local para desenvolvimento
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Conecta-se a qualquer rede
    },

    // Avalanche Mainnet
    avalanche: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://api.avax.network/ext/bc/C/rpc`
        ),
      network_id: 43114, // Avalanche Mainnet
      gasPrice: 25000000000, // 25 Gwei
    },
    // Avalanche Fuji Testnet
    avalancheFujiTestnet: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://api.avax-test.network/ext/bc/C/rpc`
        ),
      network_id: 43113, // Avalanche Fuji Testnet
      gasPrice: 25000000000, // 25 Gwei
    },

    // Polygon Mainnet
    polygon: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://polygon-rpc.com`
        ),
      network_id: 137, // Polygon Mainnet
      gasPrice: 1000000000, // 1 Gwei
    },
    // Polygon Mumbai Testnet
    polygonMumbai: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://rpc-mumbai.maticvigil.com`
        ),
      network_id: 80001, // Polygon Mumbai
      gasPrice: 1000000000, // 1 Gwei
    },

    // Arbitrum Mainnet
    arbitrum: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          `https://arb1.arbitrum.io/rpc`
        ),
      network_id: 42161, // Arbitrum Mainnet
      gasPrice: 1000000000, // 1 Gwei
    },
    // Arbitrum Testnet (Goerli)
    arbitrumTestnet: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          `https://goerli-rollup.arbitrum.io/rpc`
        ),
      network_id: 421613, // Arbitrum Testnet
      gasPrice: 1000000000, // 1 Gwei
    },

    // Optimism Mainnet
    optimism: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://mainnet.optimism.io`
        ),
      network_id: 10, // Optimism Mainnet
      gasPrice: 15000000, // 15 Gwei
    },
    // Optimism Testnet (Goerli)
    optimismTestnet: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://goerli.optimism.io`
        ),
      network_id: 420, // Optimism Goerli Testnet
      gasPrice: 15000000, // 15 Gwei
    },
  },

  // Configurações do compilador Solidity
  compilers: {
    solc: {
      version: "0.8.25", // Certifique-se de que esta é a versão exata
    },
  },

  // Configurações para verificação em exploradores
  api_keys: {
    polygonscan: POLYGONSCAN_API_KEY,
    bscscan: BSCSCAN_API_KEY,
    snowtrace: SNOWTRACE_API_KEY,
    etherscan: ETHERSCAN_API_KEY,
  },

  plugins: [
    "truffle-plugin-verify",
    "solidity-coverage",
  ],
};

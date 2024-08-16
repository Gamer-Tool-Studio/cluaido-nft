const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(); // Para carregar variáveis de ambiente de um arquivo .env

const { MNEMONIC, INFURA_PROJECT_ID, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  networks: {
    // Rede de desenvolvimento local
    development: {
      host: "127.0.0.1",     // Endereço IP local
      port: 8545,            // Porta padrão do Ganache
      network_id: "*",       // Qualquer rede
    },

    // Polygon Mumbai (Testnet)
    polygon_mumbai: {
      provider: () => new HDWalletProvider({
        mnemonic: MNEMONIC,
        providerOrUrl: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJECT_ID}`,
        chainId: 80001
      }),
      network_id: 80001,
      confirmations: 2,      // Confirmações antes de considerar a transação como válida
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Arbitrum Sepolia (Testnet)
    arbitrum_sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: `https://arbitrum-sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
        chainId: 421614
      }),
      network_id: 421614,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // BNB Smart Chain Testnet
    bnb_testnet: {
      provider: () => new HDWalletProvider({
        privateKeys: [PRIVATE_KEY],
        providerOrUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
        chainId: 97
      }),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Configurações do compilador Solidity
  compilers: {
    solc: {
      version: "0.8.25",    // Usa a versão do compilador que estás a usar no teu contrato
    }
  },

  // Configurações do plugin para verificar os contratos na Polygonscan
  api_keys: {
    polygonscan: POLYGONSCAN_API_KEY
  },

  plugins: [
    'truffle-plugin-verify' // Plugin para verificar os contratos
  ],
};

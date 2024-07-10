const CluaidoCoin = artifacts.require("CluaidoCoin");
const CluaidoNFT = artifacts.require("CluaidoNFT");

module.exports = function (deployer) {
  deployer.deploy(CluaidoCoin);
  deployer.deploy(CluaidoNFT);
};

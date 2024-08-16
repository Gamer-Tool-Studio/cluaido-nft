const CluaidoCoin = artifacts.require("CluaidoCoin");

module.exports = function (deployer) {
  // Deploy the CluaidoCoin contract
  deployer.deploy(CluaidoCoin);
};

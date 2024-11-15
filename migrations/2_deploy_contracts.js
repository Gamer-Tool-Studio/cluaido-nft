const CluaidoCoin = artifacts.require("CluaidoCoin");
const CluaidoFactory = artifacts.require("CluaidoFactory");

module.exports = async function (deployer, network, accounts) {
  // Deploy do CluaidoCoin (ERC20)
  await deployer.deploy(CluaidoCoin);
  const cluaidoCoin = await CluaidoCoin.deployed();

  console.log("CluaidoCoin deployed at:", cluaidoCoin.address);

  // Deploy da Factory
  await deployer.deploy(CluaidoFactory);
  const cluaidoFactory = await CluaidoFactory.deployed();

  console.log("CluaidoFactory deployed at:", cluaidoFactory.address);

  // Criar uma coleção inicial usando a Factory
  const tx = await cluaidoFactory.createCollection(cluaidoCoin.address, { from: accounts[0] });

  console.log("Initial CluaidoCollection created at:", tx.logs[0].args.collectionAddress);
};

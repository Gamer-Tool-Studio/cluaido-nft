const { expect } = require("chai");
const { BN, constants, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

const CluaidoCoin = artifacts.require("CluaidoCoin");
const CluaidoCollection = artifacts.require("CluaidoCollection");

contract("CluaidoCollection", (accounts) => {
  const [owner, user1, user2] = accounts;
  let cluaidoCoin, cluaidoCollection;

  beforeEach(async () => {
    // Deploy do CluaidoCoin
    cluaidoCoin = await CluaidoCoin.new({ from: owner });

    // Mint inicial para teste
    await cluaidoCoin.mint({ from: user1, value: web3.utils.toWei("1", "ether") });

    // Aprovar o contrato de NFT para usar tokens
    await cluaidoCoin.approve(user1, web3.utils.toWei("100", "ether"), { from: user1 });

    // Deploy do CluaidoCollection
    cluaidoCollection = await CluaidoCollection.new([cluaidoCoin.address], { from: owner });
  });

  it("deve permitir mint de NFT com token aceito", async () => {
    // Mint NFT
    const receipt = await cluaidoCollection.mint(1, cluaidoCoin.address, { from: user1 });

    // Verificar evento de mint
    expectEvent(receipt, "Minted", {
      account: user1,
      id: new BN(1),
      amount: new BN(1),
    });

    // Verificar o saldo do NFT
    const balance = await cluaidoCollection.balanceOf(user1, 1);
    expect(balance).to.be.bignumber.equal(new BN(1));
  });

  it("não deve permitir mint com token não aceito", async () => {
    const fakeToken = accounts[9]; // Token inexistente
    await expectRevert(
      cluaidoCollection.mint(1, fakeToken, { from: user1 }),
      "Token not accepted for payment"
    );
  });

  it("deve permitir que apenas o owner pause e despause o contrato", async () => {
    // Pausar
    const receipt = await cluaidoCollection.pause({ from: owner });
    expectEvent(receipt, "Paused");

    // Tentar mint enquanto pausado
    await expectRevert(
      cluaidoCollection.mint(1, cluaidoCoin.address, { from: user1 }),
      "Pausable: paused"
    );

    // Despausar
    const unpauseReceipt = await cluaidoCollection.unpause({ from: owner });
    expectEvent(unpauseReceipt, "Unpaused");
  });

  it("deve permitir adicionar e remover tokens aceitos", async () => {
    const newToken = accounts[8];

    // Adicionar novo token
    const receipt = await cluaidoCollection.acceptToken(newToken, { from: owner });
    expectEvent(receipt, "TokenAccepted", { token: newToken });

    // Remover token
    const removeReceipt = await cluaidoCollection.removeToken(newToken, { from: owner });
    expectEvent(removeReceipt, "TokenRemoved", { token: newToken });
  });
});

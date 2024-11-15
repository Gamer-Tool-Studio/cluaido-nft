const { expect } = require("chai");
const { BN, constants, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");

const CluaidoCoin = artifacts.require("CluaidoCoin");

contract("CluaidoCoin", (accounts) => {
  const [owner, user1, user2] = accounts;
  let cluaidoCoin;

  beforeEach(async () => {
    // Deploy do contrato
    cluaidoCoin = await CluaidoCoin.new({ from: owner });
  });

  it("deve ter o nome e símbolo corretos", async () => {
    expect(await cluaidoCoin.name()).to.equal("CluaidoCoin");
    expect(await cluaidoCoin.symbol()).to.equal("CluaidoCoin");
  });

  it("deve ter um limite máximo de supply (capped)", async () => {
    const maxSupply = await cluaidoCoin.maxSupply();
    expect(maxSupply).to.be.bignumber.equal(new BN("21000000000000000000000000")); // 21M * 10^18
  });

  it("deve permitir que o owner realize o mint inicial", async () => {
    const initialSupply = new BN("5000000000000000000000"); // 5000 * 10^18
    const balanceOwner = await cluaidoCoin.balanceOf(owner);

    expect(balanceOwner).to.be.bignumber.equal(initialSupply);
    expect(await cluaidoCoin.totalSupply()).to.be.bignumber.equal(initialSupply);
  });

  it("deve permitir que usuários mintem tokens", async () => {
    const mintAmount = new BN("50000000000000000000"); // 50 * 10^18

    const receipt = await cluaidoCoin.mint({ from: user1 });
    expectEvent(receipt, "Transfer", {
      from: constants.ZERO_ADDRESS,
      to: user1,
      value: mintAmount,
    });

    const balanceUser1 = await cluaidoCoin.balanceOf(user1);
    expect(balanceUser1).to.be.bignumber.equal(mintAmount);
  });

  it("não deve permitir mint quando exceder o limite de supply", async () => {
    // Mint tokens até atingir o limite máximo
    const mintPerUser = new BN("50000000000000000000"); // 50 * 10^18
    for (let i = 0; i < 420000; i++) {
      await cluaidoCoin.mint({ from: user1 });
    }

    // Tentar mintar além do limite
    await expectRevert(
      cluaidoCoin.mint({ from: user1 }),
      "ERR_EXCEEDED_MAX_SUPPLY"
    );
  });

  it("deve permitir transferências entre usuários", async () => {
    const mintAmount = new BN("50000000000000000000"); // 50 * 10^18

    await cluaidoCoin.mint({ from: user1 });
    await cluaidoCoin.transfer(user2, mintAmount, { from: user1 });

    const balanceUser2 = await cluaidoCoin.balanceOf(user2);
    expect(balanceUser2).to.be.bignumber.equal(mintAmount);
  });

  it("não deve permitir transferências de valores maiores que o saldo", async () => {
    const mintAmount = new BN("50000000000000000000"); // 50 * 10^18

    await cluaidoCoin.mint({ from: user1 });

    // Tentar transferir mais do que o saldo
    await expectRevert(
      cluaidoCoin.transfer(user2, mintAmount.add(new BN("1")), { from: user1 }),
      "ERC20: transfer amount exceeds balance"
    );
  });
});

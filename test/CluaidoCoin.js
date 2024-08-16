const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CluaidoCoin", function () {
  let CluaidoCoin, cluaidoCoin, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the CluaidoCoin contract
    CluaidoCoin = await ethers.getContractFactory("CluaidoCoin");
    cluaidoCoin = await CluaidoCoin.deploy();
    await cluaidoCoin.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct max supply", async function () {
      expect(await cluaidoCoin.maxSupply()).to.equal(ethers.utils.parseEther("21000000"));
    });

    it("Should mint initial supply to the owner", async function () {
      expect(await cluaidoCoin.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("5000"));
    });
  });

  describe("Minting", function () {
    it("Should mint new tokens to the sender", async function () {
      await cluaidoCoin.connect(addr1).mint();
      expect(await cluaidoCoin.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("50"));
    });

    it("Should not exceed the max supply", async function () {
      const mintAmount = ethers.utils.parseEther("50");
      const maxMints = (await cluaidoCoin.maxSupply()).sub(await cluaidoCoin.totalSupply()).div(mintAmount);

      // Mint the max possible
      for (let i = 0; i < maxMints; i++) {
        await cluaidoCoin.connect(addr1).mint();
      }

      // Attempt to mint beyond max supply
      await expect(cluaidoCoin.connect(addr1).mint()).to.be.revertedWith("ERR_EXCEEDED_MAX_SUPPLY");
    });
  });
});

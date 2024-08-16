const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CluaidoCollection", function () {
  let CluaidoCollection, cluaidoCollection, owner, addr1, addr2, addr3, Token, paymentToken;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy a mock ERC20 token to use as a payment token
    Token = await ethers.getContractFactory("ERC20Mock");
    paymentToken = await Token.deploy("Mock Token", "MTK", owner.address, ethers.utils.parseEther("1000000"));

    // Deploy the CluaidoCollection contract
    CluaidoCollection = await ethers.getContractFactory("CluaidoCollection");
    cluaidoCollection = await CluaidoCollection.deploy([paymentToken.address]);
    await cluaidoCollection.deployed();
  });

  describe("Deployment", function () {
    it("Should set the correct owner", async function () {
      expect(await cluaidoCollection.owner()).to.equal(owner.address);
    });

    it("Should initialize the max supply correctly", async function () {
      expect(await cluaidoCollection.maxSupply(1)).to.equal(10000000);
    });

    it("Should initialize the accepted tokens correctly", async function () {
      expect(await cluaidoCollection.acceptedTokens(paymentToken.address)).to.equal(true);
    });
  });

  describe("Minting NFTs", function () {
    it("Should mint a new NFT successfully", async function () {
      await paymentToken.connect(addr1).approve(cluaidoCollection.address, ethers.utils.parseEther("5"));
      await cluaidoCollection.connect(addr1).mint(1, paymentToken.address);

      expect(await cluaidoCollection.balanceOf(addr1.address, 1)).to.equal(1);
      expect(await cluaidoCollection.mintedCount(1)).to.equal(1);
    });

    it("Should fail if the max supply is reached", async function () {
      await cluaidoCollection.updateMaxSupply(1, 1);
      
      await paymentToken.connect(addr1).approve(cluaidoCollection.address, ethers.utils.parseEther("5"));
      await cluaidoCollection.connect(addr1).mint(1, paymentToken.address);

      await paymentToken.connect(addr2).approve(cluaidoCollection.address, ethers.utils.parseEther("5"));
      await expect(cluaidoCollection.connect(addr2).mint(1, paymentToken.address)).to.be.revertedWith("Max supply reached for this ID");
    });

    it("Should fail if the token is not accepted", async function () {
      const newToken = await Token.deploy("Another Token", "ATK", owner.address, ethers.utils.parseEther("1000000"));
      await expect(cluaidoCollection.connect(addr1).mint(1, newToken.address)).to.be.revertedWith("Token not accepted for payment");
    });

    it("Should fail if the payment transfer fails", async function () {
      await expect(cluaidoCollection.connect(addr1).mint(1, paymentToken.address)).to.be.revertedWith("Transfer failed");
    });
  });

  describe("Owner Functions", function () {
    it("Should update the mint price", async function () {
      const newPrice = ethers.utils.parseEther("10");
      await cluaidoCollection.updateMintPrice(newPrice);
      expect(await cluaidoCollection.mintPrice()).to.equal(newPrice);
    });

    it("Should update the max supply", async function () {
      const newMaxSupply = 20000000;
      await cluaidoCollection.updateMaxSupply(1, newMaxSupply);
      expect(await cluaidoCollection.maxSupply(1)).to.equal(newMaxSupply);
    });

    it("Should accept new tokens", async function () {
      const newToken = await Token.deploy("Another Token", "ATK", owner.address, ethers.utils.parseEther("1000000"));
      await cluaidoCollection.acceptToken(newToken.address);
      expect(await cluaidoCollection.acceptedTokens(newToken.address)).to.equal(true);
    });

    it("Should remove accepted tokens", async function () {
      await cluaidoCollection.removeToken(paymentToken.address);
      expect(await cluaidoCollection.acceptedTokens(paymentToken.address)).to.equal(false);
    });

    it("Should withdraw funds", async function () {
      await paymentToken.connect(addr1).approve(cluaidoCollection.address, ethers.utils.parseEther("5"));
      await cluaidoCollection.connect(addr1).mint(1, paymentToken.address);

      const ownerInitialBalance = await paymentToken.balanceOf(owner.address);
      await cluaidoCollection.withdrawFunds(paymentToken.address);
      const ownerFinalBalance = await paymentToken.balanceOf(owner.address);

      expect(ownerFinalBalance.sub(ownerInitialBalance)).to.equal(ethers.utils.parseEther("5"));
    });
  });

  describe("Pausable Functions", function () {
    it("Should pause the contract", async function () {
      await cluaidoCollection.pause();
      await expect(cluaidoCollection.connect(addr1).mint(1, paymentToken.address)).to.be.revertedWith("Pausable: paused");
    });

    it("Should unpause the contract", async function () {
      await cluaidoCollection.pause();
      await cluaidoCollection.unpause();
      await paymentToken.connect(addr1).approve(cluaidoCollection.address, ethers.utils.parseEther("5"));
      await cluaidoCollection.connect(addr1).mint(1, paymentToken.address);
      expect(await cluaidoCollection.balanceOf(addr1.address, 1)).to.equal(1);
    });
  });
});

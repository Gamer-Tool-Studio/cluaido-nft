// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";


contract ERC20Capped is ERC20 {
    uint256 public immutable maxSupply;

    constructor(string memory name, string memory symbol, uint256 cap) ERC20(name, symbol) {
        require(cap > 0, "Cap must be greater than zero");
        maxSupply = cap;
    }

    function _mintCapped(address account, uint256 amount) internal {
        require(totalSupply() + amount <= maxSupply, "ERR_EXCEEDED_MAX_SUPPLY");
        _mint(account, amount);
    }
}

contract CluaidoCoinDynamic is ERC20Capped, Ownable {
    uint256 private _mintValue = 5 ether;

    constructor() ERC20Capped("CluaidoCoin", "CCN", 21000000 * 10**18) Ownable() {
        // Mint inicial de 250 tokens para o owner
        _mintCapped(msg.sender, 250 * 10**decimals());
    }

    function mint(uint256 mintAmount) public payable returns (uint256) {
        uint256 valueRequired = mintAmount * _mintValue;
        require(msg.value >= valueRequired, "Insufficient native tokens to mint the requested amount.");
        _mintCapped(msg.sender, mintAmount);
        return mintAmount;
    }

    function setMintPrice(uint256 mintPrice) public onlyOwner {
        _mintValue = mintPrice;
    }

    function getMintPrice() public view returns (uint256) {
        return _mintValue;
     }


    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");

        (bool success, ) = owner().call{value: contractBalance}("");
        require(success, "Transfer failed");
    }

    receive() external payable {}
    fallback() external payable {}
}

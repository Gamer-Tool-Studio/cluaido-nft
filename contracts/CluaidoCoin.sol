// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract ERC20Capped is ERC20 {

    // define 21 milions as mark cap 
    uint256 public maxSupply = 21000000 * 10**decimals();
    

    constructor(string memory _name, 
                string memory _symbol) ERC20(_name, _symbol) 
    {}
   

    function _mintCapped(address _account, uint256 _value) internal {
        require(totalSupply() + _value <= maxSupply, 'ERR_EXCEEDED_MAX_SUPPLY');
        _mint(_account, _value);
    }    
}
contract CluaidoCoin is ERC20Capped, Ownable {
    uint256 private _mintAmount = 50 * 10**decimals();

    constructor() ERC20Capped("CluaidoCoin", "CluaidoCoin") Ownable(msg.sender) {
        _mintCapped(msg.sender, 50 * 10**decimals());
    }

    function mint() public payable returns (uint256) {
        if (msg.sender == owner()) {
            _mintCapped(msg.sender, _mintAmount);
        } else {
            require(msg.value == 5 ether, "You must send exactly 5 native tokens");
            _mintCapped(msg.sender, _mintAmount);
        }
        return _mintAmount;
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

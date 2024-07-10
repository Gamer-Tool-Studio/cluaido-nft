pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CluaidoNFT is ERC1155, Pausable, Ownable {
    uint256 public mintPrice = 5 * (10 ** 6); // Assuming stablecoins with 6 decimals
    mapping(uint256 => uint256) public mintedCount; // Count of minted NFTs per ID
    mapping(uint256 => uint256) public maxSupply;   // Max supply per NFT ID
    mapping(address => bool) public acceptedTokens; // List of accepted ERC20 tokens

    // Suspect IDs
    uint256 public constant SUSPECT_1_ID = 1;
    uint256 public constant SUSPECT_2_ID = 2;
    uint256 public constant SUSPECT_3_ID = 3;
    uint256 public constant SUSPECT_4_ID = 4;
    uint256 public constant SUSPECT_5_ID = 5;
    uint256 public constant SUSPECT_6_ID = 6;
    uint256 public constant SUSPECT_7_ID = 7;

    event Minted(address indexed account, uint256 indexed id, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount, address token);
    event MintPriceUpdated(uint256 newPrice);
    event MaxSupplyUpdated(uint256 indexed id, uint256 maxSupply);
    event TokenAccepted(address token);
    event TokenRemoved(address token);

    constructor(address[] memory _acceptedTokens) ERC1155("https://npc-gpt-api-04c6279a15ad.herokuapp.com/api/v1/cluaido/nft/{id}.json") {
        owner = msg.sender;

        // Set max supply for each suspect
        maxSupply[SUSPECT_1_ID] = 100;
        maxSupply[SUSPECT_2_ID] = 100;
        maxSupply[SUSPECT_3_ID] = 100;
        maxSupply[SUSPECT_4_ID] = 100;
        maxSupply[SUSPECT_5_ID] = 100;
        maxSupply[SUSPECT_6_ID] = 100;
        maxSupply[SUSPECT_7_ID] = 100;

        // Set accepted tokens
        for (uint i = 0; i < _acceptedTokens.length; i++) {
            acceptedTokens[_acceptedTokens[i]] = true;
        }
    }

    // Function to mint new tokens
    function mint(uint256 id, address paymentToken) public whenNotPaused {
        require(id >= SUSPECT_1_ID && id <= SUSPECT_7_ID, "Invalid suspect ID");
        require(mintedCount[id] < maxSupply[id], "Max supply reached for this ID");
        require(acceptedTokens[paymentToken], "Token not accepted for payment");
        require(IERC20(paymentToken).transferFrom(msg.sender, address(this), mintPrice), "Transfer failed");
        _mint(msg.sender, id, 1, "");
        mintedCount[id] += 1;
        emit Minted(msg.sender, id, 1);
    }

    // Function to withdraw funds
    function withdrawFunds(address token) public onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner, balance);
        emit Withdrawn(owner, balance, token);
    }

    // Function to update mint price
    function updateMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    // Function to update max supply of a specific ID
    function updateMaxSupply(uint256 id, uint256 newMaxSupply) public onlyOwner {
        require(id >= SUSPECT_1_ID && id <= SUSPECT_7_ID, "Invalid suspect ID");
        maxSupply[id] = newMaxSupply;
        emit MaxSupplyUpdated(id, newMaxSupply);
    }

    // Function to accept a new token for minting
    function acceptToken(address token) public onlyOwner {
        acceptedTokens[token] = true;
        emit TokenAccepted(token);
    }

    // Function to remove a token from accepted list
    function removeToken(address token) public onlyOwner {
        acceptedTokens[token] = false;
        emit TokenRemoved(token);
    }

    // Function to pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    // Function to unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}

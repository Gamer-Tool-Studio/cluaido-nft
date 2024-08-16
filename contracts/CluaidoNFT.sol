// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";
import "@thirdweb-dev/contracts/extension/LazyMint.sol";
import "@thirdweb-dev/contracts/extension/Multicall.sol";


contract CluaidoCollection is ERC1155, Pausable, Ownable, ContractMetadata, LazyMint, Multicall {
    uint256 public mintPrice = 0.2 * (10 ** 18); //  stablecoins with 18 decimals

    mapping(uint256 => uint256) public mintedCount;
    mapping(uint256 => uint256) public maxSupply;   
    mapping(address => bool) public acceptedTokens; 

    // medata for conctact
    string private _contractURI;


    // IDs for items
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

    constructor(address[] memory _acceptedTokens) ERC1155("https://npc-gpt-api-04c6279a15ad.herokuapp.com/api/v1/cluaido/nft/{id}.json") Ownable(msg.sender) {
        maxSupply[SUSPECT_1_ID] = 10000000;
        maxSupply[SUSPECT_2_ID] = 10000000;
        maxSupply[SUSPECT_3_ID] = 10000000;
        maxSupply[SUSPECT_4_ID] = 10000000;
        maxSupply[SUSPECT_5_ID] = 10000000;
        maxSupply[SUSPECT_6_ID] = 10000000;
        maxSupply[SUSPECT_7_ID] = 10000000;

        //set contract url from the interface       
        _setupContractURI("https://coral-odd-wren-489.mypinata.cloud/ipfs/QmchFhLdfzZjuqPRbwVvt2zQJaQ9dAMuZhCTCWqLDLSEFy");

         // Set accepted tokens
        for (uint i = 0; i < _acceptedTokens.length; i++) {
            acceptedTokens[_acceptedTokens[i]] = true;
        }
    }

    // overrride _msgSender from Multicall
    function _msgSender() internal view override(Context, Multicall) returns (address) {
        return super._msgSender();
    }

    function _canLazyMint() internal view virtual override returns (bool) {
        return msg.sender == owner();
    }

     function _canSetContractURI() internal view virtual override returns (bool){
        return msg.sender == owner();
    }


    function mint(uint256 id, address paymentToken) public whenNotPaused {
        require(id >= SUSPECT_1_ID && id <= SUSPECT_7_ID, "Invalid suspect ID");
        require(mintedCount[id] < maxSupply[id], "Max supply reached for this ID");
        require(acceptedTokens[paymentToken], "Token not accepted for payment");
        require(IERC20(paymentToken).transferFrom(msg.sender, address(this), mintPrice), "Transfer failed");
        _mint(msg.sender, id, 1, "");
        mintedCount[id] += 1;
        emit Minted(msg.sender, id, 1);
    }

    function withdrawFunds(address token) public onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner(), balance);
        emit Withdrawn(owner(), balance, token);
    }

    function updateMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    function updateMaxSupply(uint256 id, uint256 newMaxSupply) public onlyOwner {
        require(id >= SUSPECT_1_ID && id <= SUSPECT_7_ID, "Invalid suspect ID");
        maxSupply[id] = newMaxSupply;
        emit MaxSupplyUpdated(id, newMaxSupply);
    }

    function acceptToken(address token) public onlyOwner {
        acceptedTokens[token] = true;
        emit TokenAccepted(token);
    }

    function removeToken(address token) public onlyOwner {
        acceptedTokens[token] = false;
        emit TokenRemoved(token);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

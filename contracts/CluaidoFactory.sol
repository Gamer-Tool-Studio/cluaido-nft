// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./CluaidoCollection.sol";

contract CluaidoFactory {
    event CollectionCreated(address indexed collectionAddress);

    function createCollection(address _acceptedToken) public {

        address[] memory acceptedTokens;
        acceptedTokens[0] = _acceptedToken;

        CluaidoCollection newCollection = new CluaidoCollection(acceptedTokens);

        emit CollectionCreated(address(newCollection));
    }
}

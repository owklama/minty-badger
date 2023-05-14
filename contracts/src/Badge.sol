pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// Badge contract inheriting from OpenZeppelin's ERC1155
contract Badge is ERC1155 {
    address public factory;

    // Constructor that sets the URI and the factory address
    constructor(string memory uri, address _factory) ERC1155(uri) {
        factory = _factory;
    }

    // Mint function that can only be called by the factory
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external {
        require(msg.sender == factory, "Only factory can mint");

        // Mint a new token to the recipient
        _mint(to, id, amount, data);
    }
}
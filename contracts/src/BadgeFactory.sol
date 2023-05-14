pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Badge.sol";

contract BadgeFactory is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address public badgeAddress;

    event BadgeMinted(address indexed to, uint256 tokenId, uint256 amount);

    // Constructor that deploys a new Badge contract
    constructor(string memory uri) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        Badge badge = new Badge(uri, address(this));
        badgeAddress = address(badge);
    }

    // Function to mint a new badge
    function mintBadge(address to, uint256 id, uint256 amount, bytes memory data) external onlyRole(MINTER_ROLE) {
        Badge(badgeAddress).mint(to, id, amount, data);
        emit BadgeMinted(to, id, amount);
    }
}
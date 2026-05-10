// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract IncomeVerifier is ERC721 {
    struct Credential {
        uint8   tier;
        uint256 expiry;
    }

    mapping(address => Credential) public credentials;
    uint256 private _tokenIds;

    event CredentialMinted(address indexed user, uint256 tokenId, uint8 tier);

    constructor() ERC721("ProveIt Credential", "PIC") {}

    function submitProof(uint32 incomeThreshold) external {
        require(incomeThreshold >= 30000, "Below minimum threshold");
        require(block.timestamp >= credentials[msg.sender].expiry, "Credential still valid");

        uint8 tier = 1;
        if (incomeThreshold >= 100000) tier = 3;
        else if (incomeThreshold >= 60000) tier = 2;

        credentials[msg.sender] = Credential({ tier: tier, expiry: block.timestamp + 90 days });
        _tokenIds++;
        _mint(msg.sender, _tokenIds);

        emit CredentialMinted(msg.sender, _tokenIds, tier);
    }

    function getCredential(address user) external view returns (uint8 tier, uint256 expiry, bool valid) {
        Credential memory c = credentials[user];
        return (c.tier, c.expiry, block.timestamp < c.expiry);
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Soulbound: non-transferable");
        return super._update(to, tokenId, auth);
    }
}

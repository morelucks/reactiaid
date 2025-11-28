// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DisasterOracle
 * @notice Origin contract that emits disaster events for Reactive Contracts to monitor
 * @dev Deployed on Ethereum Sepolia testnet
 */
contract DisasterOracle {
    event DisasterDeclared(
        uint8 indexed disasterType,
        uint256 indexed severity,
        string location,
        uint256 timestamp,
        address indexed declaredBy
    );

    mapping(address => bool) public authorized;

    constructor() {
        authorized[msg.sender] = true;
    }

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "DisasterOracle: not authorized");
        _;
    }

    function triggerDisaster(
        uint8 _type,
        uint256 _severity,
        string calldata _location
    ) external onlyAuthorized {
        emit DisasterDeclared(
            _type,
            _severity,
            _location,
            block.timestamp,
            msg.sender
        );
    }

    function addAuthorized(address _address) external onlyAuthorized {
        authorized[_address] = true;
    }

    function removeAuthorized(address _address) external onlyAuthorized {
        authorized[_address] = false;
    }
}


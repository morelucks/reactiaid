// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AidVault
 * @notice Destination contract that receives callbacks and distributes emergency aid
 * @dev Deployed on Optimism Sepolia - receives callbacks from Reactive Network
 */
contract AidVault {
    event AidDistributed(
        uint8 indexed disasterType,
        uint256 severity,
        string location,
        uint8 responseLevel,
        uint256 amount,
        address indexed recipient
    );

    mapping(address => bool) public authorizedCallers;
    mapping(string => uint256) public locationFunds;
    uint256 public totalDistributed;

    constructor(address _callbackProxy) {
        authorizedCallers[_callbackProxy] = true;
    }

    function distributeAid(
        uint8 disasterType,
        uint256 severity,
        string memory location,
        uint8 responseLevel
    ) external {
        require(authorizedCallers[msg.sender], "AidVault: unauthorized");
        
        uint256 amount = _calculateAidAmount(severity, responseLevel);
        locationFunds[location] += amount;
        totalDistributed += amount;
        
        emit AidDistributed(
            disasterType,
            severity,
            location,
            responseLevel,
            amount,
            address(this)
        );
    }

    function _calculateAidAmount(
        uint256 severity,
        uint8 level
    ) private pure returns (uint256) {
        return severity * (level + 1) * 1e18;
    }

    function addAuthorizedCaller(address _caller) external {
        authorizedCallers[_caller] = true;
    }
}


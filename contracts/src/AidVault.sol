// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';

/**
 * @title AidVault
 * @notice Destination contract that receives callbacks and distributes emergency aid
 * @dev Deployed on Optimism Sepolia - receives callbacks from Reactive Network
 * Uses AbstractCallback from reactive-lib for proper callback authorization
 */
contract AidVault is AbstractCallback {
    event AidDistributed(
        uint8 indexed disasterType,
        uint256 severity,
        string location,
        uint8 responseLevel,
        uint256 amount,
        address indexed recipient
    );

    mapping(string => uint256) public locationFunds;
    uint256 public totalDistributed;

    constructor(address _callbackProxy) AbstractCallback(_callbackProxy) {
    }

    function distributeAid(
        uint8 disasterType,
        uint256 severity,
        string memory location,
        uint8 responseLevel
    ) external authorizedSenderOnly {
        
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
}


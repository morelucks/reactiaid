// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EmergencyResponse
 * @notice Reactive contract that monitors disaster events and triggers aid distribution
 * @dev Deployed on Reactive Network - subscribes to DisasterDeclared events
 */
contract EmergencyResponse {
    event Callback(
        address indexed callbackContract,
        bytes callbackData
    );

    enum ResponseLevel { LOW, MEDIUM, HIGH, CRITICAL }

    address public immutable callbackContract;
    address public immutable originContract;
    uint256 public immutable severityThreshold;

    constructor(
        address _originContract,
        address _callbackContract,
        uint256 _severityThreshold
    ) {
        originContract = _originContract;
        callbackContract = _callbackContract;
        severityThreshold = _severityThreshold;
    }

    function react(
        bytes calldata eventData
    ) external {
        // Decode DisasterDeclared event data
        (uint8 disasterType, uint256 severity, string memory location) = 
            abi.decode(eventData, (uint8, uint256, string));
        
        if (severity >= severityThreshold) {
            ResponseLevel level = _determineResponseLevel(severity);
            bytes memory callbackData = abi.encodeWithSignature(
                "distributeAid(uint8,uint256,string,uint8)",
                disasterType,
                severity,
                location,
                uint8(level)
            );
            
            emit Callback(callbackContract, callbackData);
        }
    }

    function _determineResponseLevel(uint256 severity) private pure returns (ResponseLevel) {
        if (severity >= 8) return ResponseLevel.CRITICAL;
        if (severity >= 5) return ResponseLevel.HIGH;
        if (severity >= 3) return ResponseLevel.MEDIUM;
        return ResponseLevel.LOW;
    }
}


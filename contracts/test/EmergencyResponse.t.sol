// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EmergencyResponse} from "../src/EmergencyResponse.sol";
import {IReactive} from "../lib/reactive-lib/src/interfaces/IReactive.sol";

contract EmergencyResponseTest is Test {
    EmergencyResponse public reactive;
    address public origin = address(0x1);
    address public callback = address(0x2);
    uint256 public threshold = 3;
    uint256 public cooldown = 3600; // 1 hour

    function setUp() public {
        reactive = new EmergencyResponse(origin, callback, threshold, cooldown);
    }

    function _createLogRecord(
        uint8 disasterType,
        uint256 severity,
        string memory location,
        uint256 timestamp,
        address declaredBy,
        uint256 chainId,
        uint256 txHash,
        uint256 logIndex
    ) internal pure returns (IReactive.LogRecord memory) {
        bytes memory eventData = abi.encode(disasterType, severity, location, timestamp, declaredBy);
        return IReactive.LogRecord({
            chain_id: chainId,
            _contract: address(0x1),
            topic_0: 0,
            topic_1: 0,
            topic_2: 0,
            topic_3: 0,
            data: eventData,
            block_number: 0,
            op_code: 0,
            block_hash: 0,
            tx_hash: txHash,
            log_index: logIndex
        });
    }

    function test_ReactTriggersCallback() public {
        IReactive.LogRecord memory log = _createLogRecord(
            1, // flood
            5, // severity >= threshold
            "New York",
            block.timestamp,
            address(0x3),
            11155111, // Sepolia
            0x123,
            0
        );
        
        // Call react and check results
        reactive.react(log);
        
        // Verify state changes
        assertEq(reactive.totalDisastersProcessed(), 1);
        assertEq(reactive.totalCallbacksTriggered(), 1);
        
        // Verify disaster was processed
        bytes32 disasterId = keccak256(abi.encodePacked(
            log.chain_id,
            log._contract,
            log.tx_hash,
            log.log_index
        ));
        assertTrue(reactive.isProcessed(disasterId));
    }

    function test_ReactIgnoresLowSeverity() public {
        IReactive.LogRecord memory log = _createLogRecord(
            1,
            2, // severity < threshold
            "New York",
            block.timestamp,
            address(0x3),
            11155111,
            0x123,
            0
        );
        
        reactive.react(log);
        
        // Should process but not trigger callback
        assertEq(reactive.totalDisastersProcessed(), 1);
        assertEq(reactive.totalCallbacksTriggered(), 0);
    }
    
    function test_PreventsDuplicateProcessing() public {
        IReactive.LogRecord memory log = _createLogRecord(
            1,
            5,
            "New York",
            block.timestamp,
            address(0x3),
            11155111,
            0x123,
            0
        );
        
        reactive.react(log);
        
        // Try to process same disaster again (same tx_hash and log_index)
        vm.expectRevert("EmergencyResponse: disaster already processed");
        reactive.react(log);
    }
    
    function test_RateLimiting() public {
        IReactive.LogRecord memory log1 = _createLogRecord(
            1,
            5,
            "New York",
            block.timestamp,
            address(0x3),
            11155111,
            0x123,
            0
        );
        
        reactive.react(log1);
        
        // Try to process another disaster in same location within cooldown
        IReactive.LogRecord memory log2 = _createLogRecord(
            2,
            6,
            "New York",
            block.timestamp + 1,
            address(0x4),
            11155111,
            0x456,
            0
        );
        
        vm.expectRevert("EmergencyResponse: location in cooldown period");
        reactive.react(log2);
    }
}


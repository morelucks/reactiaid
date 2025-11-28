// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {EmergencyResponse} from "../src/EmergencyResponse.sol";

contract EmergencyResponseTest is Test {
    EmergencyResponse public reactive;
    address public origin = address(0x1);
    address public callback = address(0x2);
    uint256 public threshold = 3;

    function setUp() public {
        reactive = new EmergencyResponse(origin, callback, threshold);
    }

    function test_ReactTriggersCallback() public {
        bytes memory eventData = abi.encode(
            uint8(1), // flood
            uint256(5), // severity >= threshold
            "New York"
        );
        
        vm.expectEmit(true, false, false, true);
        emit EmergencyResponse.Callback(callback, "");
        
        reactive.react(eventData);
    }

    function test_ReactIgnoresLowSeverity() public {
        bytes memory eventData = abi.encode(
            uint8(1),
            uint256(2), // severity < threshold
            "New York"
        );
        
        reactive.react(eventData);
        // Should not emit callback
    }
}


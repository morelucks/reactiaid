// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {DisasterOracle} from "../src/DisasterOracle.sol";

contract DisasterOracleTest is Test {
    DisasterOracle public oracle;
    address public deployer = address(this);
    address public authorized = address(0x1);
    address public unauthorized = address(0x2);

    function setUp() public {
        oracle = new DisasterOracle();
    }

    function test_TriggerDisaster() public {
        // Deployer is already authorized, use deployer
        vm.expectEmit(true, true, false, true);
        emit DisasterOracle.DisasterDeclared(
            1, // flood
            5, // severity
            "New York",
            block.timestamp,
            deployer
        );
        
        oracle.triggerDisaster(1, 5, "New York");
    }

    function test_UnauthorizedCannotTrigger() public {
        vm.expectRevert("DisasterOracle: not authorized");
        vm.prank(unauthorized);
        oracle.triggerDisaster(1, 5, "New York");
    }

    function test_AddAuthorized() public {
        oracle.addAuthorized(authorized);
        assertTrue(oracle.authorized(authorized));
    }
}


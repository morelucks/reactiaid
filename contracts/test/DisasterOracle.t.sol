// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {DisasterOracle} from "../src/DisasterOracle.sol";

contract DisasterOracleTest is Test {
    DisasterOracle public oracle;
    address public authorized = address(0x1);
    address public unauthorized = address(0x2);

    function setUp() public {
        oracle = new DisasterOracle();
    }

    function test_TriggerDisaster() public {
        vm.prank(authorized);
        oracle.addAuthorized(authorized);
        
        vm.expectEmit(true, true, false, true);
        emit DisasterOracle.DisasterDeclared(
            1, // flood
            5, // severity
            "New York",
            block.timestamp,
            authorized
        );
        
        vm.prank(authorized);
        oracle.triggerDisaster(1, 5, "New York");
    }

    function test_UnauthorizedCannotTrigger() public {
        vm.expectRevert("DisasterOracle: not authorized");
        oracle.triggerDisaster(1, 5, "New York");
    }
}


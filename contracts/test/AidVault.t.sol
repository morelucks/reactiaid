// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {AidVault} from "../src/AidVault.sol";

contract AidVaultTest is Test {
    AidVault public vault;
    address public callbackProxy = address(0x1);
    address public unauthorized = address(0x2);

    function setUp() public {
        vault = new AidVault(callbackProxy);
    }

    function test_DistributeAid() public {
        vm.prank(callbackProxy);
        
        uint256 expectedAmount = 5 * (2 + 1) * 1e18; // 15e18
        
        vm.expectEmit(true, false, false, true);
        emit AidVault.AidDistributed(1, 5, "New York", 2, expectedAmount, address(vault));
        
        vault.distributeAid(1, 5, "New York", 2);
        
        assertEq(vault.locationFunds("New York"), expectedAmount);
        assertEq(vault.totalDistributed(), expectedAmount);
    }

    function test_UnauthorizedCannotDistribute() public {
        vm.expectRevert("Authorized sender only");
        vm.prank(unauthorized);
        vault.distributeAid(1, 5, "New York", 2);
    }
}


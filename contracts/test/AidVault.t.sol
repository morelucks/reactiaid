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
        
        vm.expectEmit(true, false, false, true);
        emit AidVault.AidDistributed(1, 5, "New York", 2, 0, address(vault));
        
        vault.distributeAid(1, 5, "New York", 2);
        
        assertEq(vault.locationFunds("New York"), 15e18);
        assertEq(vault.totalDistributed(), 15e18);
    }

    function test_UnauthorizedCannotDistribute() public {
        vm.expectRevert("AidVault: unauthorized");
        vm.prank(unauthorized);
        vault.distributeAid(1, 5, "New York", 2);
    }
}


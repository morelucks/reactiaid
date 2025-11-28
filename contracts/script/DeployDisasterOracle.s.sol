// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {DisasterOracle} from "../src/DisasterOracle.sol";

contract DeployDisasterOracle is Script {
    function run() public {
        vm.startBroadcast();
        
        DisasterOracle oracle = new DisasterOracle();
        
        console.log("DisasterOracle deployed at:", address(oracle));
        
        vm.stopBroadcast();
    }
}


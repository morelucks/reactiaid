// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {EmergencyResponse} from "../src/EmergencyResponse.sol";

contract DeployEmergencyResponse is Script {
    function run() public {
        address originContract = vm.envAddress("ORIGIN_CONTRACT_ADDR");
        address callbackContract = vm.envAddress("CALLBACK_CONTRACT_ADDR");
        uint256 severityThreshold = vm.envUint("SEVERITY_THRESHOLD");
        
        vm.startBroadcast();
        
        EmergencyResponse reactive = new EmergencyResponse(
            originContract,
            callbackContract,
            severityThreshold
        );
        
        console.log("EmergencyResponse deployed at:", address(reactive));
        console.log("Origin contract:", originContract);
        console.log("Callback contract:", callbackContract);
        console.log("Severity threshold:", severityThreshold);
        
        vm.stopBroadcast();
    }
}


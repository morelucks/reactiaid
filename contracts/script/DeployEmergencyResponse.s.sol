// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {EmergencyResponse} from "../src/EmergencyResponse.sol";

contract DeployEmergencyResponse is Script {
    function run() public {
        address originContract = vm.envAddress("ORIGIN_CONTRACT_ADDR");
        address callbackContract = vm.envAddress("CALLBACK_CONTRACT_ADDR");
        uint256 severityThreshold = vm.envUint("SEVERITY_THRESHOLD");
        uint256 cooldownPeriod = vm.envOr("COOLDOWN_PERIOD", uint256(3600)); // Default 1 hour
        
        vm.startBroadcast();
        
        EmergencyResponse reactive = new EmergencyResponse(
            originContract,
            callbackContract,
            severityThreshold,
            cooldownPeriod
        );
        
        console.log("EmergencyResponse deployed at:", address(reactive));
        console.log("Origin contract:", originContract);
        console.log("Callback contract:", callbackContract);
        console.log("Severity threshold:", severityThreshold);
        console.log("Cooldown period:", cooldownPeriod);
        
        vm.stopBroadcast();
    }
}


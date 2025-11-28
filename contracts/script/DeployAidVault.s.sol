// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AidVault} from "../src/AidVault.sol";

contract DeployAidVault is Script {
    function run() public {
        address callbackProxy = vm.envAddress("DESTINATION_CALLBACK_PROXY_ADDR");
        
        vm.startBroadcast();
        
        AidVault vault = new AidVault(callbackProxy);
        
        console.log("AidVault deployed at:", address(vault));
        console.log("Callback proxy:", callbackProxy);
        
        vm.stopBroadcast();
    }
}


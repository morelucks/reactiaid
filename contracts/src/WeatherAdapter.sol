// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DisasterOracle.sol";

/**
 * @title WeatherAdapter
 * @notice Chainlink Functions entrypoint that forwards validated weather signals to DisasterOracle
 * @dev Deployed on Ethereum Sepolia; only the Chainlink Functions router is allowed to call it
 */
contract WeatherAdapter {
    DisasterOracle public immutable disasterOracle;
    address public immutable chainlinkRouter;

    modifier onlyChainlink() {
        require(msg.sender == chainlinkRouter, "WeatherAdapter: not router");
        _;
    }

    constructor(address _disasterOracle, address _chainlinkRouter) {
        disasterOracle = DisasterOracle(_disasterOracle);
        chainlinkRouter = _chainlinkRouter;
    }

    /**
     * @notice Called by Chainlink Functions when external weather data crosses a threshold
     * @param disasterType Encoded disaster type (e.g. 1 = flood, 2 = storm)
     * @param severity Encoded severity score derived from off-chain data
     * @param location Human-readable location label (e.g. "New York")
     */
    function reportWeatherDisaster(
        uint8 disasterType,
        uint256 severity,
        string calldata location
    ) external onlyChainlink {
        disasterOracle.triggerDisaster(disasterType, severity, location);
    }
}



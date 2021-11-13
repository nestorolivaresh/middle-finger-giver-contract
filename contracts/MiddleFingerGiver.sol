//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MiddleFingerGiver {
    uint256 totalMiddleFingers;

    uint256 private seed;

    event NewMiddleFinger(
        address indexed from,
        uint256 timestamp,
        string message
    );

    struct MiddleFinger {
        address giver;
        uint256 timestamp;
        string message;
    }

    MiddleFinger[] middleFingers;

    mapping(address => uint256) public lastTimeGaveMiddleFinger;

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function giveMiddleFinger(string memory _message) public {
        require(
            lastTimeGaveMiddleFinger[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );
        console.log(
            lastTimeGaveMiddleFinger[msg.sender] + 15 minutes,
            block.timestamp
        );
        lastTimeGaveMiddleFinger[msg.sender] = block.timestamp;
        totalMiddleFingers++;
        middleFingers.push(MiddleFinger(msg.sender, block.timestamp, _message));
        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed <= 50) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewMiddleFinger(msg.sender, block.timestamp, _message);
    }

    function getTotalMiddleFingers() public view returns (uint256) {
        console.log("We have %d total middle fingers!", totalMiddleFingers);
        return totalMiddleFingers;
    }

    function getAllMiddleFingers() public view returns (MiddleFinger[] memory) {
        return middleFingers;
    }
}

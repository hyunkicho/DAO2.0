// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

contract LLMManager is Ownable {
    uint8 public requiredPositiveRatio;
    struct LLMData {
        uint8 positiveRatio;
        bool positivePassed;
        string evidenceURL;
        bytes evidencedHash;
    }
    mapping(uint256 proposalId => LLMData) public llmDatas;
    constructor(
        uint8 _requiredPositiveRatio
    )
        Ownable(msg.sender)
    {
        requiredPositiveRatio=_requiredPositiveRatio;
    }

    function recordLLM(
        uint256 _proposalId,
        uint8 _aiPositiveRatio,
        string memory _evidenceURL,
        bytes memory _evidencedHash
    )
        public onlyOwner
    {
        if(_aiPositiveRatio >= requiredPositiveRatio) {
            llmDatas[_proposalId].positiveRatio = _aiPositiveRatio;
            llmDatas[_proposalId].positivePassed = true;
            llmDatas[_proposalId].evidenceURL = _evidenceURL;
            llmDatas[_proposalId].evidencedHash = _evidencedHash;
        } else {
            llmDatas[_proposalId].positiveRatio = _aiPositiveRatio;
            llmDatas[_proposalId].positivePassed = false;
            llmDatas[_proposalId].evidenceURL = _evidenceURL;
            llmDatas[_proposalId].evidencedHash = _evidencedHash;
        }
    }

    function checkLLM(
        uint256 _proposalId
    ) public view returns (LLMData memory){
        return llmDatas[_proposalId];
    }
}

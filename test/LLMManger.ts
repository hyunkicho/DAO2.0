import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { arbDaoTxT } from "./chatexample";
import exp from "constants";

describe('Start Example DaoLLMCheck test', async () => {
    async function deployLLMFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hre.ethers.getSigners();
    
        const LLMManager = await hre.ethers.getContractFactory("LLMManager");
        const llmManger = await LLMManager.deploy(40);
        const evidenceURL = "https://raw.githubusercontent.com/hyunkicho/DAO2.0/main/Blockchain/test/chatexample.js";
        const positivePassed = true;
        const dynamicBytes = hre.ethers.toUtf8Bytes(arbDaoTxT);
        const hash = hre.ethers.keccak256(dynamicBytes);
        console.log("hash >>", hash);
        return { llmManger, evidenceURL, positivePassed, hash, owner, otherAccount };
      }

    it('deploy LLMManager', async () => {
        const { llmManger, evidenceURL, positivePassed, hash, owner, otherAccount } = await loadFixture(deployLLMFixture);

        const proposalId = 0;
        const aiPositiveRatio = 80;
        await llmManger.recordLLM(
            proposalId,
            aiPositiveRatio,
            evidenceURL,
            hash
        );

        const llmData = await llmManger.checkLLM(proposalId);
        expect(llmData[0].toString()).to.equal(aiPositiveRatio.toString());
        expect(llmData[1]).to.be.equal(true);
        expect(llmData[2]).to.equal(evidenceURL);
        expect(llmData[0]).to.equal(hash);

        console.log("llmData >>", llmData);
    });
});

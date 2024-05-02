/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
// import chai from 'chai';
// import { solidity } from 'ethereum-waffle';
import { Bytes, Contract } from 'ethers';
import { ethers } from 'hardhat';
import { string } from 'hardhat/internal/core/params/argumentTypes';
import { Keccak } from 'sha3';
const { arbDaoTxT } = require('./chatexample');

describe('Start Example DaoLLMCheck test', async () => {
  // contracts
  let llmManger: Contract;

  //signers
  let owner: SignerWithAddress;
  let positiveRatio: number;
  let evidenceURL: string;
  let positivePassed: boolean;
  let evidenceHash: string;

  it('Set signer for test', async () => {
    [owner] = await ethers.getSigners(); // get a test address
    positiveRatio = 40;
    evidenceURL = "https://raw.githubusercontent.com/hyunkicho/DAO2.0/main/Blockchain/test/chatexample.js";
    positivePassed = true;
    evidenceHash = "d20a2943aa984539aef968ddde649cdb9555a48acb286482337d5db8b51b1222";
  });

  describe('Test LLMManager', () => {
    it('deploy LLMManager', async () => {
      const LLMManager = await ethers.getContractFactory("LLMManager");
      llmManger = await LLMManager.deploy(positiveRatio);
      console.log(`llmManger contract is deployed to ${llmManger.address}`);
    });

    it('step 01) check recordLLM', async () => {
      llmManger = await ethers.getContractAt("LLMManager", llmManger.address);
      const proposalId = 0;
      const aiPositiveRatio = 80;
      await llmManger.recordLLM(
        proposalId,
        aiPositiveRatio,
        evidenceURL,
        evidenceHash
      );
    });

    it('step 02) check checkLLM', async () => {
      llmManger = await ethers.getContractAt("LLMManager", llmManger.address);
      const proposalId = 0;
      const llmData = await llmManger.checkLLM(proposalId);
      console.log("llmData >>", llmData);
    });
  })
});
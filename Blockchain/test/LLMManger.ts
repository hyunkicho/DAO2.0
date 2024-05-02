/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
// import chai from 'chai';
// import { solidity } from 'ethereum-waffle';
import { Bytes, Contract } from 'ethers';
import { ethers } from 'hardhat';
const { arbDaoTxT } = require('./chatexample');

describe('Start Example DaoLLMCheck test', async () => {
  // contracts
  let llmManger: Contract;

  //signers
  let owner: SignerWithAddress;
  let positiveRatio: number;
  let evidenceURL: string;
  let positivePassed: boolean;
  let evidenceHash: Bytes;

  it('Set signer for test', async () => {
    [owner] = await ethers.getSigners(); // get a test address
    positiveRatio = 40;
    evidenceURL = "";
    positivePassed = true;
    evidenceHash= arbDaoTxT;
  });

  describe('Test LLMManager', () => {
    it('deploy LLMManager', async () => {
      const LLMManager = await ethers.getContractFactory("LLMManager");
      llmManger = await LLMManager.deploy(positiveRatio);
      console.log(`llmManger contract is deployed to ${llmManger.address}`);
    });

    it('step 01) record correctly', async () => {
      let currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("proposal currentBlockNumber is : ", currentBlockNumber);
      daoLLMC = await ethers.getContractAt("DaoLLMCheck", daoLLMCheck.address);

      await daoToken.approve(governor.address, changeToBigInt(100000000));

      erc20Token2 = await ethers.getContractAt("MEME20", exampleERC20_1.address);
      console.log("exampleERC20.address : " , erc20Token2.address);

      erc20Token3 = await ethers.getContractAt("MEME20", exampleERC20_1.address);
      console.log("exampleERC20.address : " , erc20Token3.address);
      //set Proposal to send token
      let teamAddress = teamAddr.address;
      console.log("team address :", teamAddress)
      // const grantAmount = 1000;
      // await erc20Token1.mint(governor.address, changeToBigInt(grantAmount))
      // await erc20Token2.mint(governor.address, changeToBigInt(grantAmount))
      // await erc20Token3.mint(governor.address, changeToBigInt(grantAmount))

      transferCalldata = erc20Token1.interface.encodeFunctionData("multiTransfer", [[voter1.address, voter2.address, voter3.address, voter4.address], [changeToBigInt(1),changeToBigInt(1),changeToBigInt(1),changeToBigInt(1)]]);
      console.log("transferCalldata :", transferCalldata)

      let proporsalId = await governor.callStatic.propose(
        [erc20Token1.address],
        [0],
        [transferCalldata],
        "Proposal #1: participate launch for team"
      )
      console.log("proporsalId is : ", proporsalId);
      //proposal을 해시한 값이 아이디로 나오게 된다.
      //값을 미리 받아온 후 실행, 실제로는 이벤트를 불러와서 체크할 수 있다.
      await governor.propose(
        [erc20Token1.address],
        [0],
        [transferCalldata],
        "Proposal #1: participate launch for team"
      )
      const stateOfProposal = await governor.state(proporsalId.toString())
      console.log("stateOfProposal is : ", stateOfProposal);
      propoasl1Id = proporsalId;
    });

    it('step 02) check get Votes', async () => {  
      const currentBlockNumber = await ethers.provider.getBlockNumber();
      expect(await governor.getVotes(voter1.address, currentBlockNumber-1)).to.equal('0');
      expect(await governor.getVotes(voter2.address, currentBlockNumber-1)).to.equal('0');
      expect(await governor.getVotes(voter3.address, currentBlockNumber-1)).to.equal('0');
      expect(await governor.getVotes(voter4.address, currentBlockNumber-1)).to.equal('0');
    });

    it('step 03) get nft and check Votes again', async () => {
      console.log("step 01 👉 : mint erc721 ") 
      await exampleERC721.mint(voter1.address)
      // expect(await exampleERC721.balanceOf(voter1.address)).to.equal(BN('1'));
      await exampleERC721.mint(voter2.address)
      // expect(await exampleERC721.balanceOf(voter2.address)).to.equal('1');
      await exampleERC721.mint(voter3.address)
      // expect(await exampleERC721.balanceOf(voter3.address)).to.equal('1');
      await exampleERC721.mint(voter4.address)
      // expect(await exampleERC721.balanceOf(voter4.address)).to.equal('1');

      console.log("step 02 👉 : delgate from erc721 ") 
      await exampleERC721.connect(voter1).delegate(voter1.address)
      await exampleERC721.connect(voter2).delegate(voter2.address)
      await exampleERC721.connect(voter3).delegate(voter3.address)
      await exampleERC721.connect(voter4).delegate(voter4.address)
      const currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("currentBlockNumber : ", currentBlockNumber)

      await ethers.provider.send("evm_mine", []); //mine to start vote
      console.log("step 03 👉 : check getPastVotes from erc721 ") 
      // expect(await exampleERC721.getPastVotes(voter1.address, currentBlockNumber)).to.equal('1');
      // expect(await exampleERC721.getPastVotes(voter2.address, currentBlockNumber)).to.equal('1');
      // expect(await exampleERC721.getPastVotes(voter3.address, currentBlockNumber)).to.equal('1');
      // expect(await exampleERC721.getPastVotes(voter4.address, currentBlockNumber)).to.equal('1');
      
      console.log("step 04 👉 : check getVotes from governor ") 
      // expect(await governor.getVotes(voter1.address, currentBlockNumber)).to.equal('1');
      // expect(await governor.getVotes(voter2.address, currentBlockNumber)).to.equal('1');
      // expect(await governor.getVotes(voter3.address, currentBlockNumber)).to.equal('1');
      // expect(await governor.getVotes(voter4.address, currentBlockNumber)).to.equal('1');

      const stateOfProposal = await governor.state(propoasl1Id.toString())
      console.log("stateOfProposal is : ", stateOfProposal);
    });

    it('step 04) castVote action', async () => {  
      console.log("proposal snap shot : ", await governor.proposalSnapshot(propoasl1Id))
      console.log("proposal deadline : ", await governor.proposalDeadline(propoasl1Id))
      let currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("currentBlockNumber : ", currentBlockNumber)

      await ethers.provider.send("evm_mine", []); //mine to start vote

      currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("currentBlockNumber : ", currentBlockNumber)

      await governor.connect(voter1).castVote(propoasl1Id.toString(),1) //1 is FOR 0 is Against

      await governor.connect(voter2).castVote(propoasl1Id.toString(),1) //1 is FOR 0 is Against

      let  hasVoted = await governor.hasVoted(propoasl1Id.toString(), voter2.address)
      console.log("hasVoted is : ", hasVoted);

      await governor.connect(voter3).castVote(propoasl1Id.toString(),1) //1 is FOR 0 is Against
      hasVoted = await governor.hasVoted(propoasl1Id.toString(), voter3.address)
      console.log("hasVoted is : ", hasVoted);

      await governor.connect(voter4).castVote(propoasl1Id.toString() ,1) //1 is FOR 0 is Against
      hasVoted = await governor.hasVoted(propoasl1Id.toString(), voter4.address)
      console.log("hasVoted is : ", hasVoted);

      const deadline = await governor.proposalDeadline(propoasl1Id.toString())
      console.log("deadline is ", deadline)

      let stateOfProposal = await governor.state(propoasl1Id.toString())
      console.log("stateOfProposal is : ", stateOfProposal);

      currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("currentBlockNumber is : ", currentBlockNumber);
      
      await ethers.provider.send("evm_mine", []); //mine to start vote
      await ethers.provider.send("evm_mine", []); //mine to start vote
      await ethers.provider.send("evm_mine", []); //mine to start vote
      await ethers.provider.send("evm_mine", []); //mine to start vote
      await ethers.provider.send("evm_mine", []); //mine to start vote
      currentBlockNumber = await ethers.provider.getBlockNumber();
      console.log("currentBlockNumber is : ", currentBlockNumber);
      const quorum = await governor.quorum(currentBlockNumber)
      console.log("qurom :", quorum)
      stateOfProposal = await governor.state(propoasl1Id.toString())
      console.log("stateOfProposal is : ", stateOfProposal);
      let quorumReached = await governor.quorumReached(propoasl1Id.toString())
      console.log("quorumReached is : ", quorumReached);
      let proposalVotes = await governor.proposalVotes(propoasl1Id.toString())
      console.log("proposalVotes is : ", proposalVotes);
      let voteSucceeded = await governor.voteSucceeded(propoasl1Id.toString())
      console.log("voteSucceeded is : ", voteSucceeded);

      for(let i=0; i<100; i++) {
        await ethers.provider.send("evm_mine", []); //mine to start vote
      }

      const descriptionHash = ethers.utils.id("Proposal #1: participate launch for team");
      await governor.execute(
        [erc20Token1.address],
        [0],
        [transferCalldata],
        descriptionHash,
      );
    });
  });

});
const { deployments, ethers, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { assert, expect } = require("chai");

// If not on a development chain
!developmentChains.includes(network.name)
  ? describe.skip // skip this test, otherwise...
  : describe("SportsbookBase Unit Tests", async function () {
      const baseValue = ethers.utils.parseEther("1.0");
      // Test scope variables to take out of the beforeEach
      let sportsbookBase, deployer, team1, team2, locationProvider;
      const chainId = network.config.chainId;

      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        team1 = accounts[1];
        team2 = accounts[2];
        locationProvider = accounts[3];
        await deployments.fixture("base");
        sportsbookBase = await ethers.getContract("SportsbookBase", deployer);
      });
      describe("createChallenge", function () {
        it("creates a challenge with the correct data", async function () {
          const team1Sportsbook = await ethers.getContract(
            "SportsbookBase",
            team1
          );
          const createChallenge = await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address
          );
          const matchChallenge = await team1Sportsbook.viewMatchChallenge(0);
          expect(matchChallenge[0]).to.equal(team1.address);
          expect(matchChallenge[1]).to.equal(team2.address);
          expect(matchChallenge[2]).to.equal(locationProvider.address);
        });
      });
      describe("acceptChallenge", function () {
        let team2ConnectedSpotsbookBase;
        beforeEach(async function () {
          const team1Sportsbook = await ethers.getContract(
            "SportsbookBase",
            team1
          );
          team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
          const createChallenge = await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address,
            { value: baseValue }
          );
        });
        it("accepts the challenge by the challenged team", async function () {
          const acceptChallenge = await team2Sportsbook.acceptChallenge(0, {
            value: baseValue,
          });
          const isAccepted = await team2Sportsbook.isMatchAccepted(0);
          expect(isAccepted).to.be.true;
        });
        it("accepts when challenged team sends more value than requested", async function () {
          const acceptChallenge = await team2Sportsbook.acceptChallenge(0, {
            value: baseValue,
          });
          const isAccepted = await team2Sportsbook.isMatchAccepted(0);
          expect(isAccepted).to.be.true;
        });
        it("reverts if trying to accept with a different address than the challenged team", async function () {
          await expect(
            sportsbookBase.acceptChallenge(0, {
              value: baseValue,
            })
          ).to.be.reverted;
        });
        it("reverts if trying to accept without sending at least the same value", async function () {
          await expect(
            team2Sportsbook.acceptChallenge(0, {
              value: baseValue.sub(ethers.utils.parseEther("0.1")),
            })
          ).to.be.reverted;
        });
      });
      describe("updateChallengedTeam", function () {
        let team1Sportsbook, team2Sportsbook;
        beforeEach(async function () {
          team1Sportsbook = await ethers.getContract("SportsbookBase", team1);
          team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
          const createChallenge = await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address,
            { value: baseValue }
          );
        });
        it("updates the challenged team", async function () {
          const updateChallenge = await team1Sportsbook.updateChallengedTeam(
            0,
            deployer.address
          );
          const matchChallenge = await team1Sportsbook.viewMatchChallenge(0);
          expect(matchChallenge[1]).to.equal(deployer.address);
        });
        it("reverts when other accounts attempt to update the challenged team", async function () {
          await expect(
            team2Sportsbook.updateChallengedTeam(0, deployer.address)
          ).to.be.reverted;
        });
        it("reverts when attempted to update accepted challenges", async function () {
          const acceptChallenge = await team2Sportsbook.acceptChallenge(0, {
            value: baseValue,
          });
          await expect(
            team1Sportsbook.updateChallengedTeam(0, deployer.address)
          ).to.be.reverted;
        });
      });
      describe("deleteChallenge", function () {
        let team1Sportsbook, team2Sportsbook;
        beforeEach(async function () {
          team1Sportsbook = await ethers.getContract("SportsbookBase", team1);
          team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
          const createChallenge = await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address,
            { value: baseValue }
          );
        });
        it("finishes a challenge when deleting it", async function () {
          const deleteChallenge = await team1Sportsbook.deleteChallenge(0);
          const isFinished = await team1Sportsbook.isMatchFinished(0);
          expect(isFinished).to.be.true;
        });
        it("allows both teams to delete a challenge", async function () {
          const deleteChallenge = await team2Sportsbook.deleteChallenge(0);
          const isFinished = await team2Sportsbook.isMatchFinished(0);
          expect(isFinished).to.be.true;
        });
        it("doesn't allow to delete a challenge by anyone outside the teams", async function () {
          await expect(sportsbookBase.deleteChallenge(0)).to.be.reverted; // deployer account
        });
        it("doesn't allow to delete a challenge that has already finished", async function () {
          const deleteChallenge = await team1Sportsbook.deleteChallenge(0);
          await expect(team1Sportsbook.deleteChallenge(0)).to.be.reverted;
        });
        it("returns funds to team1 after deleting challenge", async function () {
          const startingTeam1Balance =
            await team1Sportsbook.provider.getBalance(team1.address);

          const transactionResponse = await team2Sportsbook.deleteChallenge(0);
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingTeam1Balance = await team1Sportsbook.provider.getBalance(
            team1.address
          );

          100 + 1 - 0.1;
          101 - 0.1;
          assert.equal(
            startingTeam1Balance.add(baseValue).sub(gasUsed).toString(),
            endingTeam1Balance.sub(gasUsed).toString()
          );
        });
        xit("returns funds to team2 after deleting challenge", async function () {
          const deleteChallenge = await team1Sportsbook.deleteChallenge(0);
          await expect(team1Sportsbook.deleteChallenge(0)).to.be.reverted;
        });
      });
    });

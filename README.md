# SportsBook

**UNDER CONSTRUCTION**

## Sports dApp that allows:

### Team1 challenge to a -sport- match with Team2

- Challenging another team, choosing a location provider, and automatically agreeing on payment for half of the location's provider fee half each team.
- Allows for betting if payed more than the minimum amount for the location. It is automatically paid to the winning team (or split in half if tied) when the match is marked as completed.

### Networking with other players and teams

- Include a social app that allow to view people and teams near your location that play the sport you want.
- Allow for team and player accounts to display their stats and NFT on their profiles.

### Include a NFT collectibles feature

- It will mint a NFT with the result of the match for both teams and the location provider when the challenge is completed.

### Easy to use by web2 & web3 natives

- Allows login with mail, Google, Twitter, Facebook and Wallet.
- Automatically generates a wallet key pair for each user that doesn't register with a wallet, with a section to view the private key like [Gala Games](https://app.gala.games/) or [PunkWallet](https://punkwallet.io/).
- Would be nice to involve a [feeless payment gateway](https://github.com/lacrypta/gateway) to put the payment of the transactions by the location provider ideally. It could be useful to use a platform token ($SPOR) instead of using the native token of the blockhain it's deployed.

## Frontend

**Developed using**

- [NextJs](https://nextjs.org/) (React framework)
- [Rainbowkit](https://www.rainbowkit.com/docs/introduction) (wallet connector)
- [wagmi](https://wagmi.sh/core/getting-started) (React Hooks for Ethereum)
- [ChakraUI](https://chakra-ui.com/getting-started) (component library for React)

### Functionalities to add:

- Allow selecting between team (user) and location provider to show different commands

- Show a list of challenges made

  - **address and name** of who was challenged
  - a number display with **challenge cost**
  - a number display with **bet amount** (if any)
  - a button to **update** challenge that opens to enter a new wallet address
  - a button to **cancel** challenge and refund

- Show a list of current unaccepted challenges for current user

  - **address and name** of who made the challenge
  - a number display with **challenge cost**
  - a number display with **bet amount** (if any)
  - a button to **accept**
  - a button to **cancel**

- Show a list of unstarted challenges by current location provider

  - a button to **start**
  - a button to **complete**
  - a button to **decline**

- A profile to display NFTs, accepted challenges, and contact information. Also preferred locations and preferred areas to facilitate matchmaking.

## SmartContracts

**Lacks an additional deploy script to update automatically the front end with the latest deployed address and ABI**

Written on Solidity and tested and deployed with Hardhat.

1. To run tests, enter `/hardhat` folder with command `cd hardhat`
2. Then, run `yarn` to install dependencies
3. Finally, run `yarn hardhat test` to run the tests

### Data structure for a match.

**struct MatchChallenge**

- **Team(s)** involved in a match.
- **Location provider**
- If match already been **accepted** by both teams
- If match already **started** according to location provider
- If match already **finished** according to location provider
  (after setting **finished** to true, trigger payments for location provider and winner),

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

**function updateLocationProvider**

- Give both teams the ability to update the location provider.
- If a location update is submitted, it must be accepted by the other team

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

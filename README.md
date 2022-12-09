# SportsBook UNDER CONSTRUCTION

## Sports dApp

**For everyone:**

- Allow communication between users, teams and location providers
- Showcase past matches on your profile as NFTs
- Showcase stats and other information on profiles

**For users:**

- Social media app to find a team for the sport you select
- Find a team on your geographic zone

**For teams:**

- Find and challenge other teams on the same geographic zone
- Pay to location providers for matches against other teams (half each team)
- Bet between teams on the outcome of a given match

**For location providers:**

- Get instant payment after match is over (and setting it's score)

## Changelog

- 08/12/2022: Integrated Wagmi hooks to make buttons interactive
- 07/12/2022: Made a simple layout for buttons with ChakraUI
- 06/12/2022: Installed NextJS with TypeScript, RainbowKit, Wagmi and ChakraUI for frontend
- 05/12/2022: Tested smart contract with Hardhat and did some corrections. Expanded README.md
- 04/12/2022: Created README.md and first smart contract (SportsbookBase). Tested on scaffold-eth for a quick frontend

## Pending

### Now

**Frontend**

- Fix Update Challenge button hook
- Add a button to set connected wallet as team2 and location provider to make testing easier
- Add a button to cancel match by team1

**Smart contracts**

- Review if "started" from MatchChallenge struct is really necessary
- Allow for createChallenge to not include a challenged address, thus making the challenge acceptable by anyone
- If team2 is not specified in a challenge, make whoever calls acceptChallenge the team2 address
- Specify an amount to be paid to the location provider
- Make deleteChallenge() callable by location provider

### Later

**Frontend**

- Show current challenge cost when accepting
- Show bet amount (if any) and calculate a total
- Show a list of all existing challenges
- Show location provider and betted amount when accepting/declining
- Add an option to bet and enter the amount
- Add a button to select different layouts (for location provider and team options)
- Add a functionality to detect current chain Id and select correct contract address accordingly

**Smart contract**

- Include Date and time of the match ([to be included later](https://soliditytips.com/articles/solidity-dates-time-operations/)) wherever necessary
- Mint a basic NFT when completing the challenge by location provider
- Give both teams the ability to update the challenge with a bet
- Add updateLocationProvider() function
- Give both teams the ability to change location

### Future

**Frontend**

- Translate address to a name (user/team/location provider)
- Add another layout for user options
- Show user stats and other information
- Show existing challenges for connected wallet
- Include a search engine for teams when challenging and updating
- Integrate mail, Google, Twitter and Facebook login options
- Start integrating a social media feature

**Smart contract**

- Add a small fee when processing payments
- Make the NFT include dynamically the result of the challenge and location provider & teams logos.
- Explore the option of a [feeless payment gateway](https://github.com/lacrypta/gateway)
- Explore the option of location providers to be a contract that contains data on how much it wants to be paid, and days and time available for matches
- Explore the option of a platform token ($SPOR)
- Automatically generate a wallet key pair for each user that doesn't register with a wallet, with a section to view the private key like [Gala Games](https://app.gala.games/) or [PunkWallet](https://punkwallet.io/).

# Smart Contracts

1. To run tests, enter `/hardhat` folder with command `cd hardhat`
2. Then, run `yarn` to install dependencies
3. Finally, run `yarn hardhat test` to run the tests

## Functions

### createChallenge(address \_team2, address \_locationProvider)

_Create a new match challenge_

- Push a MatchChallenge structured item to matchChallenges array.
- Specify an amount to be betted on the outcome of the match
- Specify the location provider

### acceptChallenge(uint256 \_challengeId)

_Accept an existing challenge_

- Push the MatchAccepted structured item to the acceptedChallenges array.
- Add payment for betting on outcome of the match

### deleteChallenge(uint256 \_challengeId)

_Function that deletes existing challenge_

- Set challenge on matchChallenges as finished
- Return ETH paid

### updateChallengedTeam(uint256 \_challengeId, address \_newTeam2)

_Update an existing challenge's team 2_

- Give team1 (proposer) the ability to challenge a different team on the same proposal.

### updateLocationProvider(uint256 \_challengeId, address \_newLocationProvider)

_Update an existing challenge's location provider_

- Give both teams the ability to update the location provider.
- If a location update is submitted, it must be accepted by the other team

### functions to view existing challenges... (to be listed)

### struct MatchChallenge

_Data structure for a match_

- **Team(s)** involved in a match.
- **Location provider**
- If match already been **accepted** by both teams
- If match already **started** according to location provider
- If match already **finished** according to location provider
  (after setting **finished** to true, trigger payments for location provider and winner),

## Frontend

### Functionalities to add:

**Displaying existing challenges for connected wallet:**

- **address and name** of who made the challenge
- **challenge cost**
- **bet amount** (if any)
- **accept** button
- **cancel** button

**Displaying unstarted challenges by location provider**

- a button to **start**
- a button to **complete**
- a button to **decline**

**Profiles**

- A display for NFTs
- Challenges made, received, and played
- Contact information
- Preferred locations & geographic area for matchmaking.

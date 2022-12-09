import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Checkbox,
  Button,
  Divider,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import CreateChallenge from "../buttons/CreateChallenge";
import AcceptChallenge from "../buttons/AcceptChallenge";
import DeclineChallenge from "../buttons/DeclineChallenge";
import UpdateChallenge from "../buttons/UpdateChallenge";
import { useState } from "react";
import { useAccount } from "wagmi";

const Team = () => {
  const bgColor = useColorModeValue("green.400", "gray.700");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const { address } = useAccount();

  const [locationProvider, setLocationProvider] = useState("");
  const onChangeLocationProvider = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocationProvider(event.target.value);
  };

  const [challengedTeam, setChallengedTeam] = useState("");
  const onChangeChallengedTeam = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChallengedTeam(event.target.value);
  };

  const [challengeId, setChallengeId] = useState("");
  const onChangeChallengeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeId(event.target.value);
  };

  const [updateChallengeId, setUpdateChallengeId] = useState("");
  const onChangeUpdateChallengeId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateChallengeId(event.target.value);
  };

  const [updateChallengedTeam, setUpdateChallengedTeam] = useState("");
  const onChangeUpdateChallengedTeam = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateChallengedTeam(event.target.value);
  };

  return (
    <VStack
      w="full"
      h="full"
      padding={5}
      spacing={5}
      alignItems="flex-start"
      bg={bgColor}
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2" size="xl">
          Team (user) options
        </Heading>
      </VStack>

      <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
        <GridItem colSpan={2}>
          <Heading as="h3" size="md">
            Challenge another team to a match
          </Heading>
        </GridItem>

        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of team to challenge:</FormLabel>
            <Input
              value={challengedTeam}
              onChange={onChangeChallengedTeam}
              type="text"
              placeholder="Enter wallet of team to challenge"
            ></Input>
          </FormControl>
        </GridItem>

        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of location provider:</FormLabel>
            <Input
              value={locationProvider}
              onChange={onChangeLocationProvider}
              type="text"
              placeholder="Enter wallet of location provider"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Checkbox>Bet on this challenge</Checkbox>
        </GridItem>

        <GridItem colSpan={2}>
          <Text>
            Your cost: <strong>0.001 ETH</strong> | Total cost:{" "}
            <strong>0.002 ETH</strong>
          </Text>
        </GridItem>

        <GridItem colSpan={2}>
          <CreateChallenge
            challengedTeam={challengedTeam}
            locationProvider={locationProvider}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        {/* Accept/Decline section */}

        <GridItem colSpan={2}>
          <Heading as="h3" size="md" py={2}>
            Accept/Decline existing challenge
          </Heading>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Challenge ID:</FormLabel>
            <Input
              value={challengeId}
              onChange={onChangeChallengeId}
              type="number"
              placeholder="Enter challenge ID"
            ></Input>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Text>
            Cost of accepting: <strong>0.001 ETH</strong>
          </Text>
        </GridItem>

        <GridItem colSpan={1}>
          <AcceptChallenge challengeId={challengeId} />
        </GridItem>

        <GridItem colSpan={1}>
          <DeclineChallenge challengeId={challengeId} />
        </GridItem>

        {/* Update challenge section */}

        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        <GridItem colSpan={2}>
          <Heading as="h3" size="md" py={2}>
            Update challenge
          </Heading>
        </GridItem>

        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Challenge ID:</FormLabel>
            <Input
              value={updateChallengeId}
              onChange={onChangeUpdateChallengeId}
              type="text"
              placeholder="Enter challenge ID"
            ></Input>
          </FormControl>
        </GridItem>

        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of new challenged team:</FormLabel>
            <Input
              value={updateChallengedTeam}
              onChange={onChangeUpdateChallengedTeam}
              type="number"
              placeholder="Enter wallet of challenged team"
            ></Input>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <UpdateChallenge challengeId="4" newChallengedTeam={address} />
          <UpdateChallenge
            challengeId={updateChallengeId}
            newChallengedTeam={updateChallengedTeam}
          />
          <Button size="lg" w="full">
            Update challenge
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Team;
